import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    fetchTodos
} from '../../actions/todoActionCreator';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Todo from '../../models/Todo';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action/todoActionCreator TEST', () => {
    it('success fetch', async () => {
        const expectedResult = [1, 2].map( number => {
            return {
                id: number,
                title: 'dummy title',
                body: 'dummy body',
                complete: false,
                createdAt: '2019-10-29T04:30:13.511Z',
                updatedAt: '2019-10-29T04:30:13.511Z'
            };
        });
        axios.get.mockResolvedValue({
            data: {
                data: expectedResult
            }
        });

        const store = mockStore();
        await store.dispatch(fetchTodos());

        expect( store.getActions() ).toStrictEqual([
            {
                type: FETCH_REQUEST
            },
            {
                type: FETCH_SUCCESS,
                todos: Todo.todosToInstanceArray(expectedResult)
            }
        ]);
    });
    it('failure fetch', async () => {
        const expectedResult = 'error';
        axios.get.mockRejectedValue({
            message: expectedResult
        });
        const store = mockStore();
        await store.dispatch(fetchTodos());

        expect( store.getActions() ).toStrictEqual([
            {
                type: FETCH_REQUEST
            },
            {
                type: FETCH_FAILURE,
                error: {
                    message: expectedResult
                }
            }
        ]);
    });
});