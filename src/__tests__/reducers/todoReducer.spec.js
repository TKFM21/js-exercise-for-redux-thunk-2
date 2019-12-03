import todoReducer from '../../reducers/todoReducer';
import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    POST_SUCCESS,
    PUT_SUCCESS,
    DELETE_SUCCESS
} from '../../actions/todoActionCreator';
import Todo from '../../models/Todo';

const dummyTodos = [1, 2].map( number => {
    const data = {
        id: number,
        title: 'dummy title' + number,
        body: 'dummy body' + number,
        complete: false,
        createdAt: '2019-10-29T04:30:13.511Z',
        updatedAt: '2019-10-29T04:30:13.511Z'
    };
    return new Todo(data);
});

describe('reducers/todoReducer TEST', () => {
    it('case FETCH_REQUESTはisLoadingがtrue', () => {
        const action = { type: FETCH_REQUEST };
        const newState = todoReducer(undefined, action);
        expect( newState ).toStrictEqual({
            isLoading: true,
            todos: [],
            error: null
        });
    });
    it('case FETCH_SUCCESSはisLoadingがfalse, todosにデータあり', () => {
        const action = { type: FETCH_SUCCESS, todos: dummyTodos };
        const newState = todoReducer(undefined, action);
        expect( newState ).toStrictEqual({
            isLoading: false,
            todos: dummyTodos,
            error: null
        });
    });
    it('case FETCH_FAILUREはisLoadingがfalse, errorにデータあり', () => {
        const dummyError = { message: 'dummy error'};
        const action = { type: FETCH_FAILURE, error: dummyError };
        const newState = todoReducer(undefined, action);
        expect( newState ).toStrictEqual({
            isLoading: false,
            todos: [],
            error: dummyError
        });
    });
    it('case POST_SUCCESS', () => {
        const dummyTodo = new Todo({
            id: 3,
            title: 'dummy title',
            body: 'dummy body',
            complete: false,
            createdAt: '2019-10-29T04:30:13.511Z',
            updatedAt: '2019-10-29T04:30:13.511Z'
        });
        const action = { type: POST_SUCCESS, todo: dummyTodo };
        const newState = todoReducer(
            {
                isLoading: false,
                todos: dummyTodos,
                error: null
            },
            action
        );
        expect( newState ).toStrictEqual({
            isLoading: false,
            todos: [ ...dummyTodos, dummyTodo ],
            error: null
        });
    });
    it('case PUT_SUCCESS', () => {
        const dummyTodo = new Todo({
            id: 2,
            title: 'update title',
            body: 'update body',
            complete: true,
            createdAt: '2019-10-29T04:30:13.511Z',
            updatedAt: '2019-10-29T04:30:13.511Z'
        });
        const action = { type: PUT_SUCCESS, todo: dummyTodo };
        const newState = todoReducer(
            {
                isLoading: false,
                todos: dummyTodos,
                error: null
            },
            action
        );
        expect( newState ).toStrictEqual({
            isLoading: false,
            todos: [dummyTodos[0], dummyTodo],
            error: null
        });
    });
    it('case DELETE_SUCCESS', () => {
        const dummyTodo = new Todo({
            id: 2,
            title: 'update title',
            body: 'update body',
            complete: true,
            createdAt: '2019-10-29T04:30:13.511Z',
            updatedAt: '2019-10-29T04:30:13.511Z'
        });
        const action = { type: DELETE_SUCCESS, todo: dummyTodo };
        const newState = todoReducer(
            {
                isLoading: false,
                todos: dummyTodos,
                error: null
            },
            action
        );
        expect( newState ).toStrictEqual({
            isLoading: false,
            todos: [dummyTodos[0]],
            error: null
        });
    });
});