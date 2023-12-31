import cryptoHelper from "../1-assets/helpers/crypto-helper";

function verifyCaptcha(request, response, next) {
    const hashedCaptcha = request.body.hashedCaptcha;
    let captchaText = request.body.captchaText;
    captchaText = cryptoHelper.hash(captchaText);
    if (hashedCaptcha !== captchaText) {
        return response.status(400).send("CAPTCHA is not valid.");
    }
    next();
};

export default {
    verifyCaptcha
};