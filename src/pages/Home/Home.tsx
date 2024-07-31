import React, {useEffect, useState} from 'react';
import styles from './Home.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {IResponseMovies} from '../../types/Movie';
import {Pagination, PaginationProps, message, Segmented} from "antd";
import Search from "antd/es/input/Search";
import {fetchMovies} from "../../store/reducers/movie";
import {CrownOutlined, DashboardOutlined, EyeOutlined, FieldTimeOutlined} from "@ant-design/icons";
import Movie from "./movie/Movie";
import Info from "./info/Info";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const movies: IResponseMovies = useAppSelector(state => state.movies);

    const [page, setPage]            = useState<number>(1);
    const [searchType, setSearchType]  = useState<string>("now_playing");

    useEffect(() => {
        try {
            if (!movies.loading ) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            dispatch(fetchMovies({page, searchType}));
        } catch (err) {
            if (err instanceof Error) {
                message.error(err.toString());
            } else {
                message.error('An unknown error occurred');
            }
        }
    }, [page, searchType, dispatch]);

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setPage(pageNumber)
    };


    return (
        <div className={styles.Main}>
            <div className={styles.Left_body}>
                <div className={styles.Segments_body}>
                    <Segmented<string>
                        options={[
                            { label: 'Top Rating', value: 'top_rated', icon: <CrownOutlined />  },
                            { label: 'Now Watching', value: 'now_playing', icon: <EyeOutlined /> },
                            { label: 'Popular', value: 'popular', icon: <DashboardOutlined /> },
                            { label: 'Upcoming', value: 'upcoming', icon: <FieldTimeOutlined /> },
                        ]}
                        defaultValue={"now_playing"}
                        onChange={(value) => {
                            setSearchType(value);
                        }}
                    />
                </div>
                <div className={styles.Movies_body}>
                    {movies.movies.results.map((movie, index) => {

                        return (
                            <Movie movie={movie} key={index} />
                        )
                    })}
                </div>
                <div className={styles.Pagination_body}>
                    <Pagination onChange={onChange} defaultCurrent={1} total={movies.movies.total_pages} />
                </div>
            </div>
            <Info />
        </div>
    );
};

export default Home;
