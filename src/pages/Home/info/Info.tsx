import React, { useEffect, useState } from 'react';
import {List, message, } from 'antd'; // Adjusted to import Input directly
import { IMoviesResponse } from '../../../types/Movie';
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import {MOVIE_ROUTE} from "../../../utils/consts";
import MySearch from "../Menu/Search";
import Button from "antd/es/button";


interface IData {
    loading: boolean;
    error: boolean;
    results: IMoviesResponse | null;
}

const Info = () => {
    const [data, setData] = useState<IData>({
        loading: true,
        error: false,
        results: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk'
                    }
                };

                const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);

                if (!response.ok) {
                    throw new Error(`HTTP error! When trying to load upcoming list. Status: ${response.status}`);
                }

                const responseData = await response.json();
                setData({ error: false, loading: false, results: responseData as IMoviesResponse });
            } catch (err) {
                if (err instanceof Error) {
                    message.error(err.message);
                } else {
                    message.error('An unknown error occurred');
                }
                setData({ error: true, loading: false, results: null });
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data.error && <p>An error occurred while fetching data.</p>}
            <List
                style={{marginTop: 14}}
                header={<h6>Upcoming movies</h6>}
                bordered
                dataSource={data.results?.results ? data.results.results : []}
                renderItem={(item) => (
                    <List.Item>
                        <Button type={"text"}>{item.title}</Button>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Info;
