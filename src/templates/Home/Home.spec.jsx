/* eslint-disable no-undef */
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
const { default: userEvent } = require('@testing-library/user-event');
import { Home } from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (request, response, context) => {
    return response(
      context.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
        },
        {
          userId: 1,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
        {
          userId: 1,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
        {
          userId: 1,
          id: 4,
          title: 'title 4',
          body: 'body 4',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (request, response, context) => {
    return response(
      context.json([
        {
          albumId: 1,
          id: 1,
          title: 'img 1',
          url: 'img/img1.png',
          thumbnailUrl: 'img/img1.png',
        },
        {
          albumId: 1,
          id: 2,
          title: 'img 2',
          url: 'img/img2.png',
          thumbnailUrl: 'img/img2.png',
        },
        {
          albumId: 1,
          id: 3,
          title: 'img 3',
          url: 'img/img3.png',
          thumbnailUrl: 'img/img3.png',
        },
        {
          albumId: 1,
          id: 4,
          title: 'img 4',
          url: 'img/img4.png',
          thumbnailUrl: 'img/img4.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  afterEach(() => server.resetHandlers());

  it('should render search, posts and load more button', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText("There's no posts...");
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText('Search...');
    const images = screen.getAllByRole('img');
    const button = screen.getByRole('button', { name: 'Load more posts' });

    expect(search).toBeInTheDocument();
    expect(images).toHaveLength(3);
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText("There's no posts...");
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText('Search...');

    expect(search).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');

    expect(screen.getByRole('heading', { name: /1: title 1/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search value: title 1' })).toBeInTheDocument();

    userEvent.clear(search);

    expect(screen.getByRole('heading', { name: /1: title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument();

    const searchTerm = 'blo';
    userEvent.type(search, searchTerm);

    // Para capturar o texto de busca entre tags strong, de acordo com:
    // https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library
    expect(screen.getByText(/There's no posts with/i, { exact: false }).textContent).toEqual(
      `There's no posts with ${searchTerm}.`,
    );
  });

  it('should load more posts when button clicked', async () => {
    const { debug } = render(<Home />);

    const noMorePosts = screen.getByText("There's no posts...");
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: 'Load more posts' });
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument();
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    expect(screen.queryByRole('heading', { name: /title 4/i })).toBeInTheDocument();
    expect(button).toBeDisabled();

    //debug();
  });
});
