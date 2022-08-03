import styles from './styles/Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles['footer__container']}>
            <div className={styles['footer__content']}>
                <div className={styles['footer__element']}>
                    <p>&copy; FILMGET 2022</p>
                </div>
                <div className={styles['footer__element']}>
                    <p>MOVIEDBSHTII</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;