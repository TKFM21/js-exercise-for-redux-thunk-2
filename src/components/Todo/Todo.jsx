import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, postTodos } from '../../actions/todoActionCreator';

const Todo = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onClickHandler = () => {
        props.postTodos( {title, body} );
        setTitle('');
        setBody('');
    };

    if (props.isLoading) {
        return (
            <div>
                <h1>Now Loading...</h1>
            </div>
        );
    }
    if (props.todos.length) {
        const todoItems = props.todos.map( (todo, index) => {
            return (
                <tr key={index}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.body}</td>
                    <td>{todo.complete ? '完了' : '未完了'}</td>
                    <td>{todo.createdAt.toLocaleString("ja-JP")}</td>
                    <td>{todo.updatedAt.toLocaleString("ja-JP")}</td>
                </tr>
            );
        });
        return (
            <div>
                <h1>Todo List</h1>
                <label>
                    <input
                        type="text"
                        name="title"
                        value={ title }
                        onChange={ (event) => setTitle(event.target.value) }
                    >
                    </input>
                </label>
                <br />
                <label>
                    <textarea
                        name="body"
                        value={ body }
                        onChange={ (event) => setBody(event.target.value) }
                    >
                    </textarea>
                </label>
                <br />
                <button onClick={onClickHandler}>
                    Post Todos
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Comp</th>
                            <th>Created At</th>
                            <th>Updated At</th>
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo);