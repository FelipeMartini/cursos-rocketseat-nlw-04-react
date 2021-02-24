import { createContext, useState, ReactNode } from 'react'

interface ChallengedProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
}

import challenges from '../../challenges.json'

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengedProvider({children}: ChallengedProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengeCompleted, setChallengeCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  function levelUp() {
    setLevel(level+1)
  }

  function startNewChallenge() {
    const randomChallengedIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengedIndex];
    setActiveChallenge(challenge)
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      currentExperience,
      challengeCompleted,
      startNewChallenge,
      activeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
    )
}

