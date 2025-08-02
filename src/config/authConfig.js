export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "995d599d-cf8f-40b0-ac67-daa9b0b825ad",
        authority: process.env.REACT_APP_AZURE_AUTHORITY || "https://login.microsoftonline.com/your-tenant-id",
        redirectUri: process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};