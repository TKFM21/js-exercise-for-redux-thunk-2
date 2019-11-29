import {
    POST_REQUEST,
    POST_SUCCESS,
    POST_FAILURE
} from '../actions/todoPostActionCreator';

const initialState = {
    isLoading: false,
    todo: null,
    error: null
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return {
                isLoading: true,
                todo: null,
                error: null
            };
        case POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todo: action.todo
            };
        case POST_FAILURE:
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