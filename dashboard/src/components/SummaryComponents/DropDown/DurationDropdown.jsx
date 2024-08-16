import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { styled } from '@mui/system';

// Define custom styles for the DateRangePicker component
const CustomDateRangePicker = styled(DateRangePicker)(({ theme }) => ({
  // Adjust box size
  '.MuiInputBase-root': {
    height: '40px', // Height of the input box
    width: '200px', // Width of the input box
  },
  
  // Specifically target the input labels
  '.MuiInputLabel-root': {
    color: 'black', // Label color
    fontSize: '15px', // Label font size
    fontWeight: 400, // Label font weight
  },
}));

export default function DurationDropdown() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <CustomDateRangePicker 
          localeText={{ start: 'Start-date', end: 'End-date' }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
