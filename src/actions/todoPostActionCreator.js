import axios from 'axios';
import Todo from '../models/Todo';
import {
    fetchRequest,
    fetchSuccess,
    fetchFailure
} from './todoActionCreator';

const API_URL = 'http://localhost:3001/api/todos';

export const postTodos = ({ title, body }) => {
    return async (dispatch) => {
        dispatch( fetchRequest() );
        try {
            const response = await axios.post(API_URL, {
                title,
                body
            });
            const todo = new Todo(response.data);
            dispatch( fetchSuccess([todo]) );
        } catch (error) {
            dispatch( fetchFailure(error) );
        }
    };
};