// import ptBR from 'date-fns/esm/locale/pt/index.js';
import format from 'date-fns/format';
import styles from './styles.module.scss'

export default function Header() {
    // const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    //     locale: ptBR
    // });

    return(
        <header className={styles.headerContainer}> 
            <img src="/logo.svg" alt="Logo"/>

            <p>O melhor para você ouvir, sempre</p>

            {/* <span>{currentDate}</span> */}
            <span>Sex, 23 Abril</span>
        </header>
    )
}