import React, { useState } from 'react';
import { useCreateItem } from '../hooks/useApi';

const CreateItemWithHook = ({ addItem }) => {
    const [itemName, setItemName] = useState('');
    const { createItem, isCreating, createError, clearCreateError } = useCreateItem();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!itemName.trim()) return;

        try {
            // Clear any previous errors
            clearCreateError();
            
            // Make API call using the custom hook
            const result = await createItem({ name: itemName });
            
            // Transform API response to match your app's data structure
            const newItem = {
                id: result.id,
                name: itemName,
                title: result.title,
                createdAt: new Date().toISOString(),
                apiData: result
            };

            // Call the parent's addItem function
            addItem(newItem);
            setItemName('');
            console.log('Item created successfully:', result);
            
        } catch (err) {
            // Error is already handled by the hook
            console.error('Failed to create item:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {createError && (
                <div style={{ 
                    color: 'red', 
                    marginBottom: '10px',
                    padding: '8px',
                    border: '1px solid red',
                    borderRadius: '4px',
                    backgroundColor: '#ffe6e6'
                }}>
                    {createError}
                </div>
            )}
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                required
                disabled={isCreating}
                style={{
                    padding: '8px',
                    marginRight: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />
            <button 
                type="submit" 
                disabled={isCreating || !itemName.trim()}
                style={{
                    padding: '8px 16px',
                    backgroundColor: isCreating ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isCreating ? 'not-allowed' : 'pointer'
                }}
            >
                {isCreating ? 'Adding...' : 'Add Item'}
            </button>
        </form>
    );
};

export default CreateItemWithHook;
