import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {fetchMovies} from "./store/reducers/movie";
import {useAppDispatch} from "./hooks/storeHooks";

const App = () => {

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;