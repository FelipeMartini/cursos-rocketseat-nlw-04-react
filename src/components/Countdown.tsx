import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false)
  const [time, setTime] = useState(25 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
  
  const minuteValues = String(minutes).padStart(2, '0').split('')
  const secondValues = String(seconds).padStart(2, '0').split('')

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
    }
  }, [isActive, time])  
  
  function startCountdown() {    
    setIsActive(true)    
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)//Cancelando a execução do timeout
    setIsActive(false)
    setTime(25 * 60)
  }

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

    { hasFinished && (
      <button 
        disabled
        className={styles.countdownButton} 
      >
        Ciclo encerrado
      </button>
    )}

    {
      isActive && (!hasFinished)
      ? (
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
  ) 
}