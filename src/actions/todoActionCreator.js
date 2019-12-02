import axios from 'axios';
import Todo from '../models/Todo';

const API_URL = 'http://localhost:3001/api/todos';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const POST_SUCCESS = 'POST_SUCCESS';
export const PUT_SUCCESS = 'PUT_SUCCESS';

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

export const postTodos = ({ title, body }) => {
    return async (dispatch) => {
        dispatch( fetchRequest() );
        try {
            const response = await axios.post(API_URL, {
                title,
                body
            });
            const todo = new Todo(response.data);
            dispatch( postSuccess(todo) );
        } catch (error) {
            dispatch( fetchFailure(error) );
        }
    };
};

export const putTodos = ({ id, title, body, complete }) => {
    return async (dispatch) => {
        dispatch( fetchRequest() );
        try {
            const response = await axios.put(API_URL + '/' + id, {
                title,
                body,
                complete
            });
            const todo = new Todo(response.data);
            dispatch( putSuccess(todo) );
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

const postSuccess = (todo) => {
    return {
        type: POST_SUCCESS,
        todo
    }
};

const putSuccess = (todo) => {
    return {
        type: PUT_SUCCESS,
        todo
    }
};

const fetchFailure = (error) => {
    return {
        type: FETCH_FAILURE,
        error
    }
};