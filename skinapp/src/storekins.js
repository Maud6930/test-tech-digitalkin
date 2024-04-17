import {create} from 'zustand';
import kinsData from '/skinapp/src/kins.json';

const useStore = create((set) => ({
    kins: kinsData, 
    addKin: (kin) => set((state) => ({ kins: [...state.kins, kin] })),
    removeKin: (kinId) => set((state) => ({ kins: state.kins.filter((kin) => kin.id !== kinId) })),
  }));
  