// Advanced API Service with authentication and better error handling
class AdvancedApiService {
    constructor() {
        this.baseURL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';
        this.apiKey = process.env.REACT_APP_API_KEY;
    }

    // Get authentication headers
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        // Add API key if available
        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
            // or headers['X-API-Key'] = this.apiKey;
        }

        // Add auth token from localStorage if available
        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    // Enhanced fetch with retries and better error handling
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options,
            headers: {
                ...this.getAuthHeaders(),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            
            // Handle different status codes
            if (response.status === 401) {
                // Unauthorized - redirect to login or refresh token
                throw new Error('Authentication required. Please log in.');
            }
            
            if (response.status === 403) {
                throw new Error('Access forbidden. You do not have permission.');
            }
            
            if (response.status === 404) {
                throw new Error('Resource not found.');
            }
            
            if (response.status >= 500) {
                throw new Error('Server error. Please try again later.');
            }
            
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            // Handle empty responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
            
        } catch (error) {
            // Network errors, parsing errors, etc.
            if (error.name === 'TypeError') {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    // CRUD Operations for Items
    async createItem(itemData) {
        return this.makeRequest('/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: itemData.name,
                body: itemData.description || `Item: ${itemData.name}`,
                userId: itemData.userId || 1,
            }),
        });
    }

    async getAllItems(page = 1, limit = 10) {
        return this.makeRequest(`/posts?_page=${page}&_limit=${limit}`);
    }

    async getItemById(id) {
        return this.makeRequest(`/posts/${id}`);
    }

    async updateItem(id, itemData) {
        return this.makeRequest(`/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                title: itemData.name,
                body: itemData.description || `Updated item: ${itemData.name}`,
                userId: itemData.userId || 1,
            }),
        });
    }

    async deleteItem(id) {
        return this.makeRequest(`/posts/${id}`, {
            method: 'DELETE',
        });
    }

    // Search functionality
    async searchItems(query) {
        return this.makeRequest(`/posts?q=${encodeURIComponent(query)}`);
    }
}

// Export singleton instance
const advancedApiService = new AdvancedApiService();
export default advancedApiService;
