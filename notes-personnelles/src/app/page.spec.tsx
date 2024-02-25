import { render, screen } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Israil' } },
    status: 'authenticated',
  }),
}));

describe('Home Component', () => {
  it('renders the user name and logout button for authenticated user', async () => {
    render(<Home />);

    expect(screen.getByText('Se déconnecter')).toBeInTheDocument();
    expect(screen.getByText('Israil')).toBeInTheDocument();
  });
});
