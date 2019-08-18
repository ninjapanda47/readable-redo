import { FETCH_POSTS, ADD_POST, DELETE_POST } from './types';
import * as readAPI from '../utils/api'

export const fetchPosts = () => dispatch => {
    readAPI.getAll().then(data => {
        dispatch({
            type: FETCH_POSTS,
            payload: data
        })
    });
}

export const addPost = (post) => dispatch => {
    readAPI.addPost(post).then(data => {
        dispatch({
            type: ADD_POST,
            payload: data
        })
    });
}

export const deletePost = (id) => dispatch => {
    readAPI.deletePost(id).then(data => {
        dispatch({
            type: DELETE_POST,
            payload: data
        })
    });
}
