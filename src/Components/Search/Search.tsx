import { Box, Container, Typography } from '@mui/material';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Advices from '../Advices/Advices';
import SearchField from '../SearchField/SearchField';

// type StateHookType = {
//     adviceTopic: string
//     setAdviceTopic: (advice:string)=> string
// }
interface fetchAdvicesType {
    query: string
    slips:{
        id: number
        advice: string
        date: string
    }[]
    total_results:string
}
type CustomAdviceType =  {
        id: number
        advice: string
        date: string
}

type ActionType = {type:"DELETE", adviceId: number} | {type:"EDIT", adviceText: string, adviceId:number} | {type:"FETCH", advices: CustomAdviceType[]} 
const adviceReduceFn = (state: CustomAdviceType[], action:ActionType) =>{
    switch (action.type) {
        case "DELETE":
            const filteredState = state.filter(item=>item.id !== action.adviceId)
            return filteredState
        case "EDIT":
            let editedAdvice = state.find(advice=>advice.id === action.adviceId)
            if (editedAdvice) {
                editedAdvice.advice = action.adviceText 
                const editedIndex = state.findIndex(advice=>advice.id === action.adviceId)
                state.splice(editedIndex,1,editedAdvice)
            }
            return state
        case "FETCH":
            return [...action.advices]
        default:
            return state
    }
}
const Search = () => {
    const [adviceTopic,setAdviceTopic] = useState<string>("");
    const [searchAdvices,setSearchAdvices] = useState<fetchAdvicesType>({} as fetchAdvicesType);
    const [customAdvices,adviceDispatch] = useReducer(adviceReduceFn,[]);

    useEffect(()=>{
        if (adviceTopic.length) {
            fetch(`https://api.adviceslip.com/advice/search/${adviceTopic}`)
                .then(res=>res.json())
                .then(data=>{
                    if (data.slips?.length) {
                        setSearchAdvices(data);
                        adviceDispatch({type:"FETCH",advices:data.slips});
                    }
                })
        }
    },[adviceTopic])

    useEffect(()=>{
        fetch("/fakeAdvice.json")
        .then(res=>res.json())
        .then(data=>{
            setSearchAdvices(data);
            adviceDispatch({type:"FETCH",advices:data?.slips});
        })
    },[])


    return (
        <Box>
            <Box  sx={{textAlign:"center", backgroundColor:"lightgrey", padding:" 0 0 30px 0"}}>
                <SearchField inputReceiver={setAdviceTopic}></SearchField>
                <Typography>
                    You have {searchAdvices.total_results} advices on {searchAdvices.query}
                </Typography>
            </Box>
            <Container >
                <Advices allAdvices={customAdvices} adviceDispatch={adviceDispatch}></Advices>
            </Container>
        </Box>
    );
};

export default Search;