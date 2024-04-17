import { ReactNode, createContext, useState } from "react";

  interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
  }
  
  interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    interruptedCurrentCycle: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
  }

  interface CreateCycleData {
    task: string
    minutesAmount: number
  }

  interface CyclesContextProviderProps {
    children: ReactNode
  }
  
  export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children } : CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    //funcao criada para manipular os estados atraves de outros componentes atraves de contexts 
    function markCurrentCycleAsFinished() {
      setCycles((state) =>
        state.map((cycle) => {
          if(cycle.id === activeCycleId){
            return { ...cycle, finishedDate: new Date() }
          }
          else {
            return cycle
          }
        }),
      )
    }
  
    function setSecondsPassed(seconds:  number) {
      setAmountSecondsPassed(seconds)
    }
  
    function createNewCycle(data: CreateCycleData) {
      const id = String(new Date().getTime())
  
      const newCycle:Cycle = {
        id: id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      }
  
      setCycles((state) => [...state, newCycle])
      setActiveCycleId(id)
      
      setAmountSecondsPassed(0)
    }
  
    function interruptedCurrentCycle() {
  
      setCycles((state) => 
        state.map((cycle) => {
          if(cycle.id === activeCycleId){
            return { ...cycle, interruptedDate: new Date() }
          }
          else {
            return cycle
          }
        }),
      )
      setActiveCycleId(null)
    }

    return(
      <CyclesContext.Provider
        value={{
          cycles,
          activeCycle,
          activeCycleId,
          markCurrentCycleAsFinished,
          amountSecondsPassed,
          setSecondsPassed,
          createNewCycle,
          interruptedCurrentCycle
        }}
        >
        {children}
      </CyclesContext.Provider>
    )
  
}