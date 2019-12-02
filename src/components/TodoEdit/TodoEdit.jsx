import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { putTodos } from '../../actions/todoActionCreator';

const TodoEdit = (props) => {
    const id = parseInt(props.match.params.id, 10);
    const targetTodo = props.todos.find( todo => todo.id === id );
    const [title, setTitle] = useState(targetTodo ? targetTodo.title : '');
    const [body, setBody] = useState(targetTodo ? targetTodo.body : '');
    const [complete, setComplete] = useState(targetTodo ? targetTodo.complete : false);

    if (!targetTodo) return <Redirect to="/" />;

    if (props.isLoading) {
        return (
            <div>
                Now Updating...
            </div>
        );
    }

    return (
        <div>
            <h1>ID: {targetTodo.id}</h1>
            <label>Title: 
                <input
                    type="text"
                    name="title"
                    value={ title }
                    onChange={ (event) => setTitle(event.target.value) }
                >
                </input>
            </label>
            <br />
            <label>Body:
                <textarea
                    name="body"
                    value={ body }
                    onChange={ (event) => setBody(event.target.value) }
                >
                </textarea>
            </label>
            <br />
            <button onClick={ () => setComplete(!complete) }>
                {complete ? '完了' : '未完了'}
            </button>
            <br />
            <button onClick={() => props.putTodos( {id, title, body, complete} )}>
                Update Todo
            </button>
            <h2>Created At: {targetTodo.createdAt.toLocaleString("ja-JP")}</h2>
            <h2>Updated At: {targetTodo.updatedAt.toLocaleString("ja-JP")}</h2>
            
            <Link to="/">Todo List</Link>
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
        putTodos: ( {id, title, body, complete} ) => {
            dispatch( putTodos({id, title, body, complete}) );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoEdit);