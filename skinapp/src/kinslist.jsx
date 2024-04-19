import React from 'react';
import useStore from './storekins';

function KinList() {
  const kins = useStore((state) => state.kins);//extraire la liste kins de useStore / state.kins propriété de l'objet state qui contient la liste liste de données kins

  return (
    <ul>
      {kins.map((kin) => (
        <li key={kin.id}> 
          {kin.name}
          {kin.description}
          {kin.tags}
          {kin.languages}
          {kin.activated}
        </li>
         /* map() = reprend un tableau existant et en reproduit un nouveau sans modifier l'original
         1.appelle id de chaque kins
         2. appelle de chaque proporiétés des kins  */
      ))}
    </ul>
  );
}
export default KinList