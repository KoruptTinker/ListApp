import React, {useState} from 'react';
import './styles.css';

const ItemContainer = (props) => {
    const [items,setItems] = useState([]);
    const [inputHolder, setInputHolder] = useState('');
    const [clickMode, setClickMode] = useState(false);
    const [progress,setProgress] = useState(0);

    const fetchItems = async () => {
        fetch(`http://localhost:8080/items/get/items/${props.parent}`)
        .then(res => res.json())
        .then(data => {
            setItems(data);
            setProgress(calculatePercentage(data));
        });
    }


    const calculatePercentage = (itemList) => {
        if(itemList.length===0){
            return (100).toFixed(1);
        }
        let total = 0;
        itemList.forEach(item => {
            if(item.status){
                total+=1;
            }
        });
        return ((total/itemList.length)*100).toFixed(1);
    }


    const addItem = async () => {
        //Send a POST request to the server
        await fetch(`http://localhost:8080/items/create/task`, {
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
        fetchItems();
        setInputHolder('');
    }


    const deleteItem = async (id) => {
        //Send a DELETE request to the server
        await fetch(`http://localhost:8080/items/remove/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchItems();
    }

    const markComplete = async (id) => {
        await fetch(`http://localhost:8080/items/mark`,{
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
        await fetch(`http://localhost:8080/items/unmark`,{
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
        setTimeout( () => setProgress(calculatePercentage(items), 1000));
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
        setTimeout( () => setProgress(calculatePercentage(items), 1000));
    }


    useState( () => {
        fetchItems();
    });


    const modeChangeHandler = () => {
        setClickMode(!clickMode);
    }


    return(
        <>
            {/* {React progress bar} */}
            <div className='progress-bar'>
                <div className='progress-bar-inner' style={{width: `${progress}%`}}>{progress}%</div>
            </div>
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