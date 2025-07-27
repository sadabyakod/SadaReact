import React, { useState } from 'react';

const UpdateItem = ({ item, onUpdate }) => {
    const [updatedItem, setUpdatedItem] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem({ ...updatedItem, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedItem);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={updatedItem.name}
                onChange={handleChange}
                placeholder="Item Name"
                required
            />
            <input
                type="text"
                name="description"
                value={updatedItem.description}
                onChange={handleChange}
                placeholder="Item Description"
                required
            />
            <button type="submit">Update Item</button>
        </form>
    );
};

export default UpdateItem;