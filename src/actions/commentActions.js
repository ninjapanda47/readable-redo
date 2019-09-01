import { FETCH_COMMENTS } from './types';
import * as readAPI from '../utils/api'

export const fetchComments = (id) => dispatch => {
    readAPI.getComments(id).then(data => {
        dispatch({
            type: FETCH_COMMENTS,
            payload: data
        })
    });
}
