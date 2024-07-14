import Select from "react-select";
import React from "react";

const MultiSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#2a2a36',
        borderColor: state.isFocused ? '#4caf50' : '#3a3a3a',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#4caf50',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1C1C21',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#3a3a3a' : '#1C1C21',
        color: 'white',
        '&:hover': {
            backgroundColor: '#2a2a36',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#3a3a3a',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'white',
        '&:hover': {
            backgroundColor: '#4a4a4a',
            color: 'white',
        },
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'white',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#3a3a3a',
    }),
};

export const MultiSelect = ({options, value, onChange, placeholder}) => {
    return (<Select
        isMulti
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={MultiSelectStyles}
    />)
}

export const SingleSelect = ({options, value, onChange, placeholder}) => {

    return (<Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={MultiSelectStyles}
    />)
}

