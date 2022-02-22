import { Box } from '@mui/system';
import React from 'react';
import Advice from '../Advice/Advice';
type allAdvidesType = {
    allAdvices:  {
        id: number
        advice: string
        date: string
    }[]
    adviceDispatch: React.Dispatch<{type: "DELETE", adviceId: number,} | {type: "EDIT", adviceId: number, adviceText: string}>
}
const Advices = ({allAdvices,adviceDispatch}:allAdvidesType) => {
    // console.log(allAdvices);
    
    return (
        <Box sx={{margin:"2% 10%"}}>
            <Box sx={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
                {
                    allAdvices?.map((advice,index)=><Advice advice={advice} index={index} adviceDispatch={adviceDispatch}  key={advice.id}></Advice>)
                }
            </Box>
            
        </Box>
    );
};

export default Advices;