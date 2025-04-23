import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// -- optional: bring in a locale (ru, enUS, …)
// import { ru } from 'date-fns/locale';
import App from './App';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CssBaseline />
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      /* adapterLocale={ru}  // uncomment if you want Russian labels */
                    >
                      <CssBaseline />
                      <App />
                    </LocalizationProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
