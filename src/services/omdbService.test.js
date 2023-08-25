import { search, defaultMovies } from './omdbService'; 

test("fetches api successfully", async() => {
    const mockResponse = {
        Response: "True"
    }
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
    });
    const result = await defaultMovies();
    expect(result).toEqual(mockResponse.Search);
});

test("fetches search result from api successfully", async() => {
    const searchTerm = "Thor";
    const mockResponse = {
        Response : "True"
    }
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
    });
    const result = await search(searchTerm)
    expect(result).toEqual(mockResponse.Search)
})