import todoReducer from '../../reducers/todoReducer';
import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE
} from '../../actions/todoActionCreator';
import Todo from '../../models/Todo';

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
});