import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="max-w-[1280px] mx-auto">
            <div className='bg-primary fixed top-0 z-50 w-full'>
            <Navbar></Navbar>
            </div>
            <div className="mt-16 py-8 min-h-[263px]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;