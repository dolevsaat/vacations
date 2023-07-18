import "./Spinner.css";
import imageSource from "../../../Assets/images/loading-18.gif";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={imageSource} />
        </div>
    );
}

export default Spinner;
