import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodos, postTodos, putTodos, deleteTodos } from '../../actions/todoActionCreator';
import Form from '../Form/Form';
import './Todo.css';

import {
    useStyles,
    Table,
    TableRow,
    TableBody,
    TableHead,
    Paper,
    StyledTableCell,
    StyledTableRow
} from '../Table/Table';

import Button from '@material-ui/core/Button';

import Link from '@material-ui/core/Link';

import TextField from '@material-ui/core/TextField';

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const Todo = (props) => {
    const classes = useStyles();

    const [selectedTodo, setSelectedTodo] = useState(null);
    const [formBody, setFormBody] = useState('');

    const firstMountRun = props.fetchTodos;
    useEffect(() => {
        firstMountRun();
    }, [firstMountRun]);

    const onKeyDown = (event) => {
        if (event.shiftKey && event.keyCode === 13) {
            const trimFormBody = formBody.trim();
            // 入力値が有り、かつ、既存内容と異なる場合に更新が実行される
            if (trimFormBody && (trimFormBody !== selectedTodo.body)) {
                props.putTodos({
                    id: selectedTodo.id,
                    body: formBody
                });
            }
            setSelectedTodo(null);
        }
    };

    const inputBodyForm = () => {
        return (
            <TextField
                id="standard-basic"
                value={ formBody }
                onChange={ (event) => setFormBody(event.target.value) }
                onKeyDown={ onKeyDown }
            />
        );
    };

    const onClickBody = (todo) => {
        setSelectedTodo(todo);
        setFormBody(todo.body);
    };

    if (props.isLoading) return <h1>Now Loading...</h1>;
    
    if (props.todos.length) {
        const todoItems = props.todos.map( todo => {
            const { id, title, body, complete, createdAt, updatedAt } = todo;
            return (
                <StyledTableRow key={id}>
                    <StyledTableCell>{id}</StyledTableCell>
                    <StyledTableCell>
                        <Link component={Link1} to={`/${id}`}>
                            {title}
                        </Link>
                    </StyledTableCell>
                    <StyledTableCell
                        onClick={() => onClickBody(todo)}
                    >
                        {selectedTodo === todo ? inputBodyForm() : body}
                    </StyledTableCell>
                    <StyledTableCell>
                        <Button
                            onClick={() => props.putTodos({id,　complete: !complete})}
                            color={complete ? 'primary' : 'secondary'}
                        >
                            {complete ? '完了' : '未完了'}
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell>{createdAt.toLocaleString("ja-JP")}</StyledTableCell>
                    <StyledTableCell>{updatedAt.toLocaleString("ja-JP")}</StyledTableCell>
                    <StyledTableCell>
                        <Button
                            onClick={() => props.deleteTodos(id)}
                            variant="outlined"
                            color="secondary"
                        >
                            DELETE
                        </Button>
                    </StyledTableCell>
                </StyledTableRow>
            );
        });
        return (
            <div>
                <h1>Todo List</h1>
                <Form />
                <hr/>
                <div className="table-container">
                    <Paper className={classes.root}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Title</StyledTableCell>
                                    <StyledTableCell>Body</StyledTableCell>
                                    <StyledTableCell>Completed</StyledTableCell>
                                    <StyledTableCell>Created At</StyledTableCell>
                                    <StyledTableCell>Updated At</StyledTableCell>
                                    <StyledTableCell>Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todoItems}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>Todo App</h1>
            <Form />
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