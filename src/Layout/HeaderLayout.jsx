import Appbar from "~/components/Appbar/Appbar";
import { Outlet } from 'react-router-dom';
import Footer from "~/components/Footer/Footer";

function HeaderLayout() {
    return (
        <>
            <Appbar />
            <Outlet /> {/* Nơi chứa các component con */}
            <Footer />
        </>
    );
}

export default HeaderLayout;