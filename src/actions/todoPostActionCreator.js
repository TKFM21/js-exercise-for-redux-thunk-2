import axios from 'axios';
import Todo from '../models/Todo';

const API_URL = 'http://localhost:3001/api/todos';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

export const postTodos = ({ title, body }) => {
    return async (dispatch) => {
        dispatch( postRequest() );
        try {
            const response = await axios.post(API_URL, {
                title,
                body
            });
            const todo = new Todo(response.data);
            dispatch( postSuccess(todo) );
        } catch (error) {
            dispatch( postFailure(error) );
        }
    };
};

const postRequest = () => {
    return {
        type: POST_REQUEST
    }
};

const postSuccess = (todo) => {
    return {
        type: POST_SUCCESS,
        todo
    }
};

const postFailure = (error) => {
    return {
        type: POST_FAILURE,
        error
    }
};