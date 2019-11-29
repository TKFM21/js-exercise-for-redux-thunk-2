import {
    POST_REQUEST,
    POST_SUCCESS,
    POST_FAILURE,
    postTodos
} from '../../actions/todoPostActionCreator';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Todo from '../../models/Todo';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action/todoPostActionCreator TEST', () => {
    it('success post', async () => {
        const expectedResult = {
                id: 1,
                title: 'dummy title',
                body: 'dummy body',
                complete: false,
                createdAt: '2019-10-29T04:30:13.511Z',
                updatedAt: '2019-10-29T04:30:13.511Z'
        };
        axios.post.mockResolvedValue({
            data: expectedResult
        });

        const store = mockStore();
        await store.dispatch(postTodos({
            title: 'dummy title',
            body: 'dummy body'
        }));

        expect( store.getActions() ).toStrictEqual([
            {
                type: POST_REQUEST
            },
            {
                type: POST_SUCCESS,
                todo: new Todo(expectedResult)
            }
        ]);
    });
    it('failure post', async () => {
        const expectedResult = 'error';
        axios.post.mockRejectedValue({
            message: expectedResult
        });
        const store = mockStore();
        await store.dispatch(postTodos({
            title: 'dummy title',
            body: 'dummy body'
        }));

        expect( store.getActions() ).toStrictEqual([
            {
                type: POST_REQUEST
            },
            {
                type: POST_FAILURE,
                error: {
                    message: expectedResult
                }
            }
        ]);
    });
});