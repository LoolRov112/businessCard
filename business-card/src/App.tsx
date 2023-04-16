import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Signin";
import About from "./components/About";
import Signup from "./components/Register/Signup";
import BusinessSignup from "./components/Register/BusinessSignup";
import NavBar from "./components/NavBar";
import jwtDecode from "jwt-decode";
import Allcards from "./components/Cards/Allcards";
import AddNewCard from "./components/AddNewCard";
import MyCards from "./components/Cards/MyCards";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFount";
import { ToastContainer } from "react-toastify";
import { getUserProfile } from "./services/userService";
import WishList from "./components/WishList";

let themes = {
  light: {
    background: "linear-gradient(to right,#b8b8d1,#5b5f97)",
    backgroundFooter: "linear-gradient(to left,#b8b8d1,#5b5f97)",
    color: "#322e18",
    srcLogo: "logo.png",
    bgButtonNav: "#5B5F97",
    bgAbout: "#fffffb",
    bgCard: "linear-gradient(to right, #5b5f97, #fffffb)",
    editColor: "#679436",
    deleteColor: "#840032",
    shadow: "3px 3px 6px 3px #322e18",
    backGroundComps: "#fffffb",
  },

  dark: {
    background: "linear-gradient(to right,#508CA4,#493657)",
    backgroundFooter: "linear-gradient(to left,#508CA4, #493657)",
    color: "#fffffb",
    srcLogo: "logoDark.png",
    bgButtonNav: "#A188A6",
    bgAbout: "#322e18",
    bgCard: "linear-gradient(to right,#8075FF,#A49BA9)",
    editColor: "#00FFCD",
    deleteColor: "#F46036",
    shadow: "3px 3px 6px 3px #fffffb",
    backGroundComps: "#000000",
  },
};

export let ThemeContext = createContext(themes.light);

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(false);
  let [cardChanged, setCardChanged] = useState<boolean>(false);
  let refresh = () => setCardChanged(!cardChanged);
  let [isBusiness, setIsBusiness] = useState<boolean>(false);
  let [name, setName] = useState<string>("");
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    sessionStorage.getItem("userDatas") != null
      ? JSON.parse(sessionStorage.getItem("userDatas") as string).isLoggedIn
      : false
  );
  let [user, setUser] = useState<string>("");
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userDatas") as string) == null)
      setUser("");
    else {
      let payload: { _id: string } = jwtDecode(
        JSON.parse(sessionStorage.getItem("userDatas") as string).token
      );
      setUser(payload._id);
      getUserProfile()
        .then((res) => {
          setIsBusiness(res.data.businessMan);
          setName(res.data.name);
        })
        .catch((err) => console.log(err));
    }
  }, [isBusiness]);

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
        <ThemeContext.Provider value={darkMode ? themes.dark : themes.light}>
          <NavBar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isBusiness={isBusiness}
          ></NavBar>
          <Routes>
            <Route
              path="/about"
              element={<About isLoggedIn={isLoggedIn}></About>}
            ></Route>
            <Route
              path="/"
              element={
                <Login
                  name={name}
                  setIsBusiness={setIsBusiness}
                  setIsLoggedIn={setIsLoggedIn}
                ></Login>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <Signup
                  setIsBusiness={setIsBusiness}
                  setIsLoggedIn={setIsLoggedIn}
                ></Signup>
              }
            ></Route>
            <Route
              path="/signupasB"
              element={
                <BusinessSignup
                  setIsBusiness={setIsBusiness}
                  setIsLoggedIn={setIsLoggedIn}
                ></BusinessSignup>
              }
            ></Route>
            <Route
              path="/allcards"
              element={
                <Allcards
                  cardChanged={cardChanged}
                  isBusiness={isBusiness}
                  refresh={refresh}
                ></Allcards>
              }
            ></Route>
            <Route
              path="/mycards"
              element={
                <MyCards
                  cardChanged={cardChanged}
                  isBusiness={isBusiness}
                  refresh={refresh}
                ></MyCards>
              }
            ></Route>
            <Route
              path="/wishlist"
              element={
                <WishList
                  refresh={refresh}
                  cardChanged={cardChanged}
                ></WishList>
              }
            ></Route>
            <Route
              path="/addnewcard"
              element={<AddNewCard refresh={refresh}></AddNewCard>}
            ></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <Footer></Footer>
        </ThemeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
