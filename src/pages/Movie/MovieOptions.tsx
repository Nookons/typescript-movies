import React, { FC } from 'react';
import {
    IMovieFull, ISpokenLanguage,
    ProductionCompany,
    ProductionCountry,
} from "../../types/FullMovie";
import { Descriptions, DescriptionsProps } from "antd";
import {Link} from "react-router-dom";

interface IMovieOptionsProps {
    movie: IMovieFull;
}


// Компонент для отображения production_companies
const ProductionCompanies: FC<{ companies: ProductionCompany[] }> = ({ companies }) => {
    if (companies.length === 0) {
        return <p>No production companies information available.</p>;
    }

    return (
        <div style={{display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap"}}>
            {companies.map((company) => (
                <Link to={`/company/${company.id}`} style={{whiteSpace: "nowrap", fontSize: 14}}>{company.name}</Link>
            ))}
        </div>
    );
};

const ProductionCountries: FC<{ countries: ProductionCountry[] }> = ({ countries }) => {
    if (countries.length === 0) {
        return <p>No production countries information available.</p>;
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {countries.map((country) => (
                <Link
                    key={country.iso_3166_1} // Убедитесь, что этот идентификатор уникален для каждого элемента
                    to={`/countries/${country.iso_3166_1}`} // Замените на реальный путь, если нужно
                    style={{ whiteSpace: "nowrap", fontSize: 14 }}
                >
                    {country.name}
                </Link>
            ))}
        </div>
    );
};

const SpokenLanguage: FC<{ languages: ISpokenLanguage[] }> = ({ languages }) => {
    if (languages.length === 0) {
        return <p>No spoken languages information available.</p>;
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {languages.map((language) => (
                <Link
                    key={language.iso_639_1} // Убедитесь, что этот идентификатор уникален для каждого элемента
                    to={`/languages/${language.iso_639_1}`} // Замените на реальный путь, если нужно
                    style={{ whiteSpace: "nowrap", fontSize: 14}}
                >
                    {language.name}
                </Link>
            ))}
        </div>
    );
};

const MovieOptions: FC<IMovieOptionsProps> = ({ movie }) => {
    const movieOptions: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tagline',
            children: movie.tagline || 'No tagline available',
            span: 3
        },
        {
            key: '2',
            label: 'Adult',
            children: movie.adult ? "Only for 18+" : "18-",
            span: 3
        },
        ...(movie.production_companies.length > 0 ? [
            {
                key: '3',
                label: 'Production Companies',
                children: <ProductionCompanies companies={movie.production_companies} />,
                span: 3
            }
        ] : []),
        ...(movie.production_countries.length > 0 ? [
            {
                key: '3',
                label: 'Production Countries',
                children: <ProductionCountries countries={movie.production_countries} />,
                span: 3
            }
        ] : []),

        ...(movie.spoken_languages.length > 0 ? [
            {
                key: '3',
                label: 'Languages',
                children: <SpokenLanguage languages={movie.spoken_languages} />,
                span: 3
            }
        ] : []),
        {
            key: '5',
            label: 'Budget',
            children: `$ ${movie.budget.toLocaleString()}`,
            span: 3
        },
        {
            key: '6',
            label: 'Release Date',
            children: movie.release_date,
            span: 3
        },
        {
            key: '7',
            label: 'Revenue',
            children: `$ ${movie.revenue.toLocaleString()}`,
            span: 3
        },
        {
            key: '8',
            label: 'Runtime',
            children: `${movie.runtime} minutes`,
            span: 3
        },
        {
            key: '8',
            label: 'Overview',
            children: movie.overview,
            span: 3
        },
    ];

    return <Descriptions title={<h4>{movie.title}</h4>} items={movieOptions} />;
};

export default MovieOptions;
