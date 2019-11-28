import Todo from '../../models/Todo';

const dummy = {
    id: 1,
    title: 'dummy title',
    body: 'dummy body',
    complete: false,
    createdAt: '2019-10-29T04:30:13.511Z',
    updatedAt: '2019-10-29T04:30:13.511Z'
};

describe('models/Todo TEST', () => {
    it('constructorとゲッターのテスト', () => {
        const newTodo = new Todo(dummy);
        expect( newTodo.id ).toStrictEqual( dummy.id );
        expect( newTodo.title ).toStrictEqual( dummy.title );
        expect( newTodo.body ).toStrictEqual( dummy.body );
        expect( newTodo.complete ).toStrictEqual( dummy.complete );
        expect( newTodo.createdAt ).toStrictEqual( new Date(dummy.createdAt) );
        expect( newTodo.updatedAt ).toStrictEqual( new Date(dummy.updatedAt) );
    });

    it('setterでtitleとbodyが更新される', () => {
        const newTodo = new Todo(dummy);
        const updateTitle = 'update title';
        newTodo.title = updateTitle;
        expect( newTodo.title ).toStrictEqual( updateTitle );
        const updateBody = 'update body';
        newTodo.body = updateBody;
        expect( newTodo.body ).toStrictEqual( updateBody );
    });

    it('toggleCompleteはcompleteを反転させる', () => {
        const newTodo = new Todo(dummy);
        expect( newTodo.complete ).toStrictEqual( false );
        newTodo.toggleComplete();
        expect( newTodo.complete ).toStrictEqual( true );
    });

    it('static method todosToInstanceArrayはオブジェクト要素の配列を引数にinstance要素の配列でreturn', () => {
        const inputData = [1, 2, 3].map( number => {
            return {
                id: number,
                title: 'dummy title' + number,
                body: 'dummy body' + number,
                complete: false,
                createdAt: '2019-10-29T04:30:13.511Z',
                updatedAt: '2019-10-29T04:30:13.511Z'
            };
        });
        const todos = Todo.todosToInstanceArray(inputData);
        expect( Array.isArray(todos) ).toStrictEqual( true );
        expect( todos.length ).toStrictEqual( inputData.length );
        todos.forEach( todo => {
            expect( todo instanceof Todo ).toStrictEqual( true );
        });
    });
});