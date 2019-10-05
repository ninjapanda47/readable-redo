import { FETCH_POSTS, DELETE_POST, SET_CURRENT_POST, UPDATE_POST, DECREASE_COMMENT_COUNT, INCREASE_COMMENT_COUNT, SORT_BY, UPVOTE, DOWNVOTE } from '../actions/types';

const initialState = {
    items: [],
    item: []
}

export default function (state = initialState, action) {
    let posts = []
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
        case DELETE_POST:
            posts = state.items.filter(post => post.id !== action.payload.id);
            return {
                ...state,
                items: posts
            }
        case SET_CURRENT_POST:
            return {
                ...state,
                item: action.payload
            }
        case UPDATE_POST:
            posts = state.items.map(post => {
                if (post.id === action.payload.id) {
                    post = action.payload;
                }
                return post;
            });
            return {
                ...state,
                items: posts,
                item: action.payload
            }
        case INCREASE_COMMENT_COUNT:
            posts = state.items.map(post => {
                if (post.id === action.payload) {
                    post.commentCount++
                }
                return post
            })
            if (state.item.id === action.payload) {
                state.item.commentCount++
            }
            return {
                ...state,
                items: posts
            }
        case DECREASE_COMMENT_COUNT:
            posts = state.items.map(post => {
                if (post.id === action.payload) {
                    post.commentCount--
                }
                return post
            })
            if (state.item.id === action.payload) {
                state.item.commentCount--
            }
            return {
                ...state,
                items: posts,
            }
        case SORT_BY:
            function byTime(a, b) {
                return a.timestamp - b.timestamp;
            }
            function compareVotes(a, b) {
                return a.voteScore - b.voteScore;
            }
            if (action.payload === 'timestamp') {
                posts = state.items.slice().sort(byTime);
                return {
                    ...state,
                    items: posts
                }
            } else if (action.payload === 'vote') {
                posts = state.items.slice().sort(compareVotes);
                return {
                    ...state,
                    items: posts
                }
            }
            break
        case UPVOTE:
            posts = state.items.map(post => {
                if (post.id === action.payload) {
                    post.voteScore++
                }
                return post
            })
            if (state.item.id === action.payload) {
                state.item.voteScore++
            }
            return {
                ...state,
                items: posts
            }
        case DOWNVOTE:
            posts = state.items.map(post => {
                if (post.id === action.payload) {
                    post.voteScore--
                }
                return post
            })
            if (state.item.id === action.payload) {
                state.item.voteScore--
            }
            return {
                ...state,
                items: posts
            }

        default:
            return state;
    }
}