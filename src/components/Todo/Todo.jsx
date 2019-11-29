import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions/todoActionCreator';

const Todo = (props) => {
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo);