export const isValidURL=(url)=>{
    try{
        new URL(url);
        return true;
        
    }catch{
        return false;
    }
};

export const isPositiveInteger=(value)=>{
    return /^\d+$/.test(value) && Number(value)>0;
};

export const isValidSlug=(slug)=>/^[a-zA-Z0-9-_]{3,20}$/.text(slug);