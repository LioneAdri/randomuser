import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


describe("testing app", () => {
    test('renders application', () => {
        render(<App/>);
        const formElement = screen.getByText(/gender/i);
        expect(formElement).toBeInTheDocument();
    });
});