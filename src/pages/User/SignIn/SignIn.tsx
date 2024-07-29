import React from 'react';
import styles from './SignIn.module.css'
import {Form, Input} from "antd";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import Button from "antd/es/button";
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {SIGN_UP_ROUTE} from "../../../utils/consts";


const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div className={"container"}>
            <div className={styles.Body}>
                <div></div>
                <div className={styles.Input_body}>
                    <h3>Welcome back</h3>
                    <Form >
                        <Input size="large" placeholder="Username or email" prefix={<UserOutlined />} />
                        <Input.Password
                            size={"large"}
                            placeholder="input password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form>
                    <Text style={{display: "flex", alignItems: "center", gap: 8}}>
                        Don't have account?
                        <Link onClick={() => navigate(SIGN_UP_ROUTE)} target="_blank">
                            Sign Up
                        </Link>
                    </Text>
                    <Button type="primary">Sign in</Button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;