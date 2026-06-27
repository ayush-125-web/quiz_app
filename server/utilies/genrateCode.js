import { nanoid } from "nanoid";
import Room from "../models/rooms.js";


async  function genrateCode(){
    let code
    let exist=true

    while(exist){
        code=nanoid(5).toUpperCase()
        exist =await Room.findOne({code:code})
    }
return code
}

export default genrateCode