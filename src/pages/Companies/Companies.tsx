import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {ICompany} from "../../types/Companies";
import styles from './Companies.module.css'
import {Descriptions, DescriptionsProps, Divider, Skeleton} from "antd";
import Link from "antd/es/typography/Link";


const Companies = () => {
    const location = useLocation();
    const company_id = new URLSearchParams(location.search).get('company');
    const company_name = new URLSearchParams(location.search).get('name');

    const [company, setCompany] = useState<ICompany | null>(null);

    const companyOptions: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Company address',
            children: company?.headquarters || "Unknown 😭",
            span: 3
        },
        {
            key: '2',
            label: 'Origin country',
            children: company?.origin_country || "Unknown 😭",
            span: 3
        },
        {
            key: '2',
            label: 'Homepage',
            children: company?.homepage ? <Link href={company?.homepage}>{company?.homepage}</Link> : "Unknown 😭",
            span: 3
        },
    ];

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjQ1MTg2NC4wMDg1NTQsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u7m-dteudZ_7mNr06RscPhh5lxFDQ1iwr3f8wx_wkW8'
            }
        };

        fetch(`https://api.themoviedb.org/3/company/${company_id}`, options)
            .then(response => response.json())
            .then(response => setCompany(response as ICompany))
            .catch(err => console.error(err));
    }, [company_id, company_name]);

    return (
        <div className={"container"}>
            <div className={styles.Main}>
                {company
                    ?
                    <div>
                        {company?.logo_path
                            ?
                            <img style={{maxWidth: "100%"}} src={`https://image.tmdb.org/t/p/w500${company?.logo_path}`}
                                 alt=""/>
                            : <img style={{maxWidth: "100%"}}
                                   src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s`}
                                   alt=""/>
                        }
                    </div>
                :
                    <Skeleton.Image style={{width: '100%', height: '100%'}}/>

                }
                <div>
                    {company
                        ? <Descriptions title={company?.name} items={companyOptions}/>
                        : <Skeleton avatar paragraph={{rows: 4}}/>
                    }
                </div>
            </div>
            <Divider/>
        </div>
    );
};

export default Companies;