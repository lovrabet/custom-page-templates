import { createRoot } from 'react-dom/client';
import Preview from './preview';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Preview root element was not found.');
}

createRoot(rootElement).render(<Preview />);
