import React, { useEffect, useState } from 'react';
import {Input, List, message, Rate} from 'antd'; // Adjusted to import Input directly
import { IMoviesResponse } from '../../../types/Movie';
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import {MOVIE_ROUTE} from "../../../utils/consts";

const { Search } = Input; // Destructuring Search from Input

interface IData {
    loading: boolean;
    error: boolean;
    results: IMoviesResponse | null;
}

const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

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

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleSearch = (value: string) => {
        console.log('Search value:', value);
        // Implement search functionality here
    };

    return (
        <div>
            <h6>Search</h6>
            <br />
            <Search
                placeholder="Enter movie title for search"
                loading={data.loading}
                onSearch={handleSearch}
                enterButton
            />
            {data.error && <p>An error occurred while fetching data.</p>}
            <List
                style={{marginTop: 14}}
                header={<h6>Upcoming movies</h6>}
                bordered
                dataSource={data.results?.results ? data.results.results : []}
                renderItem={(item) => (
                    <List.Item>
                        <Link to={`${MOVIE_ROUTE}?_${item.id}`}>{item.title}</Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Info;
