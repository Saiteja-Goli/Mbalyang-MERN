import React, { useState } from "react";
import { createContext } from "react";

export const Authcontext = createContext();

export function AuthcontextProvider({ children }) {
    const [auth,setAuth]=useState({})
    const [log,setLog]=useState(false)
    let providerState = {auth,setAuth,log,setLog};
  return <Authcontext.Provider value={providerState}>
    {children}
    </Authcontext.Provider>;
}


