import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE
} from '../actions/todoActionCreator';

const initialState = {
    isLoading: false,
    todos: [],
    error: null
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                isLoading: true,
                todos: [],
                error: null
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.todos
            };
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default todoReducer;