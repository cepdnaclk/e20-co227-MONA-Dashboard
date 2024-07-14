import './DatePicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import { format } from 'date-fns';

const DatePicker = () => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (ranges) => {
    const { selection } = ranges;
    setDate(selection);
    setIsSelected(true);
  };

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };

  return (
    <div className='date-picker-container'>
      <span onClick={handleClick} className='date-picker-calendar'>
        {isSelected
          ? `${format(date.startDate, 'MMM/dd/yyyy')} to ${format(date.endDate, 'MMM/dd/yyyy')}`
          : 'Select the duration'}
      </span>
      {openDate && (
        <DateRangePicker
          className='date-picker-range'
          ranges={[date]}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default DatePicker;
