import todoPostReducer from '../../reducers/todoPostReducer';
import {
    POST_REQUEST,
    POST_SUCCESS,
    POST_FAILURE
} from '../../actions/todoPostActionCreator';
import Todo from '../../models/Todo';

describe('reducers/todoPostReducer TEST', () => {
    it('case POST_REQUESTはisLoadingがtrue', () => {
        const action = { type: POST_REQUEST };
        const newState = todoPostReducer(undefined, action);
        expect( newState ).toStrictEqual({
            isLoading: true,
            todo: null,
            error: null
        });
    });
    it('case POST_SUCCESSはisLoadingがfalse, todoにデータあり', () => {
        const data = {
            id: 1,
            title: 'dummy title',
            body: 'dummy body',
            complete: false,
            createdAt: '2019-10-29T04:30:13.511Z',
            updatedAt: '2019-10-29T04:30:13.511Z'
        };
        const dummyTodo = new Todo(data);
        const action = { type: POST_SUCCESS, todo: dummyTodo };
        const newState = todoPostReducer(undefined, action);
        expect( newState ).toStrictEqual({
            isLoading: false,
            todo: dummyTodo,
            error: null
        });
    });
    it('case POST_FAILUREはisLoadingがfalse, errorにデータあり', () => {
        const dummyError = { message: 'dummy error'};
        const action = { type: POST_FAILURE, error: dummyError };
        const newState = todoPostReducer(undefined, action);
        expect( newState ).toStrictEqual({
            isLoading: false,
            todo: null,
            error: dummyError
        });
    });
});