import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const partNames = [
  'part1',
  'part2',
  'part3',
  'part4',
  'part5',
];

export default function PartDropdown() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = React.useState('');

  const handleChange = (event) => {
    const part = event.target.value;
    setSelectedPart(part);
    navigate('/part');
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="part-select-label" sx={{ color: 'black', fontSize: '15px', fontWeight: 400 }}>Part</InputLabel>
      <Select
        labelId="part-select-label"
        id="part-select"
        value={selectedPart}
        onChange={handleChange}
        input={<OutlinedInput label="Part" sx={{ height: 40 }} />}
        MenuProps={MenuProps}
      >
        {partNames.map((part) => (
          <MenuItem key={part} value={part}>
            {part}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
