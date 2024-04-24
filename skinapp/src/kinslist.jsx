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
    const { name, type, checked, value } = e.target; //e.target = ref à l'élément DOM qui déclenche le formulaire
    setNouvKin(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kins.map(kin => (
          <div key={kin.id} className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-extrabold text-neutral-400">{kin.name}</h3>
            <p className="text-gray-600">{kin.description}</p>
            <p className="text-gray-500 italic">Tags: {JSON.stringify(kin.tags)}</p>
            <p className="text-gray-500 italic">Languages: {JSON.stringify(kin.languages)}</p>
            <p className="text-sm text-gray-700 font-semibold italic">Activated: {String(kin.activated)}</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-300"
              onClick={() => removeKin(kin.id)}>Supprimer</button>
            </div>
        ))}
        </div>
        <div className="mt-8">
        <input type="text" name="name" value={nouvKin.name} onChange={handleChange} placeholder="Name" className="input input-bordered" />
        <input type="text" name="description" value={nouvKin.description} onChange={handleChange} placeholder="Description" className="input input-bordered" />
        <input type="text" name="tags" value={nouvKin.tags} onChange={handleChange} placeholder="Tags" className="input input-bordered" />
        <input type="text" name="languages" value={nouvKin.languages} onChange={handleChange} placeholder="Languages" className="input input-bordered" />
        <div className="flex items-center mt-4">
          <input type="checkbox" id="activatedCheckbox" name="activated" checked={nouvKin.activated} onChange={handleChange} className="checkbox checkbox-primary" />
          <label htmlFor="activatedCheckbox" className="ml-2">Cliquez sur la checkbox pour activer</label>
        </div>
        <button onClick={handleAddKin} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Ajouter Kin</button>
      </div>
    </div>
  );
}

export default KinList;
