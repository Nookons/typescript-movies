import React from 'react';
import styles from './Footer.module.css'
import {Divider, Popover} from "antd";
import Button from "antd/es/button";
import Link from "antd/es/typography/Link";

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
const about = (
    <p style={{maxWidth: 800}}>
        Welcome to My Portfolio!
        My name is <span style={{fontWeight: 600, fontSize: 22}}>Kolomiiets Dmytro</span>, and I am a developer with 3
        years of experience in creating
        websites and applications. My portfolio is a collection of projects where I have applied my
        skills and creativity to solve various challenges and deliver effective solutions.
    </p>
);
const contacts = (
    <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    }}>
        <Link style={{fontSize: 20}} href="https://github.com/Nookons" target="_blank">
            GitHub
        </Link>
        <Link style={{fontSize: 20}} href="https://t.me/nookon" target="_blank">
            Telegram
        </Link>
    </div>
);

const Footer = () => {
    return (
        <footer className={styles.Main}>
            <div>
                <section className={styles.Main_button_body}>
                    <Popover content={about} trigger="hover">
                        <Link style={{fontSize: 24}}>About Me</Link>
                    </Popover>

                    <Popover content={content} title="Title" trigger="hover">
                        <Link style={{fontSize: 24}}>Products</Link>
                    </Popover>

                    <Popover content={content} title="Title" trigger="hover">
                        <Link style={{fontSize: 24}}>Help</Link>
                    </Popover>

                    <Popover content={contacts} title="My Contacts" trigger="hover">
                        <Link style={{fontSize: 24}}>Contacts</Link>
                    </Popover>
                </section>

                <Divider/>

                {/*<section className={styles.Main_text_body}>
                    <p>
                        Welcome to My Portfolio!
                        My name is <span style={{fontWeight: 600, fontSize: 22}}>Kolomiiets Dmytro</span>, and I am a developer with 3 years of experience in creating
                        websites and applications. My portfolio is a collection of projects where I have applied my
                        skills and creativity to solve various challenges and deliver effective solutions.
                    </p>
                </section>*/}

            </div>
            <div className={styles.Copyright}>
                <Link style={{fontSize: 20}} className="text-white" href="https://github.com/Nookons">
                    Powered by Nookon
                </Link>
            </div>
        </footer>
    );
};

export default Footer;