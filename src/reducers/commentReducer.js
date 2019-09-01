import { FETCH_COMMENTS } from '../actions/types';

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
        default:
            return state;
    }
}