import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST
} from "../common/utils/constant";

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'magrfs',
        },
        content: '첫 번째 게시글입니다.',
        Images: [{
            src: 'https://images.mypetlife.co.kr/content/uploads/2021/10/19151330/corgi-g1a1774f95_1280-1024x682.jpg',
        }, {
            src: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
        }, {
            src: 'http://image.dongascience.com/Photo/2017/03/14900752352661.jpg',
        }],
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

/*export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});*/


const post = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            };
        // case ADD_COMMENT_REQUEST:
        //     return {
        //         ...state,
        //         add: true,
        //         addCommentDone: false,
        //         addCommentError: null,
        //     };
        // case ADD_COMMENT_SUCCESS:
        //     return {
        //         ...state,
        //         addCommentLoading: false,
        //         addCommentDone: true,
        //     };
        // case ADD_COMMENT_FAILURE:
        //     return {
        //         ...state,
        //         addCommentLoading: false,
        //         addCommentError: action.error,
        //     };
        default:
            return state;
    }
};

export default post;