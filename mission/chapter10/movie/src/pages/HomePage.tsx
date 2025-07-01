import { ReactElement } from "react";
import { NavBar } from "../components/NavBar";
import { Outlet } from "react-router-dom";

const HomePage = () : ReactElement => {
    return (
    <>
        <NavBar />
        <Outlet />    
    </>
    )
}

export default HomePage