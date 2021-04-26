import { createContext } from "react";

const StoreContext = createContext({  
    token: null,
    setToken: () => {},
    funcao: null,
    setFuncao: () => {},
    Id: null,
    setId: () => {},
});

export default StoreContext;
