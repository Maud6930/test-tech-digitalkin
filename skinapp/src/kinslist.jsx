import React from 'react';
import useStore from './storekins';

function KinList() {
  const kins = useStore((state) => state.kins);

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
      ))}
    </ul>
  );
}
export default KinList