import { FETCH_CATEGORIES, FETCH_POSTS } from './types';
import * as readAPI from '../utils/api'

export const fetchCategories = () => dispatch => {
    readAPI.getCategories().then(data => {
        dispatch({
            type: FETCH_CATEGORIES,
            payload: data
        })
    });
}

export const selectCategory = (category) => dispatch => {
    readAPI.getPostsForCategory(category).then(data => {
        dispatch({
            type: FETCH_POSTS,
            payload: data
        })
    })
}