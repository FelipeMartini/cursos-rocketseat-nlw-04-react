import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContexts';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive,
    resetCountdown,
    startCountdown
  } = useContext(CountdownContext)
  
  const minuteValues = String(minutes).padStart(2, '0').split('')
  const secondValues = String(seconds).padStart(2, '0').split('') 

  return(
    <>
    <div className={styles.countdownContainer} >
      <div>
        <span>{minuteValues[0]}</span>
        <span>{minuteValues[1]}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondValues[0]}</span>
        <span>{secondValues[1]}</span>
      </div>
    </div>

    { hasFinished ? (
      <button 
        disabled
        className={styles.countdownButton} 
      >
        Ciclo encerrado
        <img src="icons/check.svg" alt="check"/>
      </button>
    ) : (
      <>
        {
          isActive ? (
            <button 
              type='button'
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type='button'
              className={styles.countdownButton} 
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )
        }   
      </>
    )}     
    </>
  ) 
}