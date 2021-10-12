import React, { FC } from "react";
import Footer from "./footer";
import Header, { HeaderProps } from "./header";


const Layout: FC<HeaderProps> = ({children, selected}) =>
    <>
        <Header selected={selected}/>
        {children}
        <Footer/>
    </>


export default Layout