import { FETCH_POSTS, ADD_POST, DELETE_POST } from '../actions/types';

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
        case ADD_POST:
            posts = [...state.items, action.payload]
            return {
                ...state,
                items: posts
            }
        case DELETE_POST:
            posts = state.items.filter(post => post.id !== action.payload.id);
            return {
                ...state,
                items: posts
            };
        default:
            return state;
    }
}