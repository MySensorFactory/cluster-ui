import {theme} from "./theme";

export const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: theme.colors.secondary,
        borderColor: state.isFocused ? theme.colors.primary : theme.colors.border,
        boxShadow: "none",
        "&:hover": {
            borderColor: theme.colors.primary,
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: theme.colors.background,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? theme.colors.secondaryHover : theme.colors.background,
        color: theme.colors.text,
        "&:hover": {
            backgroundColor: theme.colors.secondaryHover,
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: theme.colors.text,
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: theme.colors.secondaryHover,
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: theme.colors.text,
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: theme.colors.text,
        "&:hover": {
            backgroundColor: theme.colors.secondaryHover,
            color: theme.colors.text,
        },
    }),
    input: (provided) => ({
        ...provided,
        color: theme.colors.text,
    }),
    placeholder: (provided) => ({
        ...provided,
        color: theme.colors.textMuted,
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: theme.colors.text,
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: theme.colors.secondaryHover,
    }),
};