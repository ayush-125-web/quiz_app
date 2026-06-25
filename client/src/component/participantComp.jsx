import { BsFillPeopleFill } from "react-icons/bs";
import styles from '../style/participantComp.module.css'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Participant=()=>{
    const navigate=useNavigate()
    return(
        <>
          <motion.div className={styles.container}
          whileHover={{
            scale:1.3,
            boxShadow:'0px 8px 30px rgba(196, 190, 190, 0.89)',
            borderRadius:'15px',
            padding:'2%',
            paddingLeft:'4%',
            paddingRight:'4%'
          }}
          onClick={()=>navigate('/participant')}>
            <BsFillPeopleFill size={40}/>
            <h2>PARTICIPANT</h2>
          </motion.div>
          
        </>
    )
}

export default Participant