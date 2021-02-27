import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

interface ChallengedProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
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
  completeChallenge: () => void;
}

import challenges from '../../challenges.json'

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengedProvider({
  children,
  ...rest
}: ChallengedProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengeCompleted', String(challengeCompleted))

  }, [level, currentExperience, challengeCompleted])

  function levelUp() {
    setLevel(level+1)
  }

  function startNewChallenge() {
    const randomChallengedIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengedIndex];
    setActiveChallenge(challenge)
        
    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if (finalExperience>= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengeCompleted(challengeCompleted+1)
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
      resetChallenge,
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
    )
}

