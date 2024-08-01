import React, { useState } from 'react';
import {Divider, Drawer, Input} from 'antd';
import {IMoviesResponse} from "../../../types/Movie";
import Link from "antd/es/typography/Link";

import styles from './Info.module.css'
import {useNavigate} from "react-router-dom";

const { Search } = Input;

const MySearch = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<IMoviesResponse | null>(null);

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState<string>("");

    const handleSearch = async (value: string) => {
        try {
            setSearch(value)
            setIsLoading(true)
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjQ1MTg2NC4wMDg1NTQsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u7m-dteudZ_7mNr06RscPhh5lxFDQ1iwr3f8wx_wkW8'
                }
            };

            fetch(`https://api.themoviedb.org/3/search/movie?query=${value}%20&include_adult=false&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => {
                    if (response && response.results.length > 0) {
                        setOpen(true)
                        setResponse(response as IMoviesResponse);
                    } else {

                    }
                    setIsLoading(false)
                })
                .catch(err => console.error(err));

        } catch (err) {
            console.error(err);
            setIsLoading(false)
        }
    };


    const onClose = () => {
        setOpen(false);
    };

    const onMovieClick = (id: number) => {
        const params = new URLSearchParams({movieId: id.toString()});
        navigate(`/movie?${params.toString()}`)
    }

    return (
        <div>
            <Drawer
                title={`Results for ${search}`}
                placement={"bottom"}
                closable={true}
                height={"100dvh"}
                onClose={onClose}
                open={open}
                key={"bottom"}
            >
                <div style={{display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center"}}>
                    {response?.results.map((element) => (
                        <Link onClick={() => onMovieClick(element.id)} className={styles.Card} style={{textAlign: "center", position:"relative"}}>
                            {element.poster_path
                                ? <img style={{
                                    width: '100%',
                                    maxWidth: 250,
                                    height: "auto",
                                }} src={`https://image.tmdb.org/t/p/w500${element.poster_path}`} alt=""/>
                                : <img style={{
                                    width: '100%',
                                    maxWidth: 250,
                                    height: "auto",
                                }} src={`https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg`} alt=""/>
                            }
                            <div className={styles.Search_movie_card}>
                                <article style={{color: "white"}}>{element.title}</article>
                                <Divider style={{color: "white", fontSize: 12}}>{element.release_date}</Divider>
                            </div>
                        </Link>
                    ))}
                </div>
            </Drawer>
            <Search
                onSearch={handleSearch}
                placeholder="Input search text"
                enterButton
                loading={isLoading}
            />
        </div>
    );
};

export default MySearch;
