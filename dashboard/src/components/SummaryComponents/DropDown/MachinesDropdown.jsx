import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

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

const machineNames = [
  'Machine1',
  'Machine2',
  'Machine3',
];

export default function MachinesDropdown() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedMachine, setSelectedMachine] = React.useState('');

  const handleChange = (event) => {
    const machine = event.target.value;
    setSelectedMachine(machine);
    navigate('/machine');
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="machine-select-label" sx={{ color: 'black', fontSize: '15px', fontWeight: 400 }}>Machine</InputLabel>
      <Select
        labelId="machine-select-label"
        id="machine-select"
        value={selectedMachine}
        onChange={handleChange}
        input={<OutlinedInput label="Machine" sx={{ height: 40 }} />}
        MenuProps={MenuProps}
      >
        {machineNames.map((machine) => (
          <MenuItem key={machine} value={machine}>
            {machine}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
