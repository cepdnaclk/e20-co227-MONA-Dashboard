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

const productNames = [
  'product1',
  'product2',
  'product3',
];

export default function ProductDropdown() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = React.useState('');

  const handleChange = (event) => {
    const product = event.target.value;
    setSelectedProduct(product);
    navigate('/product');
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="product-select-label" sx={{ color: 'black', fontSize: '15px', fontWeight: 400 }}>Product</InputLabel>
      <Select
        labelId="product-select-label"
        id="product-select"
        value={selectedProduct}
        onChange={handleChange}
        input={<OutlinedInput label="Product" sx={{ height: 40 }} />}
        MenuProps={MenuProps}
      >
        {productNames.map((product) => (
          <MenuItem key={product} value={product}>
            {product}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
