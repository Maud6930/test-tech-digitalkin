import React, { useEffect, useRef } from 'react';
import './App.css'
import Kinslist from './kinslist'

function App() {
  const title = useRef(null);

  useEffect(() => {
    if (title.current) {
      const text = 'Liste des kins';
      const letters = text.split('').map((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'letter';
        span.style.animationDelay = `${index * 0.1}s`;
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        }
        return span;
      });
      title.current.innerHTML = ''; 
      letters.forEach(letter => {
        title.current.appendChild(letter);
      });
    }
  }, []);


  return (
      <div>
        <h1 className="text-3xl font-bold underline" ref={title}></h1>
        <Kinslist /> 
      </div>
      /* kinslist = composant permettant l'affichage de la liste*/
  )
}

export default App
