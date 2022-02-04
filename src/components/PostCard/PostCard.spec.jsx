import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    // @ts-ignore
    const { debug } = render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: 'Título' })).toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', { name: /Título/i }));

    expect(screen.getByText('Corpo'));
  });

  it('should match snapshot', () => {
    // @ts-ignore
    const { container } = render(<PostCard {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
