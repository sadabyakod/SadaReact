import React from 'react';

const DeleteItem = ({ itemId, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            onDelete(itemId);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete Item
        </button>
    );
};

export default DeleteItem;