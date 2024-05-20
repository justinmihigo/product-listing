import { PropsWithChildren, useContext, createContext, useState} from "react"
export type Count={
    prodId:number;
    countItems:number;
    setCountItems:(count:number) => void
    setProdId:(id:number) => void;
}
export const CounterContext=createContext<Partial<Count>>({});
export default function Counter({children}:{children:React.ReactNode}){
    const [countItems, setCountItems] = useState(0);
    const [prodId, setProdId] = useState(0)
  const value: Count = {
    prodId: 0,
    countItems,
    setCountItems,
    setProdId,
  };
    return(
        <CounterContext.Provider value={value}>
            {children}
         </CounterContext.Provider>
    )
    
}