import { FETCH_POSTS } from './types';
import * as readAPI from '../utils/api'

export const fetchPosts = () => dispatch => {
    readAPI.getAll().then(data => {
        console.log(data)
        dispatch({
            type: FETCH_POSTS,
            payload: data
        })
    });
}