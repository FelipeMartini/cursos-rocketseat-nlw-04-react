import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer} >
      <img src="https://github.com/iagoocesaar.png" alt="IagooCesaar"/>
      <div>
        <strong>Iago César F. Nogueira</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level 1
        </p>
      </div>
    </div>
  )
}