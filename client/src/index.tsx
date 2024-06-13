import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style/index.css"
import { UserInfoContext, UserInfoProvider } from './context/AuthContext';


const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <UserInfoProvider>
    <App />
  </UserInfoProvider>
  // </React.StrictMode>
);

