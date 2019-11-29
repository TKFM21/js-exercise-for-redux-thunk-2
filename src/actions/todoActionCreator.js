import axios from 'axios';
import Todo from '../models/Todo';

const API_URL = 'http://localhost:3001/api/todos';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchTodos = () => {
    return async (dispatch) => {
        dispatch( fetchRequest() );
        try {
            const response = await axios.get(API_URL);
            const todos = Todo.todosToInstanceArray(response.data.data);
            dispatch( fetchSuccess(todos) );
        } catch (error) {
            dispatch( fetchFailure(error) );
        }
    };
};

const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    }
};

const fetchSuccess = (todos) => {
    return {
        type: FETCH_SUCCESS,
        todos
    }
};

const fetchFailure = (error) => {
    return {
        type: FETCH_FAILURE,
        error
    }
};