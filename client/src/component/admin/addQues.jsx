import { useRef } from "react"

const AddQues=({addQues,setAddQues,ques,setQues})=>{
    const quesRef=useRef(null),opt1Ref=useRef(null),opt2Ref=useRef(null),opt3Ref=useRef(null),opt4Ref=useRef(null)
    const corroptRef=useRef(null)

    const handleonClickAddQues=()=>{
        if(!quesRef.current.value || !opt1Ref.current.value||!opt2Ref.current.value||!opt3Ref.current.value||!opt4Ref.current.value||!corroptRef.current.value) return;

        const options=[opt1Ref.current.value,opt2Ref.current.value,opt3Ref.current.value,opt4Ref.current.value,]
        setQues((prev)=>[...prev,{uniqueId:crypto.randomUUID(), quesText:quesRef.current.value,option:options,corrOption:corroptRef.current.value}])
        setAddQues(false)
    }
    return(
        <div className="d-flex flex-column gap-2 ms-4" style={{
            border:'solid',
            borderColor:'gray',
            padding:'16px',
            borderRadius:'15px'
        }}>
            <label>Your Ques</label>
            <textarea type="text" ref={quesRef} placeholder="enter your question" required/>
            <hr/>
            <label>Available Options:</label>
            <input type="text" ref={opt1Ref} placeholder="option 1" required/>
            <input type="text" ref={opt2Ref} placeholder="option 2" required/>
            <input type="text" ref={opt3Ref} placeholder="option 3" required/>
            <input type="text" ref={opt4Ref} placeholder="option 4" required/>
            <hr/>
            <label>Correct Option:</label>
            <input type="text" ref={corroptRef}placeholder="Correct option"/>

            <button type="submit" onClick={handleonClickAddQues}>Add Question</button>

        </div>
            
    )
}

export default AddQues