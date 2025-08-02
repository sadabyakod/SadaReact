import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../config/authConfig';
import apiService from '../services/api';

const CreateItem = ({ addItem }) => {
    const [itemName, setItemName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { instance, accounts } = useMsal();

    const getAccessToken = async () => {cd MyCSharpProject
        if (accounts.length > 0) {
            try {
                const response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                });
                return response.accessToken;
            } catch (error) {
                console.error('Error acquiring token:', error);
                return null;
            }
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!itemName.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            // Get access token for authenticated API calls
            const accessToken = await getAccessToken();
            
            // Make real API call with authentication
            const result = await apiService.createItem(
                { name: itemName }, 
                accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
            );
            
            // Transform API response to match your app's data structure
            const newItem = {
                id: result.id,
                name: itemName,
                title: result.title,
                createdAt: new Date().toISOString(),
                apiData: result
            };

            addItem(newItem);
            setItemName('');
            console.log('Item created successfully:', result);
            
        } catch (err) {
            const errorMessage = err.message || 'Failed to create item. Please try again.';
            setError(errorMessage);
            console.error('API Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Check if user is authenticated
    const isAuthenticated = accounts.length > 0;

    if (!isAuthenticated) {
        return (
            <div>
                <p>Please sign in to create items.</p>
                <button onClick={() => instance.loginPopup(loginRequest)}>
                    Sign In with Azure AD
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
            )}
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                required
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !itemName.trim()}>
                {isLoading ? 'Adding...' : 'Add Item'}
            </button>
        </form>
    );
};

export default CreateItem;