import React, {useEffect, useState} from 'react';
import styles from './Home.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {IResponseMovies} from '../../types/Movie';
import {Pagination, PaginationProps, message, Segmented, SegmentedProps, Skeleton} from "antd";
import {fetchMovies} from "../../store/reducers/movie";
import {CrownOutlined, DashboardOutlined, EyeOutlined, FieldTimeOutlined} from "@ant-design/icons";
import Movie from "./movie/Movie";
import Info from "./info/Info";
import Menu from "./Menu/Menu";

const Home: React.FC = () => {
    const movies: IResponseMovies = useAppSelector(state => state.movies);


    useEffect(() => {
        const localPage = localStorage.getItem("page")
        const localType = localStorage.getItem("type")

        /*if (localPage) {
            setPage(Number(localPage))
        }

        if (localType) {
            setSearchType(localType)
        }*/
    }, []);





    return (
        <div className={styles.Main}>
            <Menu />
            <div className={styles.Left_body}>
                {movies.movies.results.length
                    ? <div className={styles.Movies_body}>
                        {movies.movies.results.map((movie, index) => {
                            return (
                                <Movie movie={movie} key={index}/>
                            )
                        })}
                    </div>
                    :
                    <div className={styles.Movies_body}>
                        {Array.from({length: 20}).map(() => (
                            <Skeleton.Image style={{width: "100%", height: 445}}/>
                        ))}
                    </div>
                }
                <div className={styles.Pagination_body}>

                </div>
            </div>
            <Info/>
        </div>
    );
};

export default Home;
