import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    POST_SUCCESS,
    PUT_SUCCESS
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
        case PUT_SUCCESS:
            const updateTodos = state.todos.map( todo => {
                if (action.todo.id === todo.id) {
                    return action.todo;
                }
                return todo;
            });
            return {
                ...state,
                isLoading: false,
                todos: updateTodos
            };
        default:
            return state;
    }
};

export default todoReducer;