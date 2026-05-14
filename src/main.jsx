import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import TypingContext from "./components/TypingContext";

createRoot(document.getElementById('root')).render(
    <TypingContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </TypingContext>
)
