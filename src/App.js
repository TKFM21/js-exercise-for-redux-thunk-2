import React from 'react';
import {
    HashRouter as Router,
    Route
} from 'react-router-dom';
import './App.css';
import Todo from './components/Todo/Todo';
import TodoEdit from './components/TodoEdit/TodoEdit';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={Todo} />
                <Route path="/:id" exact component={TodoEdit} />
            </div>
        </Router>
    );
}

export default App;
