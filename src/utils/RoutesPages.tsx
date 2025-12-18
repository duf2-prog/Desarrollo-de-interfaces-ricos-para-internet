import type React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HelpPage from "../pages/HelpPage";
import AskPage from "../pages/AskPage";
import ReferencesPage from "../pages/ReferencesPage";
import NoMatchPage from "../pages/NoMatchPage";

const RoutesPages = (): React.JSX.Element =>
    <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/help" element={<HelpPage/>}>
                <Route path="ask" element={<AskPage/>}/>
                <Route path="references" element={<ReferencesPage/>}/>
            </Route>
            <Route path="*" element={<NoMatchPage/>}/>
        </Routes>
    </> 

export default RoutesPages