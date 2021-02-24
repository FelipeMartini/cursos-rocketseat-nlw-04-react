import { createContext, useState, ReactNode } from 'react'

interface ChallengedProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengedProvider({children}: ChallengedProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengeCompleted, setChallengeCompleted] = useState(0)


  function levelUp() {
    setLevel(level+1)
  }

  function startNewChallenge() {
    console.log('newChall')
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      currentExperience,
      challengeCompleted,
      startNewChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
    )
}

