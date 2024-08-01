import React, {useEffect, useState} from 'react';
import styles from './Menu.module.css'
import Button from "antd/es/button";
import {Divider, message, Segmented, SegmentedProps} from "antd";
import {CrownOutlined, DashboardOutlined, EyeOutlined} from "@ant-design/icons";
import {fetchMovies} from "../../../store/reducers/movie";
import {useAppDispatch} from "../../../hooks/storeHooks";
import Search from "./Search";


interface IGenre {
    id: number;
    name: string;
}

interface IGenresResponse {
    genres: IGenre[];
}

const Menu = () => {
    const dispatch = useAppDispatch();
    const [moviesGenres, setMoviesGenres] = useState<IGenresResponse | null>(null);
    const [showsGenres, setShowsGenres] = useState<IGenresResponse | null>(null);

    const [searchType, setSearchType] = useState<string>("now_playing")
    const [page, setPage] = useState<number>(1);


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjQ1MTg2NC4wMDg1NTQsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u7m-dteudZ_7mNr06RscPhh5lxFDQ1iwr3f8wx_wkW8'
            }
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())
            .then(response => setMoviesGenres(response as IGenresResponse))
            .catch(err => console.error(err));

        fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
            .then(response => response.json())
            .then(response => setShowsGenres(response as IGenresResponse))
            .catch(err => console.error(err));

    }, []);


    useEffect(() => {
        try {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            dispatch(fetchMovies({page, searchType}));
        } catch (err) {
            if (err instanceof Error) {
                message.error(err.toString());
            } else {
                message.error('An unknown error occurred');
            }
        }
    }, [page, searchType, dispatch]);

    const onChangeType: SegmentedProps['onChange'] = (value) => {
        if (typeof value === 'string') {
            localStorage.setItem("type", value);
            setSearchType(value);
        }
    };


    return (
        <div className={styles.Main}>
            <Divider>Main menu</Divider>
            <div style={{padding: "14px"}} className={styles.Segments_body}>
                <Segmented<string>
                    options={[
                        {label: 'Top Rating', value: 'top_rated', icon: <CrownOutlined/>},
                        {label: 'Now Watching', value: 'now_playing', icon: <EyeOutlined/>},
                        {label: 'Popular', value: 'popular', icon: <DashboardOutlined/>},
                        /*{label: 'Upcoming', value: 'upcoming', icon: <FieldTimeOutlined/>},*/
                    ]}
                    value={searchType}
                    defaultValue={"now_playing"}
                    onChange={onChangeType}
                    block={true}
                    multiple={true} rows={2}/>
            </div>
            <div className={styles.Header_menu}>
                <ul className={styles.Menu_body}>
                    <li><Button type={"text"}>Movies</Button>
                        <ul className={styles.Shields_menu_body}>
                            {moviesGenres?.genres.map((genre) => (
                                <li><Button type={"text"}>{genre.name}</Button></li>))}
                        </ul>
                    </li>
                    <li><Button type={"text"}>TV Shows</Button>
                        <ul className={styles.Shields_menu_body}>
                            {showsGenres?.genres.map((genre) => (<li><Button type={"text"}>{genre.name}</Button></li>))}
                        </ul>
                    </li>
                </ul>
                <Search/>
            </div>
        </div>
    );
};

export default Menu;