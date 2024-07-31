import React, {FC, useEffect, useState} from 'react';
import {IMoviesResponse} from "../../types/Movie";
import styles from './Movie.module.css'
import {Divider, Tooltip} from "antd";
import {useNavigate} from "react-router-dom";
import Link from "antd/es/typography/Link";

const style: React.CSSProperties = {
    width: '300vw',
    height: '300vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

interface SimilarMoviesProps {
    movieId: string;
}

const SimilarMovie: FC<SimilarMoviesProps> = ({movieId}) => {
    const navigate = useNavigate();
    const [similarData, setSimilarData] = useState<IMoviesResponse | null>(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setSimilarData(response as IMoviesResponse))
            .catch(err => console.error(err));
    }, [movieId]);

    const onMovieClick = (id: number) => {
        if (id) {
            const params = new URLSearchParams({movieId: id.toString()});
            console.log(params.toString());
            navigate(`/movie?${params.toString()}`);
        }
    };

    return (
        <div>
            <h5>Similar movies</h5>
            <Divider/>
            <div className={styles.Movies_wrapper}>
                {similarData?.results.slice(0, 7).map((movie, index) => {

                    return (
                        <Link onClick={() => onMovieClick(movie.id)} key={movie.id}>
                            <Tooltip style={{minWidth: 350}} className={styles.Similar_button} placement="top"
                                     title={movie.title}>
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s`}
                                    alt=""/>
                            </Tooltip>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default SimilarMovie;