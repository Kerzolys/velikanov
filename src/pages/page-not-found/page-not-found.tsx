import { ButtonUI } from 'components/ui/button-ui/button-ui'
import styles from './page-not-found.module.scss'

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1>
        404 <br /> Sorry <br />Page not found
      </h1 >
      <ButtonUI type='button' buttonText="Home" onClick={() => window.location.href = '/'}/>
    </div>
  )
}
