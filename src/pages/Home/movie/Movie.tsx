import React, {FC, useState} from 'react';
import {IMovie} from "../../../types/Movie";
import {FrownOutlined, InfoCircleOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import styles from './Movie.module.css'
import {Descriptions, DescriptionsProps, Rate, Tooltip} from "antd";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState<boolean>(false);

    const [isInfo, setIsInfo] = useState<boolean>(false);

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

    const onMovieClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const id = movie.id;
        const params = new URLSearchParams({ movieId: id.toString() });
        navigate(`/movie?${params.toString()}`);
    };

    const onInfoEnter = () => {
        setIsHover(true)
        setIsInfo(false)
    }
    const onInfoLeave = () => {
        setIsHover(false)
        setIsInfo(true)
    }


    return (
        <div
            onMouseEnter={() => setIsInfo(true)}
            onMouseLeave={() => setIsInfo(false)}
            onClick={onMovieClick} className={styles.Main}
        >
            <Tooltip placement="top" title={movie.title} open={isInfo} defaultOpen={true} destroyTooltipOnHide={true}>
                <div>
                    <button
                        onMouseEnter={onInfoEnter}
                        onMouseLeave={onInfoLeave}
                        className={styles.Dialog_button}
                    >
                        <InfoCircleOutlined/>
                    </button>
                    <div style={{opacity: isHover ? 1 : 0, pointerEvents: isHover ? "auto" : "none"}}
                         className={styles.Dialog_body}>
                        <Descriptions title={`${movie.title}`} items={moviesOptions} size={"small"}
                                      layout={"horizontal"}/>
                    </div>
                </div>

                <img style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            </Tooltip>
        </div>
    );
};

export default Movie;