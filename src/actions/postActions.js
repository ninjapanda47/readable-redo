import { FETCH_POSTS, DELETE_POST, SET_CURRENT_POST, UPDATE_POST, INCREASE_COMMENT_COUNT, DECREASE_COMMENT_COUNT, SORT_BY } from './types';
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

export const increaseCommentCount = (id) => dispatch => {
    dispatch({
        type: INCREASE_COMMENT_COUNT,
        payload: id
    })
}

export const decreaseCommentCount = (id) => dispatch => {
    dispatch({
        type: DECREASE_COMMENT_COUNT,
        payload: id
    })
}

export const sortBy = (type) => dispatch => {
    console.log('sort by', type)
    dispatch({
        type: SORT_BY,
        payload: type
    })
}
