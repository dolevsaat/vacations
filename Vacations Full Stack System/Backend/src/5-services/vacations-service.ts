import dal from "../4-utils/dal";
import VacationModel from "../2-models/vacation-model";
import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import imageHandler from "../4-utils/image-handler";
import appConfig from "../4-utils/app-config";

// ------------------------ Get all vacations ------------------------

async function getAllVacations(): Promise<VacationModel[]> {

    const sql = `SELECT vacations.vacationId , name, description, DATE_FORMAT(dateStart, '%d/%m/%Y - %H:%i')
    as dateStart, DATE_FORMAT(dateEnd, '%d/%m/%Y - %H:%i') as dateEnd , price , imageName AS imageUrl 
    FROM vacations`;

    const vacations = await dal.execute(sql);

    return vacations;
}

// ------------------------ Get vacation by userId ------------------------

async function getVacationsByUserID(userId: number): Promise<VacationModel[]> {
    const sql = `SELECT vacations.vacationId , name, description, DATE_FORMAT(dateStart, '%d/%m/%Y - %H:%i')
    as dateStart, DATE_FORMAT(dateEnd, '%d/%m/%Y - %H:%i') as dateEnd , price , imageName AS imageUrl 
    ,(NOT ISNULL(followers.userId)) AS Follow FROM vacations LEFT JOIN followers ON followers.vacationId = vacations.vacationId AND
    followers.userId = ? WHERE vacations.dateEnd >= CURDATE() ORDER BY Follow desc`;

    const vacationsByUser = await dal.execute(sql, [userId]);

    return vacationsByUser;
}

// ------------------------ Get single vacation ------------------------

async function getSingleVacation(vacationId: number): Promise<VacationModel> {

    const sql = `select vacationId , name, description ,DATE_FORMAT(dateStart, '%d/%m/%Y') as dateStart,
    DATE_FORMAT(dateEnd, '%d/%m/%Y') as dateEnd ,price ,CONCAT('${appConfig.imagesUrl}',imageName) AS imageUrl from vacations Where vacationId = ?`;

    const singleVacation = await dal.execute(sql, [vacationId]);

    return singleVacation[0];
}

// ------------------------ Add vacation ------------------------

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // Joi validation
    vacation.validate();

    let imageName = null;

    // If we have image:
    if (vacation.image) {
        // Save image:
        imageName = await imageHandler.saveImage(vacation.image);

        // Set back image url:
        vacation.imageUrl = imageName;
    }
    // Create query:
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    // Execute:
    const result: OkPacket = await dal.execute(sql, [
        vacation.name,
        vacation.description,
        vacation.dateStart,
        vacation.dateEnd,
        vacation.price,
        vacation.imageUrl,
    ]);

    // This is the id that db return to front
    vacation.vacationId = result.insertId;

    // Return:
    return vacation;
}

// ------------------------ Update vacation ------------------------

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Joi validation
    vacation.validatePut();

    let imageName= null;

    // If we have an image to update:
    if (vacation.image) {
        // Update image:
        imageName = await imageHandler.updateImage(vacation.image, imageName);
        vacation.imageUrl = imageName;
    }

    // Create query: --------  Check how to change this query against sql injection:  ---------
    const sql = `UPDATE vacations SET
                    name = ?, 
                    description = ?,
                    dateStart = ?,
                    dateEnd = ?,
                    price = ?,
                    imageName = ?
                    WHERE vacationId = ?`;

    // Execute:
    const result: OkPacket = await dal.execute(sql, [
        vacation.name,
        vacation.description,
        vacation.dateStart,
        vacation.dateEnd,
        vacation.price,
        vacation.imageUrl,
        vacation.vacationId,
    ]);

    // If product not found:
    if (result.affectedRows === 0)
        throw new ResourceNotFoundError(vacation.vacationId);

    // Return:
    return vacation;
}

// ------------------------ Delete vacation ------------------------

async function deleteVacation(vacationId: number): Promise<void> {

    // Take original image name:
    let imageUrl = await getVacationImageName(vacationId);

    // Create query:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    // Execute:
    const result: OkPacket = await dal.execute(sql, [vacationId]);

    // If product not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

    // Delete image from disk:
    await imageHandler.deleteImage(imageUrl);
}

// ------------------------ Get get vacation ImageName ------------------------
// Get product image name from db:
async function getVacationImageName(vacationId: number): Promise<string> {

    // Create query:
    const sql = `SELECT imageName AS imageUrl FROM vacations WHERE vacationId = ?`;

    // Get products:
    const vacations = await dal.execute(sql, [vacationId]);

    // Extract first product:
    const vacation = vacations[0];

    // If id not found:
    if (!vacation) return null;

    // Get image name:
    const imageName = vacation.imageUrl;

    // Return:
    return imageName;
}

export default {
    getAllVacations,
    getVacationsByUserID,
    getSingleVacation,
    addVacation,
    updateVacation,
    deleteVacation,
};
