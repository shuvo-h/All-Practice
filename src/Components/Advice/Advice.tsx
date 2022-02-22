import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
type DispatchDeleteType = {
    type: "DELETE"
    adviceId: number
}
type DispatchEditType = {
    type: "EDIT"
    adviceId: number
    adviceText: string
}

type AdviceType = {
    advice : {
        id: number
        advice: string
        date: string
    }
    index : number
    adviceDispatch: React.Dispatch<DispatchDeleteType | DispatchEditType>
}

const Advice = ({advice,index,adviceDispatch}: AdviceType) => {
    // console.log(advice);
    const [editedText,setEditedText] = useState(advice.advice || "");
    const [openTextEditor,setOpenTextEditor] = useState(false);

    const bgIndexGenerate = (max:number,min:number) => Math.floor(Math.random()*(max-min)+min);
    
    const bgColors = ["#F0F8FF","#FFEBCD","#00CED1","#FFFAF0","#ADFF2F","#F0E68C","#FAF0E6","#FFC0CB","#87CEEB","#F5DEB3"]
    return (
        <Box sx={{ margin:"10px", padding:"10px", borderRadius:"10px", boxShadow:"0 0 2px 2px lightblue"}}>
            <Typography variant='h6' sx={{textAlign:"center", backgroundColor:`${bgColors[bgIndexGenerate(0,9)]}`}}>
                Advice #{index + 1}
            </Typography>
            
            {
                openTextEditor ? 
                    <textarea onChange={e=>setEditedText(e.target.value)} name="" value={editedText} id="" cols={40} rows={5}></textarea> 
                :   <Typography variant='body1' sx={{padding:"0 10px"}}>
                        {advice?.advice}
                    </Typography>
            }
            <div>
                {
                    openTextEditor ? <button onClick={()=>{adviceDispatch({type:"EDIT", adviceId:advice.id, adviceText: editedText});setOpenTextEditor(false)}}>save</button>
                    : <Box>
                        <Box sx={{display:"flex",justifyContent: "space-between"}}>
                            <Box>
                                <Button sx={{padding:"1px", margin:"0 5px"}} onClick={()=>setOpenTextEditor(true)} variant='outlined'>Edit</Button>
                                <Button sx={{padding:"0 4px"}} onClick={()=>adviceDispatch({type:"DELETE",adviceId:advice.id})} variant="contained" color="secondary">Delete</Button>
                            </Box>
                            <Typography sx={{backgroundColor:"lightgrey", borderRadius:"3px"}} variant='body2'>Using Since {advice?.date}</Typography>
                        </Box>
                    </Box>
                }
                
            </div>
        </Box>
    );
};

export default Advice;