export const saveUrls=(urls)=>
{

  sessionStorage.setItem("urls",JSON.stringify(urls));

};

export const getUrls=()=> 
{

  return JSON.parse(sessionStorage.getItem("urls")||"[]");

};
