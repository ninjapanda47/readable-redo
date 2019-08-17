import { FETCH_CATEGORIES } from '../actions/types';

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
        default:
            return state;
    }
}