const generateUniqueID = (prefix = '') => {
  const uniqueID = Date.now().toString(36) + Math.random().toString(36);
  return `${prefix}${uniqueID}`;
}

export default generateUniqueID;