import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import ContextProvider from './Context/ContextProvider';
import ContextProvider1 from './Context/ContextProvider1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <ContextProvider1>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ContextProvider1>
    </ContextProvider>
);

reportWebVitals();
