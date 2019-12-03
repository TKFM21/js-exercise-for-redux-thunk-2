import store from '../../store';

describe('store/index TEST', () => {
    it('storeの初期値を確認', () => {
        expect( store.getState() ).toStrictEqual({
            isLoading: false,
            todos: [],
            error: null
        });
    });
});