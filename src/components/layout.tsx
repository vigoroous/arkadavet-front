import React, { FunctionComponent } from "react";
import Footer from "./footer";
import Header from "./header";


const Layout: FunctionComponent = ({children}) =>
    <>
        <Header/>
        {children}
        <Footer/>
    </>


export default Layout