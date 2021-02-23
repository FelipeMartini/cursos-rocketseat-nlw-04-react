import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

const ExperienceBar: React.FC = () => {
  const maxXP = 600;
  const minXP = 0;
  const currentXP = 350;

  const [percentXP, setPercentXP] = useState('')

  useEffect(() => {
    let percent = 0;

    percent = Math.round(100 * currentXP / maxXP);
    setPercentXP(`${percent}%`)
  }, [])

  return (
    <header className="experience-bar" >
      <span>{minXP} xp</span>
      <div>
        <div style={{width: `${percentXP}`}} />
        <span className="current-experience" style={{left: `${percentXP}`}}>
          {currentXP} xp
        </span>
      </div>
      <span>{maxXP} xp</span>
    </header>
  );
}

export default ExperienceBar;