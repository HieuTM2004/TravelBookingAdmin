import { getAccomTypeById, getAccomTypes } from "../api/accomtypeAPI";  
import type { AccomTypeDto } from "../types/accomtype.types";

const typeCache = new Map<string, string>(); 

export const getTypeNameById = async (accomTypeId: string): Promise<string> => {
  if (!accomTypeId) return 'N/A';  

  if (typeCache.has(accomTypeId)) {
    return typeCache.get(accomTypeId)!;
  }

  try {
    const typeData: AccomTypeDto = await getAccomTypeById(accomTypeId);
    const name = typeData.type || 'Unknown';  
    typeCache.set(accomTypeId, name);  
    return name;
  } catch (error) {
    console.error(`Error fetching type name for ID ${accomTypeId}:`, error);
    return 'N/A';  
  }
};

export const preloadAllTypeNames = async (): Promise<void> => {
  try {
    const allTypes = await getAccomTypes();
    allTypes.forEach(type => {
      typeCache.set(type.id, type.type || 'Unknown');
    });
    console.log(`Pre-loaded ${allTypes.length} type names to cache`);
  } catch (error) {
    console.error('Error pre-loading type names:', error);
  }
};