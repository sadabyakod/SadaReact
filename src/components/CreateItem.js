import React, { useState } from 'react';

const CreateItem = ({ addItem }) => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName) {
            addItem(itemName);
            setItemName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default CreateItem;