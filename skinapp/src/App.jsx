import React, { useEffect, useRef,useState } from 'react';
import './App.css'
import useStore from './storekins';
import { searchKins } from './search';
import Kinslist from './kinslist'

function App() {
  const title = useRef(null); //permet d'accéder à l'élément <h1> dans le DOM
  const kins = useStore(state => state.kins);
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
  const filteredKins = searchKins(kins, searchTerm);//utilisé pour afficher les resultats de la recherche

  return (
    <div>
    <h1 className="text-3xl font-bold" ref={title}></h1>
    <input
      type="text"
      placeholder="Rechercher un kin..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // se met à jour 
      className="search-input text-black"
      />
      <div>
      <button onClick={() => searchKins(kins, searchTerm)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Recherche</button>
</div>
    <Kinslist kins={filteredKins} /> 
  </div>
  // l'événement ne fonctionne pas 
  /* kinslist = composant permettant l'affichage de la liste*/
  )
}

export default App
