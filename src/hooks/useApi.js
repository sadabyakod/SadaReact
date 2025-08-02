import { useState, useCallback } from 'react';
import apiService from '../services/api';

// Custom hook for API operations
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback(async (apiFunction, ...args) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiFunction(...args);
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            setError(err.message || 'An error occurred');
            throw err;
        }
    }, []);

    const createItem = useCallback((itemData) => {
        return callApi(apiService.createItem.bind(apiService), itemData);
    }, [callApi]);

    const getAllItems = useCallback(() => {
        return callApi(apiService.getAllItems.bind(apiService));
    }, [callApi]);

    const updateItem = useCallback((id, itemData) => {
        return callApi(apiService.updateItem.bind(apiService), id, itemData);
    }, [callApi]);

    const deleteItem = useCallback((id) => {
        return callApi(apiService.deleteItem.bind(apiService), id);
    }, [callApi]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        createItem,
        getAllItems,
        updateItem,
        deleteItem,
        clearError,
    };
};

// Custom hook specifically for creating items
export const useCreateItem = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const createItem = useCallback(async (itemData) => {
        setIsCreating(true);
        setCreateError(null);
        
        try {
            const result = await apiService.createItem(itemData);
            setIsCreating(false);
            return result;
        } catch (err) {
            setIsCreating(false);
            setCreateError(err.message || 'Failed to create item');
            throw err;
        }
    }, []);

    const clearCreateError = useCallback(() => {
        setCreateError(null);
    }, []);

    return {
        createItem,
        isCreating,
        createError,
        clearCreateError,
    };
};
