import { OkPacket } from "mysql";
// Models
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import RoleModel from "../2-models/role-model";

// Utils
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";

// helpers
import cryptoHelper from "../1-assets/helpers/crypto-helper";
import svgCaptcha from "svg-captcha";

// Register new user: 
async function register(user: UserModel): Promise<string> {

    // Joi Validation:
    user.validatePost();

    // Is username taken:
    const isTaken = await isEmailTaken(user.email);
    if (isTaken) throw new ValidationError(`Email ${user.email} already taken`);

    // Set role as a regular user:
    user.roleId = RoleModel.User;

    // Create query:
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

    // Execute: 
    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

    // Set back auto-increment id:
    user.userId = result.insertId;

    // Create token:
    const token = cyber.createToken(user);

    // Return token:
    return token;
}

async function isEmailTaken(email: string): Promise<boolean> {

    // Create query:
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;

    // Execute: 
    const arr = await dal.execute(sql, [email]);

    // Get is taken value:
    const isTaken: number = arr[0].isTaken;

    // Return true if username taken:
    return isTaken === 1;
}

// Login:
async function login(credentials: CredentialsModel): Promise<string> {

    // TODO: Joi Validation:
    credentials.validatePost();

    // Query:
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    // Execute:
    const users = await dal.execute(sql, [credentials.email, credentials.password]);

    // Extract user:
    const user = users[0];

    // If user not exist:
    if (!user) throw new UnauthorizedError("Incorrect email or password");

    // Create token:
    const token = cyber.createToken(user);

    // Return token:
    return token;
}

async function getOneUser(userId: number): Promise<UserModel> {
    const sql = `SELECT * FROM users WHERE userId = ?`;
    const users = await dal.execute(sql, [userId]);

    if (users.length === 0) throw new ResourceNotFoundError(userId);

    const user = users[0];

    return user;
}

async function updateUser(user: UserModel): Promise<UserModel> {

    const sql = `
          UPDATE users SET
              firstName = ?,
              lastName = ?,
              email = ?,
              password = ?
          WHERE userId = ?`;

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.userId]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(user.userId);

    return user;
}

function createCaptcha() {
    const captcha = svgCaptcha.create()
    const captchaImage = captcha.data;
    const hashedCaptcha = cryptoHelper.hash(captcha.text);
    const response = { captchaImage, hashedCaptcha };
    return response;
};

export default {
    register,
    login,
    getOneUser,
    updateUser,
    createCaptcha
};

