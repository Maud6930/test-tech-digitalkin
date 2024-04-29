import {create} from 'zustand';
import kinsData from './kins.json';

const useStore = create((set) => ({ //create = nouveau store zustand
    kins: kinsData, //rendre dynamique le statique 
    addKin: (kin) => set((state) => ({ kins: [...state.kins, kin] })),//addkin ajout d'un nouvel objet et kin au tableau /set= mise à jour de l'état du store 
    removeKin: (kinId) => set((state) => ({ kins: state.kins.filter((kin) => kin.id !== kinId) })),// removeKin = retirer 1 objet kin du tableau/l'objet à retirer prend l'ID -> kin ID/ set met à jour pr conserver ceux qui n'ont pas l'ID
  }));
  export default useStore
// plus adapté de nommer store que composant 