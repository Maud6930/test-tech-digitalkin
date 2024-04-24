@param {Array} kins 
@param {string} searchTerm 
@return {Array} 

export function searchKins(kins, searchTerm) {
    return kins.filter(kin => {
      return kin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             kin.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }