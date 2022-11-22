import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Index from "./screens/signIn/index";
import ResetPassword from "./screens/resetPassword/resetPassword";
import LcaList from "./screens/lcaList/lcaList";
import LocalInfo from "./screens/lcaInfo/localInfo";

const AppRouter = () => {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reset" element={<ResetPassword/>} />
          <Route path="/list" element={<LcaList/>} />
          <Route path="/info" element={<LocalInfo/>} />
          
     
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
