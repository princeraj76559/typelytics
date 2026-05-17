import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Result from "./components/Result/Result";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route } from "react-router-dom"
import SmallScreen from "./components/SmallScreen";


const App = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between items-center">
      <Navbar />
      <SmallScreen/>
      <div className="hidden sm:block px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );

}

export default App;