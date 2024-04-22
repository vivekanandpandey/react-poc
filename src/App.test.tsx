import { render } from '@testing-library/react';
import App from './App'; 
// import {tableData,tableColumns} from './mocks/data'


describe('App component', () => {
  test('renders Table component with provided data and columns', () => {
    
    const { getByText,container } = render(<App />);
    
    const TickerText = getByText('Ticker');
    expect(TickerText).toBeInTheDocument();

    const priceText =getByText('Price');
    expect(priceText).toBeInTheDocument();
    expect(getByText(`Asset Class ↑`)).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('app-container');
  });

  
});
