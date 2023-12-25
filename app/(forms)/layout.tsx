import React from "react";
import NavBar from "@/components/NavBar";

export default function FormsLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <NavBar/>
            {children}
        </>
    );
}
