import React from 'react'
import "../../css/app.css"

import * as path from "./shared/constants";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GuestHome from './pages/Guest/Home/GuestHome';

export default function MyApp() {
  return (
    <>
        {/* Guest Pages */}
            <Routes>
                <Route path={path.HOME} element={<GuestHome/>}>
                </Route>
            </Routes>

            

        {/* Guest Pages */}


        {/* Guest Pages */}


        {/* Guest Pages */}

    </>
  )
}

if (document.getElementById("app")) {
    const container = document.getElementById("app");
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <MyApp />
        </BrowserRouter>
    );
}
