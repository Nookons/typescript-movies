import React, {useState} from 'react';
import styles from './Header.module.css'
import Button from "antd/es/button";
import {LoginOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Space} from "antd";

import logo from '../../assets/logotype.svg'
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE, SIGN_IN_ROUTE} from "../../utils/consts";



const Header = () => {
    const navigate = useNavigate();

    const [isUser, setIsUser] = useState<boolean>(false);

    return (
        <div className={styles.Main}>
            <button onClick={() => navigate(HOME_ROUTE)} className={styles.Logo_body}>
                <Avatar size={"large"} src={logo}/>
                <article>NMovies</article>
            </button>
            <div className={styles.Button_body}>
                <Button onClick={() => navigate(SIGN_IN_ROUTE)}><LoginOutlined /></Button>
                {isUser && <Button><UserOutlined/></Button>}
            </div>
        </div>
    );
};

export default Header;