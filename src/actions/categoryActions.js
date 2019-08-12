import { FETCH_CATEGORIES, SELECT_CATEGORY } from './types';
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
        console.log(data)
        dispatch({
            type: SELECT_CATEGORY,
            payload: data
        })
    })
}