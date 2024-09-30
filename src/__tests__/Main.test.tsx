import { render, screen, fireEvent } from '@testing-library/react';
import { Main } from '@/components/Main';
import { vi } from 'vitest';
import { useQuery } from 'react-query';

vi.mock('react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('@/requests/requests', () => ({
  fetchGitHubUsers: vi.fn(),
}));

describe('Main Component', () => {
  it('renders the input field', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { total_count: 0, items: [] },
      error: null,
      isLoading: false,
    });
    render(<Main />);
    const input = screen.getByLabelText(/GitHub Username/i);
    expect(input).toBeTruthy();
  });

  it('updates the input field on user input', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { total_count: 0, items: [] },
      error: null,
      isLoading: false,
    });

    render(<Main />);

    const input = screen.getByLabelText(/GitHub Username/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(input.value).toBe('testuser');
  });
});
