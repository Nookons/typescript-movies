import React from 'react';
import styles from './Header.module.css'
import Button from "antd/es/button";
import {LoginOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Space} from "antd";

import logo from '../../assets/logotype.svg'
import {useNavigate} from "react-router-dom";
import {SIGN_IN_ROUTE} from "../../utils/consts";



const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.Main}>
            <div>
                <Avatar size={"large"} src={logo}/>
            </div>
            <div className={styles.Button_body}>
                <Button onClick={() => navigate(SIGN_IN_ROUTE)}><LoginOutlined /></Button>
                <Button><UserOutlined /></Button>
            </div>
        </div>
    );
};

export default Header;