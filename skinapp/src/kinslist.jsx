import React, { useState } from 'react';
import useStore from './storekins';

function KinList() {
  const kins = useStore(state => state.kins);
  const addKin = useStore(state => state.addKin);
  const removeKin = useStore(state => state.removeKin);
  const [nouvKin, setNouvKin] = useState({ name: '', description: '', tags: [], languages: [], activated: false }); // initialise l'état d'un nouveau kin

  const handleAddKin = () => { // fonction handleAddKin conçue pour gérer l'ajout d'un nouveau "kin" à une liste /appelée lorsque l'utilisateur clique sur un bouton pour soumettre le formulaire.
    addKin({ ...nouvKin, id: Date.now().toString() });// La fonction génère un nouvel id pour le nouveau kin en utilisant Date.now().toString(). afin de generer un Id unique au moment de sa création (nb de milliseconde écoulées depuis le 01/01/70 00h)
    // On passe nouKin dans la fonction addKin avec le nouvel ID 
    setNouvKin({ name: '', description: '', tags: [], languages: [], activated: false });//Après l'ajout du nouveau kin = état local nouvKin est réinitialisé à ses valeurs par défaut
  };
     
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target; //e.target = ref à l'élément DOM (formulaire) qui déclenche onChange
    if (name === "tags" || name === "languages") {
      // Convertir la chaîne de caractères en tableau 
      const arrayValue = value.split(',').map(item => item.trim());
      setNouvKin(prev => ({
        ...prev,
        [name]: arrayValue
      }));
    } else {
    setNouvKin(prev => ({ // SetNouKin met à jour l'état des nouvelles valeurs du formulaire / Prev met à jour en se basant sur l'état le plus récent évite erreur de synchr
      ...prev,//opérateur de décomposition pour copier toutes les propriétés existantes de l'état précédent 
      [name]: type === 'checkbox' ? checked : value //gère différence entre champs textuels et checkboxes -> Si le type de l'élément est 'checkbox'=  mise à jour avec la valeur checked sinon value
    }));
  };
}
  const arrayToHashtags = (array) => array.map(item => `#${item}`).join(' '); //amélioration de l'affichage des tags 
  const arrayToString = (array) => array.join(', ');//amélioation de l'affichage des language

  return (
    <div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
       {/* rend l'affichage des cartes responsive */}
        {kins.map(kin =>( // transformation de la liste de données kins en élément JSX
          <div key={kin.id} className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            {/* chaque kin est affiché dans une carte individuelle "div" + affichage de chaque info correspondantes
            genère une clé unique spécificité de React pour une gestion de la liste*/}
            <h3 className="text-2xl font-extrabold text-neutral-400">{kin.name}</h3>
            <p className="text-gray-600">{kin.description}</p>
            {kin.tags.length > 0 && <p className="text-gray-500 italic">Tags: {arrayToHashtags(kin.tags)}</p>}
            {kin.languages.length > 0 && <p className="text-gray-500 italic">Languages: {arrayToString(kin.languages)}</p>}
            <p className="text-sm text-gray-700 font-semibold italic">Activated: {String(kin.activated)}</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
              onClick={() => removeKin(kin.id)}>Supprimer</button>
            </div>
        ))}
        </div>
        <div className="mt-8 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-600 mb-4">Ajouter un nouveau Kin</h2>
        <form className="space-y-4"></form>
        <input type="text" name="name" value={nouvKin.name} onChange={handleChange} placeholder="Name" className="input input-bordered w-full text-black" />
        <input type="text" name="description" value={nouvKin.description} onChange={handleChange} placeholder="Description" className="input input-bordered w-full text-black" />
        <input type="text" name="tags" value={nouvKin.tags.join(',')} onChange={handleChange} placeholder="Tags" className="input input-bordered w-full text-black" />
        <input type="text" name="languages" value={nouvKin.languages.join(',')} onChange={handleChange} placeholder="Languages" className="input input-bordered w-full text-black" />
        <div className="flex items-center mt-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="activatedCheckbox"
              name="activated"
              checked={nouvKin.activated}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span>Cliquer pour activer</span>
          </label>
        </div>
        {/* formulaire pour rajouter un kin */}
        <button onClick={handleAddKin} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Ajouter Kin</button>
      </div>
    </div>
  );
}


export default KinList;