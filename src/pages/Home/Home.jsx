import styles from './Home.module.scss';
import Appbar from '~/components/Appbar/Appbar';
function Home() {
    return (
        <>
            <Appbar />
            <h1 className={styles.heading}>Home ne</h1>

        </>
    )
}

export default Home;