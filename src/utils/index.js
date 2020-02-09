const localStoragen = window.localStorage

export function getItem (key) {
  const value = localStoragen.getItem(key);
  try{
    return JSON.parse(value) ;
  }catch(e){
    return value
  }
  
}

export function setItem (key,value) {
  value = JSON.stringify(value);
  localStoragen.setItem(key,value);
}

export function removeItem (key) {
  localStoragen.removeItem(key);
}