import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoutes from './routes/MainRoutes'
import { Provider } from 'react-redux'
import { Store } from './config/Store'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <MainRoutes/>
      <ToastContainer/>
    </Provider>
)
