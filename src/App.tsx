import React, { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import "./scss/index.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import MyList from "./pages/MyList";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/firebaseConfig";
const App = () => {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   onAuthStateChanged(firebaseAuth, (current) => {
  //     dispatch(setUserStatus(current?.email));
  //   });
  // }, [dispatch]);
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((text: string) => {
        toast(text, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);
  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search">
              Search
            </Route>
            <Route element={<About />} path="/about">
              About
            </Route>
            <Route element={<Compare />} path="/compare">
              Compare
            </Route>
            <Route element={<Pokemon />} path="/pokemon/:id">
              Pokemon
            </Route>
            <Route element={<MyList />} path="/list">
              My list
            </Route>
            <Route element={<Navigate to="/pokemon/1" />} path="*">
              {" "}
            </Route>
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
