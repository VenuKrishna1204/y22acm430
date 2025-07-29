const usedCodes=new Set();
export const generateUniqueShortcode=()=>
 {
  let code;
  do {
    code=Math.random().toString(36).substring(2, 8);
  } while (usedCodes.has(code));
  usedCodes.add(code);
  return code;
};

export const isShortcodeUnique =(code)=>!usedCodes.has(code);

export const reserveShortcode =(code)=>usedCodes.add(code);
