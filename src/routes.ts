import {HOME_ROUTE, MOVIE_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import SignIn from "./pages/User/SignIn/SignIn";
import SignUp from "./pages/User/SignUp/SignUp";
import Movie from "./pages/Movie/Movie";


interface Route {
    path: string;
    Component: React.ComponentType<any>;
    label: string;
}

type PublicRoutes = Route[];

// routes for users
export const publicRoutes: PublicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
    {
        path: SIGN_IN_ROUTE,
        Component: SignIn,
        label: 'SignIn',
    },
    {
        path: SIGN_UP_ROUTE,
        Component: SignUp,
        label: 'SignUp',
    },
    {
        path: MOVIE_ROUTE,
        Component: Movie,
        label: 'Movie',
    },
];