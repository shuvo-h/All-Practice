import { Box, Button, Grid, Paper, Typography } from '@mui/material';
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
        <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{padding:"10px 15px", height:"100%",position:"relative"}} >
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
                            openTextEditor ? <Button sx={{padding:"1px", margin:"0 5px"}} onClick={()=>{adviceDispatch({type:"EDIT", adviceId:advice.id, adviceText: editedText});setOpenTextEditor(false)}} variant="contained" color="primary">save</Button>
                            : <Box sx={{position:"absolute", bottom:"5px"}}>
                                <Box sx={{display:"flex",justifyContent: "space-between",alignItems:"center"}}>
                                    <Button sx={{padding:"1px", margin:"0 5px"}} onClick={()=>setOpenTextEditor(true)} variant='outlined'>Edit</Button>
                                    <Typography sx={{backgroundColor:"#FEF9E7", color:"blue",borderRadius:"3px", textDecoration:"underline",fontStyle:"italic"}} variant='body2'>Using Since {advice?.date}</Typography>
                                    <Button sx={{padding:"0 4px", margin:"0 10px"}} onClick={()=>adviceDispatch({type:"DELETE",adviceId:advice.id})} variant="contained" color="secondary">Delete</Button>
                                </Box>
                            </Box>
                        }
                        
                    </div>
                </Paper>
        </Grid>
    );
};

export default Advice;