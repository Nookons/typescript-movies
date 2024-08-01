import React, {useEffect, useState} from 'react';
import {IMovieFull} from "../../types/FullMovie";
import MovieOptions from "./MovieOptions";
import styles from './Movie.module.css'
import SimilarMovie from "./SimilarMovie";
import Reviews from "./Reviews";
import {useLocation} from "react-router-dom";
import {Skeleton} from "antd";
import Trailer from "./Trailer";
import Button from "antd/es/button";
import {YoutubeOutlined} from "@ant-design/icons";

const Movie = () => {
    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get('movieId');

    const [movieData, setMovieData] = useState<IMovieFull | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk' // Замените на ваш реальный ключ
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(data => setMovieData(data as IMovieFull))
            .catch(err => console.error('Fetching movie data failed:', err));
    }, [movieId]);


    return (
        <div className={"container"}>
            <div className={styles.Main}>
                <div>
                    {!movieData
                        ? <Skeleton.Image style={{width: 500, height: 750}}/>
                        :
                        <div>
                            <img
                                style={{maxWidth: "100%"}}
                                src={movieData?.poster_path ? `https://image.tmdb.org/t/p/w500${movieData?.poster_path}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s`}
                                alt=""/>
                            <Button onClick={() => setIsOpen(true)} style={{marginTop: 24, width: "100%"}}>Watch
                                Trailer <YoutubeOutlined/></Button>
                        </div>
                    }
                </div>
                <div>
                    {!movieData ? <Skeleton paragraph={{rows: 15}}/> : <MovieOptions movie={movieData}/>}
                </div>
                <div className={styles.Trailer_body}>
                    {movieId && <Trailer isOpen={isOpen} setIsOpen={setIsOpen} movieId={movieId}/>}
                </div>
                <div className={styles.Similar_body}>
                    {movieId && <SimilarMovie movieId={movieId}/>}
                </div>
                <div className={styles.Reviews_body}>
                    {movieId && <Reviews movieId={movieId}/>}
                </div>
            </div>
        </div>
    );
};

export default Movie;