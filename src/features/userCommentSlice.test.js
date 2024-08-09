import '@testing-library/jest-dom/extend-expect';

//import real function
import { loadComment, postComment } from "../features/userCommentSlice";

//Mock the function
jest.mock("../features/userCommentSlice", () => ({
    loadComment: jest.fn(),
    postComment: jest.fn()
}));

test("Load the comment", async () => {
    //arrange
    const articleId = "ahal9v";
    const expectedValue = {
        status: "mock",
        data: "I'd stop at nonono. The trunk is a crumple zone. In a collision, everything in the trunk is extremely vulnerable."
    }

    //set the resolved value for the next call to apiRequest
    const mockResponse = {
        status: "mock",
        data: "I'd stop at nonono. The trunk is a crumple zone. In a collision, everything in the trunk is extremely vulnerable."
    }
    loadComment.mockResolvedValueOnce(mockResponse);

    //act
    const actualLoad = await loadComment(articleId);

    //assert
    expect(actualLoad).toEqual(expectedValue);
})

test("Post user comment from an input", async () => {
    //arrange
    const comment = "user comment";
    const expectedValue = {
        status: "mock",
        data: "trial user comments"
    }

    //set the resolved value for the next call to apiRequest
    const mockResponse = {
        status: "mock",
        data: "trial user comments"
    }

    postComment.mockResolvedValueOnce(mockResponse);

    //act
    const actualComment = await postComment(comment);

    //assert
    expect(actualComment).toEqual(expectedValue);
})

    