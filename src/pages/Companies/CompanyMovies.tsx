import React, {FC, useEffect, useState} from 'react';
import {IMoviesResponse} from "../../types/Movie";
import {Pagination} from "antd";

import styles from './Companies.module.css'
import Link from "antd/es/typography/Link";
import {useNavigate} from "react-router-dom";

interface CompanyMoviesProps {
    companyId: string;
}

const CompanyMovies:FC<CompanyMoviesProps> = ({companyId}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [companiesMovie, setCompaniesMovie] = useState<IMoviesResponse | null>(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjQ1MTg2NC4wMDg1NTQsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u7m-dteudZ_7mNr06RscPhh5lxFDQ1iwr3f8wx_wkW8'
            }
        };

        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_companies=${companyId}`, options)
            .then(response => response.json())
            .then(response => setCompaniesMovie(response as IMoviesResponse))
            .catch(err => console.error(err));
    }, [companyId, page]);

    const onMovieClick = (id: number) => {
        const params = new URLSearchParams({movieId: id.toString()});
        navigate(`/movie?${params.toString()}`)
    }

    return (
        <div>
            <div className={styles.Movies_body}>
                {companiesMovie?.results.map((movie) => {

                    return (
                        <Link onClick={() => onMovieClick(movie.id)} className={styles.Movie}>
                            {movie.poster_path
                                ?
                                <img style={{maxWidth: "100%"}}
                                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                     alt=""/>
                                :
                                <img style={{maxWidth: "100%"}}
                                     src={`https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg`}
                                     alt=""/>
                            }
                            <div className={styles.Movie_child}>
                                <article style={{color: "white", textAlign: "center"}}>{movie.title}</article>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className={styles.Pagination_body}>
                <Pagination
                    current={page}
                    onChange={(page) => setPage(page)}
                    defaultCurrent={1}
                    total={companiesMovie?.total_results}
                    pageSize={20} showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default CompanyMovies;