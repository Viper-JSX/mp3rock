import React, { ChangeEvent } from "react";

interface IProps {
    searchTerm: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const SearchForm: React.FC<IProps> = ({ 
    searchTerm,
    handleChange,
    handleSubmit
 }) => {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" value={searchTerm} placeholder="What searching?" onChange={handleChange} />
            <input className="search-form__submit-button" type="submit" value="GO" />
        </form>
    );  
}


export default SearchForm;