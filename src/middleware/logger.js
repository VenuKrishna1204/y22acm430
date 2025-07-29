const logs=[]
export const logger=(action,payload)=>{
    const entry={
        timestamp:new Date().toISOString(),action,payload,};
        logs.push(entry);

    
};

export const getLogs=()=>logs;