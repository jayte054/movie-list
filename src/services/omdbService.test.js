

// import { render } from '@testing-library/react';
import { search, defaultMovies } from './omdbService'; // Adjust the import path

// describe('search function', () => {
//   it('returns search results', async () => {
//     const mockResponse = {
//       Search: [{ Title: 'marvel' }, { Title: 'thor' }],
//     };

//     fetch.mockResponseOnce(JSON.stringify(mockResponse));

//     const searchTerm = 'Avengers';
//     const results = await search(searchTerm);

//     expect(results).toEqual(mockResponse.Search);
//     expect(fetch).toHaveBeenCalledWith(
//       `https://www.omdbapi.com/?s=${searchTerm}&apikey=257bb5cd`
//     );
//   });

//   it('handles errors', async () => {
//     fetch.mockRejectOnce(new Error('Fetch error'));

//     const searchTerm = 'Invalid Search';
//     const results = await search(searchTerm);

//     expect(results).toBeUndefined();
//     expect(defaultMovies).toHaveBeenCalled();
//   });
// });

// Mock the fetch function
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('search function', () => {
  // Test successful search
  it('should return search results on successful API call', async () => {
    const mockSearchTerm = 'avengers';
    const mockResponse = {
      Search: [{ Title: 'Avengers: Endgame', Year: '2019', imdbID: 'tt4154796' }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await search(mockSearchTerm);
    expect(result).toEqual(mockResponse.Search);
  });

  // Test error case
  it('should handle API call error', async () => {
    const mockSearchTerm = 'invalidquery';
    const mockError = new Error('Fetch error');

    fetch.mockRejectOnce(mockError);

    console.error = jest.fn(); // Mock console.error to suppress error logs in the test output

    await expect(search(mockSearchTerm)).rejects.toEqual(mockError);
  });
});