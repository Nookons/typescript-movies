import React, {FC, useState} from 'react';
import {IMovie} from "../../../types/Movie";
import {FrownOutlined, InfoCircleOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import styles from './Movie.module.css'
import {Descriptions, DescriptionsProps, Rate} from "antd";
import {Link} from "react-router-dom";
import {MOVIE_ROUTE} from "../../../utils/consts";

interface IMovieProps {
    movie: IMovie
}

const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

const Movie:FC <IMovieProps> = ({movie}) => {

    const [isHover, setIsHover] = useState<boolean>(false);

    const moviesOptions: DescriptionsProps['items'] = [
        {
            key: '5',
            label: 'Rate',
            children: <Rate value={movie.vote_average / 2} defaultValue={5} character={({ index = 0 }) => customIcons[index + 1]} />,
            span: 3,
        },
        {
            key: '1',
            label: 'Date',
            children: movie.release_date,
            span: 3,
        },
        {
            key: '2',
            label: 'Original Title',
            children: movie.original_title,
            span: 3,
        },
        {
            key: '3',
            label: 'Original Language',
            children: movie.original_language,
            span: 3,
        },
        {
            key: '4',
            label: 'Overview',
            children: movie.overview,
            span: 3,
        },
    ];

    return (
        <div className={styles.Main}>
            <div>
                <button
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className={styles.Dialog_button}
                >
                    <InfoCircleOutlined/>
                </button>
                <div style={{opacity: isHover ? 1 : 0, pointerEvents: isHover ? "auto" : "none"}} className={styles.Dialog_body}>
                    <Descriptions title={`${movie.title}`} items={moviesOptions} size={"small"} layout={"horizontal"}/>
                </div>
            </div>

            <img style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            <div className={styles.Movie_title}>
                <Link to={`${MOVIE_ROUTE}?_${movie.id}`}>{movie.title}</Link>
            </div>
        </div>
    );
};

export default Movie;