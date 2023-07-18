import fs from "fs";

function safeDelete(absolutePath) {
    try {
        if (!absolutePath || !fs.existsSync(absolutePath)) return;
        fs.unlinkSync(absolutePath)
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    safeDelete
}
