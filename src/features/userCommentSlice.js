import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Get the data for comments
export const loadComment = createAsyncThunk('comments/loadComment', async({articleId, accessToken}) => {
    //const proxy = `https://cors.bridged.cc/`;
    //const scope = "submit privatemessage read";
    const url = `https://cors.bridged.cc/https://www.reddit.com/comments/${articleId}.json`;
    const loadTheComment = {
        method: 'GET',
        headers: {
        'Authorization':'Bearer ' + accessToken,
        'Content-Type': 'application/json'
        }
    }
    const response = await fetch(url, loadTheComment);

    if(!response.ok) {
        throw new Error('Failed to load the comments');
    }
    if(response.ok) {
        console.log("You should see the comments");
    }

    const responseData = await response.json();
    return { articleId, comments: responseData};
})

//Allow user to post comment 
export const postComment = createAsyncThunk("comments/postComment", async({articleId, comment, accessToken}) => {
    const requestBody = JSON.stringify({
        text: comment,
        thing_id: articleId
    });
    //proxy = `https://cors.bridged.cc/`;
    //const scope = "submit privatemessage read";
    const url = `https://cors.bridged.cc/https://oauth.reddit.com/api/comment`;
    const response = await fetch(url, 
    {method: 'POST', 
    body: requestBody,
    headers: {
        'Authorization':'Bearer ' + accessToken,
        'Content-Type': 'application/json'
        }
    });
    
    const responseData = await response.json();
    return responseData;
});

//Comment Reducer
export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        articles: {},
        isLoadingComments: false,
        failedToLoadComments: false, 

        createCommentIsPending: false,
        failedToCreateComments: false
    },
    extraReducers: (builder) => {
        builder.addCase(loadComment.pending, (state) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        })
        .addCase(loadComment.fulfilled, (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
            const {articleId, comments} = action.payload;
            state.articles[articleId] = comments;
        })
        .addCase(loadComment.rejected, (state) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
        })
        .addCase(postComment.pending, (state) => {
            state.createCommentIsPending = true;
            state.failedToCreateComments = false;
        })
        .addCase(postComment.fulfilled, (state, action) => {
            state.createCommentIsPending = false;
            state.failedToCreateComments = false;
            const {articleId, comments} = action.payload;
            if (!state.articles[articleId]) {
                state.articles[articleId] = [];
            }
            state.articles[articleId].push(comments);
        })
        .addCase(postComment.rejected, (state) => {
            state.createCommentIsPending = false;
            state.failedToCreateComments = true;
        })
        //This keeps the comment updated in my application's state
    }
})
//Export everything
export default commentsSlice.reducer;
export const selectAllComments = (state) => state.comments.articles; //to retrieve the comments per articleId
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createComments = (state) => state.comments.createCommentIsPending;
