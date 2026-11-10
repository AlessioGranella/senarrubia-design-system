import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/colors_and_type.css';
import '../styles/components.css';
import './docs.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
