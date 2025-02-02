import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'; // Assurez-vous que le fichier CSS est bien présent dans votre projet
import App from './App.jsx'; // Importation du composant principal App

// Vérification de l'existence de l'élément 'root' avant d'appeler createRoot
const rootElement = document.getElementById('root');

if (rootElement) {
  // Créez l'instance de root et effectuez le rendu
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("L'élément avec l'id 'root' n'a pas été trouvé.");
}
