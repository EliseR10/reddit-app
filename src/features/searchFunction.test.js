import '@testing-library/jest-dom/extend-expect';
//import real function
import { loadAllPreview } from "../features/searchReducer";

//Mock the function
jest.mock("../features/searchReducer", () => ({
    loadAllPreview: jest.fn(),
}));

test("Get the search based on the input", async () => {
    //arrange
    const search = "travel";
    const expectedValue = {
        status: "mock",
        data: "Travel advisory in different countries"
    }

    //set the resolved value for the next call to apiRequest
    const mockResponse = {
        status: "mock",
        data: "Travel advisory in different countries"
    }
    loadAllPreview.mockResolvedValueOnce(mockResponse);

    //act
    const actualSearch = await loadAllPreview(search);

    //assert
    expect(actualSearch).toEqual(expectedValue);
})

test("Filter through the search", async () => {
    //arrange
    const search = "coding";
    const filter = "new";
    const expectedValue = {
        status: 'mock',
        data: "Allen Edmonds Discount Code August 2024"
    }

    //set the resolved value for the next call to apiRequest
    const mockResponse = {
        status: 'mock',
        data: "Allen Edmonds Discount Code August 2024"
    }
    loadAllPreview.mockResolvedValueOnce(mockResponse);

    //act
    const actualFilter = await loadAllPreview(search, filter);

    //assert
    expect(actualFilter).toEqual(expectedValue);
})