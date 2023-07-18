import crypto from "crypto";

function hash(plainText: string) {
    if (!plainText) return null;
    const salt = "MakeThingsGoRight22"
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

export default {
    hash
}
