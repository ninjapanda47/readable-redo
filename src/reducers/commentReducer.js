import { FETCH_COMMENTS, SET_CURRENT_COMMENT, ADD_COMMENT, DELETE_COMMENT } from '../actions/types';

const initialState = {
    items: [],
    item: []
}

export default function (state = initialState, action) {
    let comments = []
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                items: action.payload
            }
        case SET_CURRENT_COMMENT:
            return {
                ...state,
                item: action.payload
            }
        case ADD_COMMENT:
            comments = [...state.items, action.payload]
            return {
                ...state,
                items: comments
            }
        case DELETE_COMMENT:
            comments = state.items.filter(comment => comment.id !== action.payload.id);
            return {
                ...state,
                items: comments
            }
        default:
            return state;
    }
}