import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    fetchTodos,
    POST_SUCCESS,
    postTodos,
    PUT_SUCCESS,
    putTodos
} from '../../actions/todoActionCreator';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Todo from '../../models/Todo';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action/todoActionCreator TEST', () => {
    describe('GET', () => {
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
    describe('POST', () => {
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
                    type: FETCH_REQUEST
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
    describe('PUT', () => {
        it('success put', async () => {
            const expectedResult = {
                id: 1,
                title: 'dummy title',
                body: 'dummy body',
                complete: true,
                createdAt: '2019-10-29T04:30:13.511Z',
                updatedAt: '2019-10-29T04:30:13.511Z'
            };
            axios.put.mockResolvedValue({
                data: expectedResult
            });
    
            const store = mockStore();
            await store.dispatch(putTodos({
                id: 1,
                title: 'dummy title',
                body: 'dummy body',
                complete: true
            }));
    
            expect( store.getActions() ).toStrictEqual([
                {
                    type: FETCH_REQUEST
                },
                {
                    type: PUT_SUCCESS,
                    todo: new Todo(expectedResult)
                }
            ]);
        });
        it('failure put', async () => {
            const expectedResult = 'error';
            axios.put.mockRejectedValue({
                message: expectedResult
            });
            const store = mockStore();
            await store.dispatch(putTodos({
                id: 1,
                title: 'dummy title',
                body: 'dummy body',
                complete: true
            }));
    
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
});