class AppConfig {
    public registerUrl = "http://localhost:4000/api/register/";
    public loginUrl = "http://localhost:4000/api/login/";
    public followersUrl = "http://localhost:4000/api/followers/";
    public captchaUrl = "http://localhost:4000/api/captcha/";

    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public usersUrl = "http://localhost:4000/api/users/";
    public imagesUrl = "http://localhost:4000/api/images/";
}

const appConfig = new AppConfig();

export default appConfig;
