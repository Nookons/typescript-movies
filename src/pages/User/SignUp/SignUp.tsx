import React, {useState} from 'react';
import {AutoComplete, AutoCompleteProps, DatePicker, DatePickerProps, Form, Input, message, Steps} from "antd";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import Button from "antd/es/button";
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from "@ant-design/icons";

import styles from './SignUp.module.css'
import {useNavigate} from "react-router-dom";
import {SIGN_IN_ROUTE} from "../../../utils/consts";
import dayjs from "dayjs";



const SignIn = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);


    const handleSearch = (value: string) => {
        setOptions(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', 'icloud.com', 'yahoo.com'].map((domain) => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        });
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        console.log(dayjs(date).valueOf());
    };

    const steps = [
        {
            title: 'Main information',
            content:
                <Form className={styles.Step_form_body}>
                    <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
                    <Input.Password
                        size={"large"}
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Input.Password
                        size={"large"}
                        placeholder="check password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form>,
        },
        {
            title: 'User email',
            content:
                <Form className={styles.Step_form_body}>
                    <AutoComplete
                        size={"large"}
                        style={{ width: 300 }}
                        onSearch={handleSearch}
                        placeholder="You're email"
                        options={options}
                    />
                </Form>,
        },
        {
            title: 'User data',
            content:
                <Form className={styles.Step_form_body}>
                    <Input size="large" placeholder="You're city" prefix={<UserOutlined />} />
                    <Input size="large" placeholder="Contry" prefix={<UserOutlined />} />
                    <Input size="large" placeholder="Post code" prefix={<UserOutlined />} />
                    <DatePicker size={"large"} onChange={onChange} />
                </Form>,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    return (
        <div className={"container"}>
            <div className={styles.Body}>
                <div></div>
                <div className={styles.Input_body}>
                    <h3>Sign Up page</h3>
                    <Steps current={current} items={items}/>
                    <div>{steps[current].content}</div>
                    <div style={{marginTop: 24}}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                    <Text style={{display: "flex", alignItems: "center", gap: 8}}>
                        You already have account?
                        <Link onClick={() => navigate(SIGN_IN_ROUTE)} target="_blank">
                            Sign In
                        </Link>
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default SignIn;