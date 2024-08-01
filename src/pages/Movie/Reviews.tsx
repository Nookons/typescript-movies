import React, {FC, useEffect, useState} from 'react';
import {ReviewResponse} from "../../types/Review";
import {Avatar, Divider} from "antd";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import dayjs from "dayjs";
import Button from "antd/es/button";

dayjs.extend(relativeTime);

interface ReviewsProps {
    movieId: string;
}

const Reviews: FC<ReviewsProps> = ({movieId}) => {

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
            <Divider>Reviews</Divider>
            {movieReview?.results.map((review) => {
                const avatarSrc = review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                    : 'default-avatar-url';

                let content = review.content;

                content = content.replace(/\r\n/g, '<br>');
                content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                content = content.replace(/_(.*?)_/g, '<u>$1</u>');
                content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">Link</a>');

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
                            <article>{dayjs(review.created_at).fromNow() || 'Unknown'}</article>
                        </div>
                        <Divider/>
                        {content.length > 1000
                            ?
                            <div
                                dangerouslySetInnerHTML={{__html: content.slice(0, 1000)}}
                            />
                            :
                            <div
                                dangerouslySetInnerHTML={{__html: content}}
                            />
                        }
                        {content.length > 1000 && <Button style={{marginTop: 14, width: "100%"}} >Read more...</Button>}
                    </div>
                )
            })}
        </div>
    );
};

export default Reviews;