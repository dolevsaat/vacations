import Header from "../Header/Header";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header> <Header></Header> </header>
            <main><Routing></Routing> </main>
        </div>
    );
}

export default Layout;
