import { IoPerson } from "react-icons/io5";
import styles from '../style/adminComp.module.css'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";



const Admin=()=>{
    const navigate=useNavigate();
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
          onClick={()=>navigate('/admin/dashboard')}>
            <IoPerson size={35}/>
            <h2>ADMIN</h2>
          </motion.div>
        </>
    )
}

export default Admin