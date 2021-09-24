import React, {useState} from 'react';
import ItemContainer from './ItemContainer';
import './styles.css';

const ListContainer = (props) =>{
    const [lists, setLists] = useState([]);
    const [nameHolder, setInputHolder]= useState('');
    const [clickMode, setClickMode] = useState(false);

    const fetchLists = async() => {
        let response = await fetch("http://localhost:8080/listapp/get/lists");
        let json= await response.json();
        setLists(json);
    }


    const addList = async(name) => {
        await fetch("http://localhost:8080/listapp/create/list", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name: name
            })
        });
        fetchLists();
    }


    const deleteList = async(id) => {
        await fetch(`http://localhost:8080/listapp/remove/list/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchLists();
    }

    
    useState(() => {
        fetchLists();
    });

    return (
        <>
            <div className='parent'>
                <div className='add-list'>
                    <input className='input-style' type='text' placeholder='Enter list name' value={nameHolder} onChange={(e) => setInputHolder(e.target.value)}></input>
                    <button className='add-list-button' onClick={() => addList(nameHolder)}>Add List</button>
                    <button className='remove-list-button' onClick={()=>setClickMode(!clickMode)}>{clickMode ? "Mark" : "Delete"}</button>
                </div>
            </div>
            <div className='parent'>
                {lists.map(list => (
                    <div className="card" key={list.id} onClick={clickMode ? 
                     () => deleteList(list.id) : () => {}}>
                        <div className="card-body">
                            <h3 className="card-title">{list.name}</h3>
                            <ItemContainer parent={list.id}></ItemContainer>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ListContainer;