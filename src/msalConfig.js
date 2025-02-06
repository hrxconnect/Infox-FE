// msalConfig.js

import { PublicClientApplication } from '@azure/msal-browser';

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: '7f43ebaa-3536-4b36-b8f1-2f2aa1747eb4', // Replace with your Azure AD Application (Client) ID
    authority: 'https://login.microsoftonline.com/common', // Can also use your tenant ID here
    redirectUri: 'http://localhost:8000/auth/callback', // Redirect URI after login
  },
  cache: {
    cacheLocation: 'sessionStorage', // Can be 'localStorage' for persistent session
    storeAuthStateInCookie: true, // Set to true for better compatibility with IE11
  },
};

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

