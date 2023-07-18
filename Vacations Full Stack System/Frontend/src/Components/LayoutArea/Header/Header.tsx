import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <h1>Welcome To The Best Vacation Deals Website!</h1>
        </div>
    );
}

export default Header;
