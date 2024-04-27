/**
 * @param {Array} kins 
 * @param {string} searchTerm
 * @return {Array}
 */ 

export function searchKins(kins, searchTerm) {
    if (!searchTerm) return kins; 
    return kins.filter(kin => {
      return kin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             kin.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  