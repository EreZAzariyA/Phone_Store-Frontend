import "./Layout.css";
import MyNavbar from "../Navbar/Navbar";
import Routing from "../Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <MyNavbar />
            </header>


            <main>
                <Routing />
            </main>

            <footer>


            </footer>
        </div>
    );
}

export default Layout;
