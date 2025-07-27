import React, { useState } from 'react';
import CreateItem from './components/CreateItem';
import ItemList from './components/ItemList';
import UpdateItem from './components/UpdateItem';

function App() {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    const updateItem = (updatedItem) => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setCurrentItem(null);
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="App">
            <h1>CRUD Application</h1>
            <CreateItem addItem={addItem} />
            {currentItem && <UpdateItem item={currentItem} onUpdate={updateItem} />}
            <ItemList items={items} onEdit={setCurrentItem} onDelete={deleteItem} />
        </div>
    );
}

export default App;