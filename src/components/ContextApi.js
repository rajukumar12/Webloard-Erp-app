import React, { Children, createContext, useState } from 'react';
export const AppContext = createContext();

const ContextApi = (props) => {

    const [ showTitle, setShowTitle ] = useState(false)
  return (
    <AppContext.Provider value={{ showTitle, setShowTitle }}>
				{props.children}
			</AppContext.Provider>
  )
}

export default ContextApi
