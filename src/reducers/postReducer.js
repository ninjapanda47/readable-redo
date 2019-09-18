import { FETCH_POSTS, ADD_POST, DELETE_POST, SET_CURRENT_POST, UPDATE_POST } from '../actions/types';

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
                items: posts
            }
        default:
            return state;
    }
}