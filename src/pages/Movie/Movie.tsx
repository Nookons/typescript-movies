import React, {useEffect, useState} from 'react';
import {IMovieFull} from "../../types/FullMovie";
import MovieOptions from "./MovieOptions";
import styles from './Movie.module.css'
import SimilarMovie from "./SimilarMovie";
import Reviews from "./Reviews";

const Movie = () => {
    const movie_id = window.location.href.split("_")[1]

    const [movieData, setMovieData] = useState<IMovieFull | null>(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovieData(response as IMovieFull))
            .catch(err => console.error(err));
    }, [movie_id]);


    return (
        <div className={"container"}>
            <div className={styles.Main}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} alt=""/>
                </div>
                <div>
                    {movieData && <MovieOptions movie={movieData}/>}
                </div>
                <div className={styles.Similar_body}>
                    {movie_id && <SimilarMovie movieId={movie_id}/>}
                </div>
                <div className={styles.Reviews_body}>
                    {movie_id && <Reviews movieId={movie_id}/>}
                </div>
            </div>
        </div>
    );
};

export default Movie;