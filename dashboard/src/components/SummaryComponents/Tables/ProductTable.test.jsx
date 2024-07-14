import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductTable from './ProductTable';

// Test case to check default values rendering
describe('ProductTable', () => {
  it('renders with default values when product is not found', () => {
    // Render the ProductTable component with a non-existing product name
    render(<ProductTable productName="N/A" />);

    // Check if each default value is rendered correctly in the table
    expect(screen.getByText('Product ID')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Number of Molds Used')).toBeInTheDocument();
    expect(screen.getByText('Molds Used')).toBeInTheDocument();
    expect(screen.getByText('Completed Percentage')).toBeInTheDocument();
    expect(screen.getByText('Time Taken')).toBeInTheDocument();
    expect(screen.getByText('Total Products Made')).toBeInTheDocument();
    expect(screen.getByText('Target Products')).toBeInTheDocument();
    expect(screen.getByText('Products to be Made')).toBeInTheDocument();

    // Check for multiple occurrences of "N/A"
    const naElements = screen.queryAllByText('N/A');
    expect(naElements.length).toBeGreaterThan(0);
    naElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});
