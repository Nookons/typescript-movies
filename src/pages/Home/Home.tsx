// src/components/Home/Home.tsx
import React, {useEffect, useState} from 'react';
import styles from './Home.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {IResponseMovies} from '../../types/Movie';
import {Pagination, PaginationProps} from "antd";
import Search from "antd/es/input/Search";
import {fetchMovies} from "../../store/reducers/movie";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const movies: IResponseMovies = useAppSelector(state => state.movies);

    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log(page);
        dispatch(fetchMovies(page));
    }, [page]);

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setPage(pageNumber)
    };

    return (
        <div className={styles.Main}>
            <div>
                <div>
                    {movies.movies.results.map((movie, index) => {

                        return (
                            <div style={{maxWidth: 275}} key={index}>
                                <img style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                                <article>{movie.title}</article>
                            </div>
                        )
                    })}
                </div>
                <Pagination onChange={onChange} defaultCurrent={1} total={movies.movies.total_pages} />
            </div>
            <div>
                <h6>Search</h6>
                <Search placeholder="Enter movies title for search" loading />
            </div>
        </div>
    );
};

export default Home;
