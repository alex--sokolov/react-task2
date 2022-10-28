import { IMovie } from 'interfaces';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const movies: IMovie[] = [
  {
    academyAwardNominations: 1,
    academyAwardWins: 2,
    boxOfficeRevenueInMillions: 3,
    budgetInMillions: 4,
    name: 'Superfilm',
    rottenTomatoesScore: 5,
    runtimeInMinutes: 42,
    _id: '555',
  },
  {
    academyAwardNominations: 1,
    academyAwardWins: 2,
    boxOfficeRevenueInMillions: 3,
    budgetInMillions: 4,
    name: 'Superfilm2',
    rottenTomatoesScore: 5,
    runtimeInMinutes: 42,
    _id: '557',
  },
];

const server = setupServer(
  rest.get(process.env.REACT_APP_API_URL as string, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ docs: movies }));
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

export {server, rest}
