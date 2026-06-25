import styles from '../style/home.module.css'
import Admin from './adminComp'
import Participant from './participantComp'
const Home=()=>{
    return(
        <>
         <div className={styles.home}>
            <Admin></Admin>
            <Participant></Participant>
        </div>
        </>
    )
}

export default Home