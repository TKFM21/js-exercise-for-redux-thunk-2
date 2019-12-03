class Todo {
    constructor({ id, title, body, complete, createdAt, updatedAt }) {
        this._id = id;
        this._title = title;
        this._body = body;
        this._complete = complete;
        this._createdAt = new Date(createdAt);
        this._updatedAt = new Date(updatedAt);
    }

    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get body() {
        return this._body;
    }
    get complete() {
        return this._complete;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }

    set title(text) {
        this._title = text;
    }
    set body(text) {
        this._body = text;
    }

    static todosToInstanceArray(todos) {
        return todos.map( todo => {
            const data = {
                id: todo.id,
                title: todo.title,
                body: todo.body,
                complete: todo.complete,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt
            };
            return new Todo(data);
        });
    }
}

export default Todo;