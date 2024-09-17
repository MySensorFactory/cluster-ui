import Select from "react-select";
import { selectStyles } from "../styles/SelectStyles";

export const SingleSelect = ({ options, value, onChange, placeholder }) => {
    return (
        <Select
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(option) => onChange(option.value)}
            placeholder={placeholder}
            styles={selectStyles}
        />
    );
};