import { useState ,useRef} from "react";
import { FaPlus } from "react-icons/fa";
import AddQues from "./addQues";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";

const AddQuiz=()=>{
    const titleRef=useRef(null)
    const [addQues,setAddQues]=useState(false);
    const [ques,setQues]=useState([])
    const navigate=useNavigate();

    const handleOnSubmit=async()=>{
        const response=await fetch('http://localhost:3000/admin/dashboard',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                title:titleRef.current.value,
                question:ques
            })
        })

        const data=await response.json();
    }

    const handleOnClickDelete=(id)=>{
        setQues((prev)=>prev.filter((q)=>q.uniqueId!=id))

    }
    return(
        <>
         <div className="ms-5">
            <h2>Create Your Quiz</h2>
            <hr/>
            <form className="d-flex flex-column gap-4" onSubmit={handleOnSubmit}
            style={{
                width:'90%',
                alignContent:'center'
            }}>
                <label>Title</label>
                <input type='text' ref={titleRef} placeholder="Enter Title" required/>
                <div className="d-flex align-items-center gap-4">
                    <h4>Add Question</h4>
                    <div style={{
                        cursor:'pointer'
                    }}>
                        <FaPlus size={20} onClick={()=>setAddQues(true)}></FaPlus>
                    </div>
                </div>
                {addQues && <AddQues addQues={addQues} setAddQues={setAddQues} 
                ques={ques} setQues={setQues}></AddQues>}
                <div className="d-flex flex-column gap-1">
                    {
                        ques.map((ques,idx)=>{
                            return <div style={{
                                border:'solid',
                                borderColor:'grey',
                                padding:'16px',
                                borderRadius:'18px',
                                width:'60%'
                            }}>
                                        <div className="d-flex gap-2 justify-content-between">
                                         <div className="d-flex gap-2">
                                            <span><strong>{idx+1}.</strong></span>
                                            <p>{ques.quesText}</p>
                                         </div>
                                         <RiDeleteBin7Fill size={30} style={{cursor:'pointer'}} onClick={()=>handleOnClickDelete(ques.uniqueId)}></RiDeleteBin7Fill>
                                        </div>
                                        <div className="ms-3">
                                            <p>A. <strong>{ques.option[0]}</strong></p>
                                            <p>B. <strong>{ques.option[1]}</strong></p>
                                            <p>C. <strong>{ques.option[2]}</strong></p>
                                            <p>D. <strong>{ques.option[3]}</strong></p>

                                        </div>
            
                                        <p>Correct Answer: <strong>{ques.corrOption}</strong></p>

                                    </div>
                        })
                    }
                </div>      
                <button type="submit" onClick={()=>navigate('/admin/dashboard')}>CREATE QUIZ</button>
            </form>
         </div>
        </>
        
    )
}

export default AddQuiz