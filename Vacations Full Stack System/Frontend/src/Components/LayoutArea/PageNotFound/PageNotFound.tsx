import "./PageNotFound.css";
import imageSource from "../../../Assets/images/page-not-found.png";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">

            <p>The page you are looking for doesn't exist.</p>

            <img src={imageSource} />

        </div>
    );
}

export default PageNotFound;
