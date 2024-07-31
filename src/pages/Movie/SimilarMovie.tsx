import React, {FC, useEffect, useState} from 'react';
import {IMoviesResponse} from "../../types/Movie";
import styles from './Movie.module.css'
import {Divider} from "antd";



interface SimilarMoviesProps {
    movieId: string;
}

const SimilarMovie: FC<SimilarMoviesProps> = ({movieId}) => {

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

    useEffect(() => {
        console.log(similarData);
    }, [similarData]);


    return (
        <div>
            <h5>Similar movies</h5>
            <Divider/>
            <div className={styles.Movies_wrapper}>
                {similarData?.results.slice(0, 10).map((movie, index) => {

                    return (
                        <div className={styles.Similar_button}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt=""/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SimilarMovie;