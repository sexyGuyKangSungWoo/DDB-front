import React, { useState, useContext, useRef } from "react";
import Context from "../context";
import { gql, useApolloClient, useQuery } from '@apollo/client';

function Todo(){
    const [input, setInput] = useState('');
    // const [todoList, setTodoList] = useState([
    //     {
    //         id: 0,
    //         todo: 'TODO',
    //         checked: false,
    //     }
    // ]);

    // const client = useApolloClient();

    // const GET_TODO_ITEMS = gql`
        
    // `;

    // const { data } = useQuery(GET_TODO_ITEMS);

    const { todoList, setTodoList } = useContext(Context);

    const count = useRef(1);

    const addTodo = () => {
        const newTodo = {
            id: count.current,
            todo: input.toString(),
            checked: false,
        };
        
        setTodoList([...todoList, newTodo]);

        setInput('');
        count.current++;
    };

    const deleteTodo = (id: number) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    };

    const check = (id: number) => {
        setTodoList(todoList.map(todo => (
            todo.id === id ? {...todo, checked: !todo.checked} : todo
        )));
    };

    return(
        <>
            <div>
                <form onSubmit={e => e.preventDefault()}>
                    <input value={input} onChange={e => setInput(e.target.value)}></input>
                    <button onClick={e => addTodo()}>click</button>
                </form>
            </div>
            <div>
                {todoList.map(todoList => (
                    <div>
                        <span>{todoList.todo}</span>
                        {todoList.checked ? '  checked!  ' : '  unchecked  '}
                        <button onClick={e => check(todoList.id)}>check!</button>
                        <button onClick={e => deleteTodo(todoList.id)}>delete</button>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default Todo;