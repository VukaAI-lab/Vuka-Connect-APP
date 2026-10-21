import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Login from './Login.jsx';
import Portal from './Portal.jsx';

export default function App() {
  return (
    <>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Portal />
      </AuthenticatedTemplate>
    </>
  );
}
