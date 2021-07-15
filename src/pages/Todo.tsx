import React, { useState, useContext, useRef, useEffect } from "react";
import Context from "../context";
import { gql, useApolloClient, useQuery } from '@apollo/client';
import {
    useParams
} from 'react-router-dom';
function Todo(){
    const [input, setInput] = useState('');

    const client = useApolloClient();

    const id = useParams<{ id: string }>();

    const GET_TODO_ITEMS = gql`
        query GET_TODO_ITEMS($id:String!){
            User(id: $id){
                todoLists{
                    todoItems{
                        body,
                        id,
                        done
                    }
                }
            }
        }
    `;

    interface todoItemsType {
        id: number;
        body: string;
        done: boolean;
    }

    const { data } = useQuery<todoItemsType>(
        GET_TODO_ITEMS,
        {
            variables:{
                id
            }
        }
    );


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

    interface items {
        body: string;
        id: number;
    }

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
            <div>
                {/* {data?.currentUser.todoLists.todoItems.map((listData: items) => (
                    <div>{listData.body}</div>
                ))} */}
            </div>
        </>
    );
}

export default Todo;