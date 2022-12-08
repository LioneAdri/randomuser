import {render, screen} from '@testing-library/react';
import Pager from './Pager';

test('renders up btn', () => {
    render(<Pager/>);
    const upBtn = screen.getByTitle('Up');
    expect(upBtn).toBeInTheDocument();
});