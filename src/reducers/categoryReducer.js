import { FETCH_CATEGORIES, SELECT_CATEGORY } from '../actions/types';

const initialState = {
    items: [],
    item: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                items: action.payload.categories
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}