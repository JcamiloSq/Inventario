import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const SelectComponent = ({
    items,
    disabled,
    label,
    field: { name, onBlur, value, onChange },
    form: { touched, errors, setFieldValue, setFieldTouched }, }) => {
    const inputLabel = React.useRef(null);

    const handleChange = (event) => {
        if (onChange) {
          onChange(event);
        }
        setFieldTouched(name, true);
        setFieldValue(name, event.target.value);
      };
      const hasError = touched[name] && Boolean(errors[name]);
    return (
        <>
        <InputLabel ref={inputLabel}>{label}</InputLabel>
        <FormControl variant="outlined" fullWidth error={hasError} margin="dense">
            {hasError && <FormHelperText>{errors[name]}</FormHelperText>}
            <Select
                disabled = {disabled}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                displayEmpty
                sx={{ width: '100%' }}
            >
                <MenuItem value="">
                    <em>seleccione un registro</em>
                </MenuItem>
                {items.map((option) => (
                    <MenuItem key={option.value} value={option.value} disabled={option.disabled || false}>
                    {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
      </>
    );
  };

  export default SelectComponent;
