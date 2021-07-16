import React, { useState, useContext } from "react";
import {
    useHistory,
    Link
} from 'react-router-dom';
import Context from '../context';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useEffect } from "react";

const EDIT_LIST = gql`
    mutation UPDATE_TODOLIST($id: String!, $input: TodoListInput!){
        updateTodoList(id:$id, todoList:$input){
            id
            name
        }
    }
`;

const DELETE_LIST = gql`
    mutation UPDATE_TODOLIST($id: String!){
        deleteTodoList(id:$id)
    }
`;

interface ListData {
    name: string;
    id: number;
}

function ListItem({ listData, refetch }: { listData:ListData, refetch: Function }){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const client = useApolloClient();

    function editClick(){
        if(isEditing){
            client.mutate({
                mutation: EDIT_LIST,
                variables: {
                    id: listData.id,
                    input: {
                        name,
                    }
                }
            });
        }
        setIsEditing(v => !v);
    }

    function deleteClick(){
        client.mutate({
            mutation: DELETE_LIST,
            variables: {
                id: listData.id
            }
        })
        .then(() => {
            refetch();
        })
    }

    return (
        <div key={listData.id}>
            <div>
                {isEditing ?
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                    :
                    <Link to={`/todo/${listData.id}`}>
                        <h1>{listData.name}</h1>
                    </Link>
                }
            </div>
            <button onClick={deleteClick}>
                delete
            </button>
            <button onClick={editClick}>
                {isEditing ? 'save' : 'edit'}
            </button>
        </div>
    )
}


const GET_TODOLISTS = gql`
    query GET_TODOLISTS{
        currentUser{
            todoLists{
                id
                name
            }
        }
    }
`;

const NEW_TODOLIST = gql`
    mutation NEW_TODOLIST($input: TodoListInput!){
        createTodoList(todoList: $input){
            id
        }
    }
`;

function TodoList() {
    const  { loading, error, data, refetch } = useQuery(GET_TODOLISTS);
    const { logged } = useContext(Context);
    const history = useHistory();
    const client = useApolloClient();

    useEffect(() => {
        if(!logged)
            history.push('/login');
    }, [])

    function newTodoList(){
        client.mutate({
            mutation: NEW_TODOLIST,
            variables: {
                input: {
                    name: 'New TodoList'
                }
            }
        })
        .then(()=>{
            refetch();
        });
    }

    return (
        <>
            <button onClick={newTodoList}>new</button>

            {data?.currentUser.todoLists.map((listData: ListData) => (
                <ListItem listData={listData} refetch={refetch}></ListItem>
            ))}
        </>
    );
}



export default TodoList;
