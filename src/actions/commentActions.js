import { FETCH_COMMENTS, SET_CURRENT_COMMENT, ADD_COMMENT, DELETE_COMMENT } from './types';
import * as readAPI from '../utils/api'

export const fetchComments = (id) => dispatch => {
    readAPI.getComments(id).then(data => {
        dispatch({
            type: FETCH_COMMENTS,
            payload: data
        })
    });
}

export const setCurrentComment = (id) => dispatch => {
    readAPI.getComment(id).then(data => {
        dispatch({
            type: SET_CURRENT_COMMENT,
            payload: data
        })
    })
}

export const addComment = (comment) => dispatch => {
    readAPI.addComment(comment).then(data => {
        dispatch({
            type: ADD_COMMENT,
            payload: data
        })
    });
}

export const deleteComment = (id) => dispatch => {
    readAPI.deleteComment(id).then(data => {
        dispatch({
            type: DELETE_COMMENT,
            payload: data
        })
    });
}