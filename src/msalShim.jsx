// DEMO ONLY: stands in for @azure/msal-react so the portal runs with no Microsoft login and no backend.
const KEY = 'vc-demo-signed-in';
const account = { name: 'Demo User', username: 'demo.user@example.com', homeAccountId: 'demo' };
const signedIn = () => sessionStorage.getItem(KEY) === '1';

const instance = {
  loginRedirect: async () => { sessionStorage.setItem(KEY, '1'); window.location.reload(); },
  logoutRedirect: async () => { sessionStorage.removeItem(KEY); window.location.reload(); },
  getActiveAccount: () => account,
  getAccountByHomeId: () => account,
};

export const useMsal = () => ({ instance, accounts: signedIn() ? [account] : [] });
export const AuthenticatedTemplate = ({ children }) => (signedIn() ? children : null);
export const UnauthenticatedTemplate = ({ children }) => (signedIn() ? null : children);
export const MsalProvider = ({ children }) => children;
