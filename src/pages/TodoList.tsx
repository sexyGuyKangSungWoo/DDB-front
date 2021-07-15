import React, { useState, useContext } from "react";
import {
    useHistory,
    Link
} from 'react-router-dom';
import Context from '../context';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useEffect } from "react";

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

interface ListData {
    name: string;
    id: number;
}

function ListItem({ listData }: { listData:ListData }){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');

    function editClick(){
        if(isEditing){
            // TODO: send change value
        }
        setIsEditing(v => !v);
    }

    function deleteClick(){
        //TODO: send delete 
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
                {isEditing ? 'submit' : 'edit'}
            </button>
        </div>
    )
}

function TodoList() {
    const { loading, error, data } = useQuery(GET_TODOLISTS);
    const { logged } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        if(!logged)
            history.push('/login');
    }, [])

    return (
        <>
            {data?.currentUser.todoLists.map((listData: ListData) => (
                <ListItem listData={listData}></ListItem>
            ))}
        </>
    );
}



export default TodoList;
