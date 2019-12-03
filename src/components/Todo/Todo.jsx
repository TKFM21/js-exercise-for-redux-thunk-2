import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodos, postTodos, putTodos, deleteTodos } from '../../actions/todoActionCreator';

const Todo = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [formOn, setFormOn] = useState(null);
    const [formBody, setFormBody] = useState('');

    const firstMountRun = props.fetchTodos;
    useEffect(() => {
        firstMountRun();
    }, [firstMountRun]);

    const onClickHandler = () => {
        props.postTodos( {title, body} );
        setTitle('');
        setBody('');
    };

    const onKeyDown = (event) => {
        if (event.shiftKey && event.keyCode === 13) {
            props.putTodos({
                id: formOn.id,
                body: formBody
            });
            setFormOn(null);
        }
    };

    const inputBodyForm = () => {
        return (
            <input
                type="text"
                name="form-body"
                value={ formBody }
                onChange={ (event) => setFormBody(event.target.value) }
                onKeyDown={ onKeyDown }
            />
        );
    };

    const onClickBody = (todo) => {
        setFormOn(todo);
        setFormBody(todo.body);
    };

    if (props.isLoading) return <h1>Now Loading...</h1>;
    
    if (props.todos.length) {
        const todoItems = props.todos.map( todo => {
            return (
                <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td><Link to={`/${todo.id}`}>{todo.title}</Link></td>
                    <td
                        onClick={() => onClickBody(todo)}
                    >
                        {formOn === todo ? inputBodyForm() : todo.body}
                    </td>
                    <td>
                        <button
                            onClick={
                                () => props.putTodos({
                                    id: todo.id,
                                    complete: !todo.complete
                                })
                            }
                        >
                            {todo.complete ? '完了' : '未完了'}
                        </button>
                    </td>
                    <td>{todo.createdAt.toLocaleString("ja-JP")}</td>
                    <td>{todo.updatedAt.toLocaleString("ja-JP")}</td>
                    <td><button onClick={() => props.deleteTodos(todo.id)}>Delete</button></td>
                </tr>
            );
        });
        return (
            <div>
                <h1>Todo List</h1>
                <label>Title: 
                    <input
                        type="text"
                        name="title"
                        value={ title }
                        onChange={ (event) => setTitle(event.target.value) }
                    />
                </label>
                <br />
                <label>Body:
                    <textarea
                        name="body"
                        value={ body }
                        onChange={ (event) => setBody(event.target.value) }
                    />
                </label>
                <br />
                <button onClick={onClickHandler}>
                    Post Todos
                </button>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Comp</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoItems}
                    </tbody>
                </table>
            </div>
        );
    }
    return (
        <div>
            <h1>Todo App</h1>
            <button onClick={props.fetchTodos}>Get Todos</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        todos: state.todos,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => {
            dispatch( fetchTodos() );
        },
        postTodos: ( {title, body} ) => {
            dispatch( postTodos({title, body}) );
        },
        putTodos: ( {id, title, body, complete} ) => {
            dispatch( putTodos({id, title, body, complete}) );
        },
        deleteTodos: (id) => {
            dispatch( deleteTodos(id) );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo);