import styles from './preloader.module.scss'

export const PreloaderUI: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__img}></div>
    </div>
  )
}