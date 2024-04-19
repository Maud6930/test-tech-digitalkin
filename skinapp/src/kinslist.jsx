import React, { useState } from 'react';
import useStore from './storekins';

function KinList() {
  const kins = useStore(state => state.kins);
  const addKin = useStore(state => state.addKin);
  const removeKin = useStore(state => state.removeKin);
  const [nouvKin, setNouvKin] = useState({ id: '', name: '', description: '', tags: [], languages: [], activated: false }); // initialise l'état d'un nouveau kin

  const handleAddKin = () => { // fonction handleAddKin conçue pour gérer l'ajout d'un nouveau "kin" à une liste /appelée lorsque l'utilisateur clique sur un bouton pour soumettre le formulaire.
    addKin({ ...nouvKin, id: Date.now().toString() });// La fonction génère un nouvel id pour le nouveau kin en utilisant Date.now().toString(). afin de generer un Id unique au moment de sa création (nb de milliseconde écoulées depuis le 01/01/70 00h)
    // On passe nouKin dans la fonction addKin avec le nouvel ID 
    setNouvKin({ id: '', name: '', description: '', tags: [], languages: [], activated: false });//Après l'ajout du nouveau kin = état local nouvKin est réinitialisé à ses valeurs par défaut
  };
     
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target; //e.target = ref à l'élément DOM qui déclenche le formulaire
    setNouvKin(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <ul>
        {kins.map(kin => (
          <li key={kin.id}>
            {kin.name} - {kin.description} - {JSON.stringify(kin.tags)} - {JSON.stringify(kin.languages)} - {String(kin.activated)}
            <button onClick={() => removeKin(kin.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" name="id" value={nouvKin.id} onChange={handleChange} placeholder="ID" />
        <input type="text" name="name" value={nouvKin.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="description" value={nouvKin.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="tags" value={nouvKin.tags} onChange={handleChange} placeholder="Tags" />
        <input type="text" name="languages" value={nouvKin.languages} onChange={handleChange} placeholder="Languages" />
        <input type="checkbox"  id="activatedCheckbox" name="activated"checked={nouvKin.activated} onChange={handleChange} placeholder="Activated"
        />
         <label htmlFor="activatedCheckbox">Cliquez sur la checkbox pour activer</label>
        <button onClick={handleAddKin}>Ajouter Kin</button>
      </div>
    </div>
  );
}

export default KinList;
