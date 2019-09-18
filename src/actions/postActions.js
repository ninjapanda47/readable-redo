import { FETCH_POSTS, DELETE_POST, SET_CURRENT_POST, UPDATE_POST } from './types';
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
        console.log('added:', data)
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

export const setCurrentPost = (id) => dispatch => {
    readAPI.getPost(id).then(data => {
        dispatch({
            type: SET_CURRENT_POST,
            payload: data
        })
    })
}

export const updatePost = (id, post) => dispatch => {
    readAPI.updatePost(id, post).then(data => {
        dispatch({
            type: UPDATE_POST,
            payload: data
        })
    })
}