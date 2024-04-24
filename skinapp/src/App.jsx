import React, { useEffect, useRef,useState } from 'react';
import './App.css'
import Kinslist from './kinslist'

function App() {
  const title = useRef(null); //permet d'accéder à l'élément <h1> dans le DOM
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => { //animation pour le titre appelé avec une fonction callback et tableau vide pour s'executer 1 fois au chargement de la page
    if (title.current) { // verifie l'élément h1 et la nomnation title 
      const text = 'Liste des kins'; //chaîne à animer 
      const letters = text.split('').map((char, index) => { //transformation des strings en tableau de lettres puis chaque lettres en span
        const span = document.createElement('span');//chanque span est créé avec document.createElement('span')
        span.textContent = char; //defini le contenu du span "characters"
        span.className = 'letter';//class pour le css
        span.style.animationDelay = `${index * 0.1}s`;//defini un delai d'animation 
        if (char === ' ') { // prend en compte les espaces 
          span.innerHTML = '&nbsp;';
        }
        return span;
      });
      title.current.innerHTML = ''; // vide le contenu avant d'ajouter les span
      letters.forEach(letter => {
        title.current.appendChild(letter); // chaque span est ajouté au h1
      });
    }
  }, []);


  return (
      <div>
        <h1 className="text-3xl font-bold underline" ref={title}></h1> 
        {/* h1 est vide avec ref {title} afin de rajouter les span au dessus */}
        <input
        type="text"
        placeholder="Rechercher un kin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  
        className="search-input" 
      />
        <Kinslist /> 
      </div>
      /* kinslist = composant permettant l'affichage de la liste*/
  )
}

export default App
