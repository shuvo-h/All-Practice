import { Grid } from '@mui/material';
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
        <Grid container spacing={5}>
                {
                    allAdvices?.map((advice,index)=><Advice advice={advice} index={index} adviceDispatch={adviceDispatch}  key={advice.id}></Advice>)
                }
        </Grid>
    );
};

export default Advices;