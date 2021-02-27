import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContexts";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps) {
  const countdownTime = 0.1;
  const { startNewChallenge } = useContext(ChallengesContext)

  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false)
  const [time, setTime] = useState(countdownTime * 60);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time-1)
      },1000)  
    } else
    if (isActive) {
      //fim do ciclo
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge();
    }
  }, [isActive, time])  
  
  function startCountdown() {    
    setIsActive(true)    
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)//Cancelando a execução do timeout
    setHasFinished(false)
    setIsActive(false)
    setTime(countdownTime * 60)
  }
  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

