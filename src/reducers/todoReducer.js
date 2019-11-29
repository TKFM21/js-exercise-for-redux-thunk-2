import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    POST_SUCCESS
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
                ...state,
                isLoading: true
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
        case POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: [ ...state.todos, action.todo ]

            };
        default:
            return state;
    }
};

export default todoReducer;