import React from "react"

export interface ValidationParams {
  name: string,
  fields: {} & HTMLInputElement
}

export const inputValidate = <T> ( currentTarget: EventTarget & HTMLInputElement, validationParams: ValidationParams ) => {
  const isValid = []

  if ( currentTarget.name === validationParams.name ) {
    for ( let [key, value] of Object.entries(validationParams.fields)) {
      if ( key in currentTarget ) {
        switch (key) {
          case 'maxLength': 
            isValid.push(currentTarget[key] < value);
            break;
          case 'minLength': 
            isValid.push(currentTarget[key] > value);
            break;
        }
      }
    }
    
  return isValid.every( el => el === true )
  }

  return true
}