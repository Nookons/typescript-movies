import React, {FC, useEffect, useState} from 'react';
import {IMoviesResponse} from "../../types/Movie";
import {ReviewResponse} from "../../types/Review";
import {Avatar} from "antd";

interface ReviewsProps {
    movieId: string;
}

const Reviews:FC<ReviewsProps> = ({movieId}) => {

    const [movieReview, setMovieReview] = useState<ReviewResponse | null>(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setMovieReview(response as ReviewResponse))
            .catch(err => console.error(err));
    }, [movieId]);

    useEffect(() => {
        console.log(movieReview);
    }, [movieReview]);

    return (
        <div>
            {movieReview?.results.map((review, index) => {
                const avatarSrc = review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                    : 'default-avatar-url'; // Укажите URL по умолчанию для аватара, если его нет

                // Замена \r\n и \n на <br> для отображения перевода строки
                const formattedContent = review.content
                    .replace(/\r\n|\n/g, '<br>');

                return (
                    <div style={{
                        backgroundColor: "rgba(0,0,0, 0.05)",
                        marginBottom: 14,
                        padding: 14,
                        borderRadius: 4,
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: "center",
                            gap: 8,
                            justifyContent: "space-between",
                            marginBottom: 14
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: "center",
                                gap: 8,
                            }}>
                                <Avatar
                                    src={avatarSrc}
                                    size={{xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40}}
                                    alt={review.author_details.name}
                                >
                                    {!review.author_details.avatar_path && review.author_details.name.slice(0, 1)}
                                </Avatar>
                                <h5>{review.author_details.username || 'Unknown'}</h5>
                            </div>
                            <p>{review.created_at || 'Unknown'}</p>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{__html: formattedContent}}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default Reviews;