import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Main } from '@/components/Main';
import { vi, describe, expect, it } from 'vitest';
import { useQuery } from 'react-query';
import '@testing-library/jest-dom';
import { SearchItem } from '@/components/SearchItem';

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
    expect(input).toBeInTheDocument();
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
  it('renders LoadingSkeleton when loading is true and input is not empty', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<Main />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    const loadingSkeleton = screen.getByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeInTheDocument();
  });
  it('shows information when the input is empty', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
    render(<Main />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    const information = screen.getByText(
      /Provide a value to search for the users./i
    );
    expect(information).toBeInTheDocument();
  });
});
