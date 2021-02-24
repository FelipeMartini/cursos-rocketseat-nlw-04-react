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
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

import challenges from '../../challenges.json'

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengedProvider({children}: ChallengedProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengeCompleted, setChallengeCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level+1)
  }

  function startNewChallenge() {
    const randomChallengedIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengedIndex];
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      experienceToNextLevel,
      activeChallenge,
      challengeCompleted,
      levelUp,
      startNewChallenge,
      resetChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
    )
}

