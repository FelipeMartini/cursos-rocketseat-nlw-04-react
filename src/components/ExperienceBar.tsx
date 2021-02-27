import React, { useEffect, useState, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContexts';

import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

  const minXP = 0;

  const [percentXP, setPercentXP] = useState('')

  useEffect(() => {
    let percent = 0;

    percent = Math.round(100 * currentExperience / experienceToNextLevel);
    setPercentXP(`${percent}%`)
  }, [currentExperience, experienceToNextLevel])

  return (
    <header className={styles.experienceBar} >
      <span>{minXP} xp</span>
      <div>
        <div style={{width: `${percentXP}`}} />
        <span className={styles.currentExperience} style={{left: `${percentXP}`}}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}

export default ExperienceBar;