const apiRequest = jest.fn(() => {
    return Promise.resolve({
        status: "",
        data: {}
    });
});

export default apiRequest;