import React, {FC, useEffect, useState} from 'react';
import {Modal} from "antd";

interface TrailerProps {
    movieId: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface Video {
    iso_639_1: string;  // Язык
    iso_3166_1: string; // Страна
    name: string;       // Название видео
    key: string;        // Ключ для встраивания
    site: string;       // Сайт, например, YouTube
    size: number;       // Размер видео (разрешение)
    type: string;       // Тип видео, например, Clip или Trailer
    official: boolean;  // Официальность
    published_at: string; // Дата публикации
    id: string;         // Идентификатор
}

interface VideoResponse {
    id: number;         // Идентификатор ответа
    results: Video[];   // Массив видео
}

const Trailer: FC<TrailerProps> = ({isOpen, setIsOpen, movieId}) => {
    let count = 0;
    const [trailerData, setTrailerData] = useState<VideoResponse | null>(null);

    const [targetTrailer, setTargetTrailer] = useState<Video | null>(null);

    useEffect(() => {
        if (trailerData) {
            trailerData.results.forEach(el => {
                if (el.type.toLowerCase() === "trailer" && count === 0) {
                    count ++;
                    setTargetTrailer(el)
                }
            })
        }

    }, [trailerData]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk' // Замените на ваш реальный ключ
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(data => setTrailerData(data as VideoResponse))
            .catch(err => console.error('Fetching movie data failed:', err));
    }, [movieId]);

    return (
        <Modal
            title={`${targetTrailer?.name}`}
            centered
            open={isOpen}
            onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            footer={""}
            width={1000}
        >
            {
                targetTrailer &&
                <iframe
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${targetTrailer.key}?si=${targetTrailer.id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                >

                </iframe>
            }
        </Modal>
    );
};

export default Trailer;