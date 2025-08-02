// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

// API Service class
class ApiService {
    // Helper method for making HTTP requests
    async makeRequest(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(`${API_BASE_URL}${url}`, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Create a new item (POST)
    async createItem(itemData) {
        return this.makeRequest('/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: itemData.name,
                body: `Item: ${itemData.name}`,
                userId: 1,
            }),
        });
    }

    // Get all items (GET)
    async getAllItems() {
        return this.makeRequest('/posts');
    }

    // Get single item by ID (GET)
    async getItemById(id) {
        return this.makeRequest(`/posts/${id}`);
    }

    // Update an item (PUT)
    async updateItem(id, itemData) {
        return this.makeRequest(`/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                title: itemData.name,
                body: `Updated item: ${itemData.name}`,
                userId: 1,
            }),
        });
    }

    // Delete an item (DELETE)
    async deleteItem(id) {
        return this.makeRequest(`/posts/${id}`, {
            method: 'DELETE',
        });
    }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Named exports for individual methods (optional)
export const {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
} = apiService;
