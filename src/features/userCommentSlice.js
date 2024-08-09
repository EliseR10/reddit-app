import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Get the data for comments
export const loadComment = createAsyncThunk('comments/loadComment', async({article, accessToken}, {rejectWithValue}) => {
    //const proxy = `https://proxy.cors.sh/`;
    const url = `https://proxy.cors.sh/https://oauth.reddit.com/comments/${article.id}.json`;
    const loadTheComment = {
        method: 'GET',
        headers: {
        'User-Agent': 'searching-app/1.0 (revillot.elise@gmail.com)',
        'x-cors-api-key': 'temp_364db55de9fa6817245ada3c11ed4da2',
        'Authorization':'Bearer ' + accessToken,
        'Content-Type': 'application/json'
        }
    };

    try {
    const response = await fetch(`${url}`, loadTheComment);
    console.log("Fetching comments from " + url);

    if (response.status === 403){
        const errorText = await response.text();
        console.error('403 Forbidden: ', errorText);
        return rejectWithValue('Access forbidden: invalid token or insufficient per permissions');
    }
        if(!response.ok) {
            console.log(`Failed to load the comments:` + `${response.status}`);
            return rejectWithValue({ status: response.status, statusText: response.statusText });
        }
    
    const responseData = await response.json();
    console.log("Comments loaded: ", responseData);
    return { article: article.id, comments: responseData[1].data.children.map(child => child.data) };
    } catch (error) {
        return rejectWithValue({ message: error.message});
    }  
})

//Allow user to post comment 
export const postComment = createAsyncThunk("comments/postComment", async({article, comment, accessToken}) => {
    const requestBody = JSON.stringify({
        text: comment,
        thing_id: `t3_${article.id}` //t3_ is the prefix for Reddit post
    });
    //proxy = `https://proxy.cors.sh/`;
    const url = `https://proxy.cors.sh/https://oauth.reddit.com/api/comment`;
    
    try {
        const response = await fetch(url, 
        {method: 'POST', 
        body: requestBody,
        headers: {
            'User-Agent': 'reddit-app/by Elise',
            'x-cors-api-key': 'temp_364db55de9fa6817245ada3c11ed4da2',
            'Authorization':'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
        });

        if(!response.ok){
            console.log("Failed to log comments: " + `${response.status}`);
        }
    
        const responseData = await response.json();
        return { article: article.id, comment: responseData.data.things[0].data };

    } catch(error){
        return rejectWithValue({message: error.message});
    }
});

//Comment Reducer
export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        articles: {},
        isLoadingComments: false,
        failedToLoadComments: false, 

        createCommentIsPending: false,
        failedToCreateComments: false,

        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(loadComment.pending, (state) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
            state.error = null;
        })
        .addCase(loadComment.fulfilled, (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
            const {article, comments} = action.payload;
            state.articles[article] = comments;
        })
        .addCase(loadComment.rejected, (state) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
            //state.error = action.payload || {message: "unknown error occured"};
        })
        .addCase(postComment.pending, (state) => {
            state.createCommentIsPending = true;
            state.failedToCreateComments = false;
            state.error = null;
        })
        .addCase(postComment.fulfilled, (state, action) => {
            state.createCommentIsPending = false;
            state.failedToCreateComments = false;
            const {article, comment} = action.payload;
            if (!state.articles[article]) {
                state.articles[article] = [];
            } //see Notes
            state.articles[article].push(comment);
        })
        .addCase(postComment.rejected, (state) => {
            state.createCommentIsPending = false;
            state.failedToCreateComments = true;
            //state.error = action.payload || {message: "unknown error occured"};
        })
        //This keeps the comment updated in my application's state
    }
})
//Export everything
export default commentsSlice.reducer;
export const selectAllComments = (state) => state.comments.articles; //to retrieve the comments per articleId
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createComments = (state) => state.comments.createCommentIsPending;
export const selectCommentsError = (state) => state.comments.error;