//@ts-nocheck

const { render, screen } = require('@testing-library/react');
const { Posts } = require('.');

const props = {
  posts: [
    {
      id: 1,
      title: 'Título 1',
      body: 'Corpo 1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'Título 2',
      body: 'Corpo 2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'Título 3',
      body: 'Corpo 3',
      cover: 'img/img3.png',
    },
  ],
};

describe('<Posts />', () => {
  it('should render Posts', () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole('heading', { name: /Título/i })).toHaveLength(3);

    expect(screen.getAllByRole('img', { name: /Título/i })).toHaveLength(3);

    expect(screen.getAllByText(/corpo/i)).toHaveLength(3);

    expect(screen.getByRole('img', { name: /título 3/i })).toHaveAttribute('src', 'img/img3.png');
  });

  it('should not render posts', () => {
    render(<Posts />);
    expect(screen.queryByRole('heading', { name: /título/i })).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
