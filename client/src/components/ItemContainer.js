import React, {useState} from 'react';
import './styles.css';

const ItemContainer = (props) => {
    const [items,setItems] = useState([]);
    const [inputHolder, setInputHolder] = useState('');
    const [clickMode, setClickMode] = useState(false);

    const fetchItems = async () => {
        let response= await fetch(`http://localhost:8080/listapp/get/items/${props.parent}`);
        let json= await response.json();
        setItems(json);
    }


    const addItem = async () => {
        //Send a POST request to the server
        let response = await fetch(`http://localhost:8080/listapp/create/task/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: inputHolder,
                list: props.parent
            })
        });
        let json = await response.json();
        fetchItems();
        setInputHolder('');
    }


    const deleteItem = async (id) => {
        //Send a DELETE request to the server
        await fetch(`http://localhost:8080/listapp/remove/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchItems();
    }

    const markComplete = async (id) => {
        await fetch(`http://localhost:8080/listapp/mark/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
    }


    const markIncomplete = async (id) => {
        await fetch(`http://localhost:8080/listapp/unmark/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
    }


    const clickUnmarkHandler= (id) => {
        let newItems= items.map(item => {
            if(item.id===id){
                item.status=false;
            }
            return item;
        });
        setItems(newItems);
        markIncomplete(id);
    }
    

    const clickMarkHandler= async (id) => {
        let newItems = items.map(item => {
            if(item.id===id){
                item.status=true;
            }
            return item;
        });
        setItems(newItems);
        markComplete(id);
    }


    useState( () => {
        fetchItems();
    });


    const modeChangeHandler = () => {
        setClickMode(!clickMode);
    }


    return(
        <>
            {items.map(list => (
                list.status ? 
                    <div className="item-card-mark" key={list.id} onClick= { clickMode ? 
                            ()=> deleteItem(list.id) : () => clickUnmarkHandler(list.id)}>
                        <h4 className='item-title'>{list.description}</h4>
                    </div>
                    :
                    <div className="item-card-unmark" key={list.id} onClick= { clickMode ? 
                            ()=> deleteItem(list.id) : () => clickMarkHandler(list.id)}>
                        <h4 className='item-title'>{list.description}</h4>
                    </div>
            ))}
            <div className="add-task">
                <input className="input-style" type="text" placeholder="Add task.." value={inputHolder} onChange={(e) => setInputHolder(e.target.value)}/>
            </div>
            <div className="add-task">
                <button className="add-button" onClick={() => addItem()}>Add</button>
                <button className="delete-button" onClick={() => modeChangeHandler()}>
                    {clickMode ? 'Mark' : 'Delete'}
                </button>
            </div>
        </>
    );
}

export default ItemContainer;