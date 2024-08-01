import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

const Countries = () => {
    const location = useLocation();
    const iso = new URLSearchParams(location.search).get('iso');

    useEffect(() => {
        console.log(iso);
    }, [iso]);

    return (
        <div className={"container"}>
            Countries...
        </div>
    );
};

export default Countries;