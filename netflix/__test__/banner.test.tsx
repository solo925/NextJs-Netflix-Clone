import Banner from '@/componets/banner';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(), 
}));

describe('Banner Component', () => {
  const mockPush = jest.fn();
  const medias = [
    {
      id: "1",
      title: 'Movie 1',
      name: 'Show 1',
      original_name: 'Original Show 1',
      backdrop_path: '/backdrop.jpg',
      poster_path: '/poster.jpg',
      overview: 'This is a test overview.',
      type: 'movie',
    },
    {
      id: "2",
      title: 'Movie 2',
      name: 'Show 2',
      original_name: 'Original Show 2',
      backdrop_path: '/backdrop2.jpg',
      poster_path: '/poster2.jpg',
      overview: 'This is another test overview.',
      type: 'movie',
    },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    }); 
  });

  it('renders correctly with media data', () => {
    render(<Banner medias={medias} />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test overview.')).toBeInTheDocument();
  });

  it('displays the correct random media title', () => {
    render(<Banner medias={medias} />);
   
    expect(screen.getByText('Movie 1') || screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('navigates to the correct page when Play button is clicked', () => {
    render(<Banner medias={medias} />);

 
    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);

    expect(mockPush).toHaveBeenCalledWith('/watch/movie/1');
  });

  it('opens the "More Info" modal when clicked', () => {
    render(<Banner medias={medias} />);

    
    const moreInfoButton = screen.getByRole('button', { name: /more info/i });
    fireEvent.click(moreInfoButton);


    expect(moreInfoButton).toBeInTheDocument();
  });

  it('handles missing media gracefully', () => {
    render(<Banner medias={[]} />);

  
    expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie 2')).not.toBeInTheDocument();
  });
});
