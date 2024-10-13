import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function Dropdown({ data, label, onChange }) {
  const [selectedItem, setSelectedItem] = React.useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    if (onChange) {
      onChange(value); // Call the onChange callback if provided
    }
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id={`${label}-select-label`} sx={{ color: 'black', fontSize: '15px', fontWeight: 400 }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={selectedItem}
        onChange={handleChange}
        input={<OutlinedInput label={label} sx={{ height: 40 }} />}
        MenuProps={MenuProps}
      >
        {data.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
