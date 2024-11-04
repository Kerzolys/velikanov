import { SocialLinkUI } from '../ui/social-link-ui/social-link-ui'
import styles from './social-icons-block.module.scss'
import facebookIcon from '../../utils/icons/facebook.svg'
import youtubeIcon from '../../utils/icons/youtube.svg'
import telegramIcon from '../../utils/icons/telegram.svg'
import instagramIcon from '../../utils/icons/instagram.svg'
import { SocialIconsBlockProps } from './type'


export const SocialIconsBlock: React.FC<SocialIconsBlockProps> = ({isHomePage}) => {
  return (
    <div className={styles.socialIconsBlock}>
      <SocialLinkUI isHomePage={isHomePage} icon={facebookIcon} path='https://www.facebook.com' label='facebook' />
      <SocialLinkUI isHomePage={isHomePage} icon={youtubeIcon} path='https://www.youtube.com' label='instagram' />
      <SocialLinkUI isHomePage={isHomePage} icon={telegramIcon} path='https://t.me/meduzalive' label='telegram' />
      <SocialLinkUI isHomePage={isHomePage} icon={instagramIcon} path='https://www.instagram.com' label='instagram' />
    </div>
  )
}