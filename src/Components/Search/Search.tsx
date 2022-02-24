import { Box, Button, Container, Typography } from '@mui/material';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Advices from '../Advices/Advices';
import SearchField from '../SearchField/SearchField';
import PersonalAdvices from '../PersonalAdvices/PersonalAdvices';
import TextField from '@mui/material/TextField';

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

type ActionType = {type:"DELETE", adviceId: number} | {type:"EDIT", adviceText: string, adviceId:number} | {type:"FETCH", advices: CustomAdviceType[]} | {type:"ADD",advice:string} 
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
const advicePersonalReduceFn = (state: CustomAdviceType[], action:ActionType) =>{
    switch (action.type) {
        case "DELETE":
                const filteredState = state.filter((item:CustomAdviceType)=>item.id !== action.adviceId)
                localStorage.setItem("personalAdvices",JSON.stringify(filteredState))
                return filteredState
            case "EDIT":
                    const filteredItem = state.filter((item:CustomAdviceType)=>item.id === action.adviceId)
                    if (filteredItem.length) {
                        filteredItem[0].advice = action.adviceText 
                        const editedIndex = state.findIndex(advice=>advice.id === action.adviceId)
                        state.splice(editedIndex,1,filteredItem[0])
                        localStorage.setItem("personalAdvices",JSON.stringify(state))
                        return state
                    }else{
                        return state
                    }
        case "ADD":
            const previousData =  localStorage.getItem("personalAdvices");
            if (previousData !== null) {
                const toBeAdded = [{id:state.length+5001, advice:action.advice, date: new Date().toLocaleDateString()},...state]
                localStorage.setItem("personalAdvices",JSON.stringify(toBeAdded))
                console.log(toBeAdded);
                
                return toBeAdded
            }else{
                const newItem = [{id: 5001, advice:action.advice, date: new Date().toLocaleDateString()}]
                localStorage.setItem("personalAdvices",JSON.stringify(newItem))
                return newItem
            }
            
        case "FETCH":
            const getExistData =  localStorage.getItem("personalAdvices");
            if (getExistData) {
                return JSON.parse(getExistData)
            }else{
                return []
            }

        default:
            return state
    }
}
const Search = () => {
    const [adviceTopic,setAdviceTopic] = useState<string>("");
    const [searchAdvices,setSearchAdvices] = useState<fetchAdvicesType>({} as fetchAdvicesType);
    const [customAdvices,adviceDispatch] = useReducer(adviceReduceFn,[]);

    const [customPersonalAdvices,advicePersonalDispatch] = useReducer(advicePersonalReduceFn,[]);

    // search from API Data 
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

    // initially fetch from fake Data 
    useEffect(()=>{
        fetch("/fakeAdvice.json")
        .then(res=>res.json())
        .then(data=>{
            setSearchAdvices(data);
            adviceDispatch({type:"FETCH",advices:data?.slips});
        })
    },[])

    // initially get personal Data 
    useEffect(()=>{
        advicePersonalDispatch({type:"FETCH", advices:[]})
        
    },[])
// console.log(customPersonalAdvices);
    const fieldRef= useRef<HTMLTextAreaElement>(null)
    const addNewAdvice = () =>{
        if (fieldRef.current) {
            advicePersonalDispatch({advice:fieldRef.current.value,type:"ADD"})
            fieldRef.current.value="";
        }
    }

    return (
        <Box>
            <Box  sx={{textAlign:"center", backgroundColor:"lightgrey", padding:" 0 0 30px 0"}}>
                <SearchField inputReceiver={setAdviceTopic}></SearchField>
                <Typography>
                    You have {searchAdvices.total_results} advices on {searchAdvices.query}
                </Typography>
            </Box>
            <Container >
                    <Typography variant='h5'>Personal Advices:</Typography>
                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                    <textarea ref={fieldRef} rows={5} cols={50} placeholder="Write your advice here"  id="filled-basic-text"   />
                    <Button sx={{padding:0, margin:"10px 0 0 0"}} onClick={addNewAdvice} variant="outlined">Add New Advice</Button>
                </Box>
                {
                    customPersonalAdvices.length ? 
                        <Advices allAdvices={customPersonalAdvices} adviceDispatch={advicePersonalDispatch}></Advices>
                    :   <Typography sx={{textAlign:"center", marginTop:"15px"}} variant='h5'>You have not added any advice yet!</Typography>
                }
                <hr style={{marginTop:"50px"}}/>
                <Typography variant='h5'>Suggested Advices:</Typography>
                <Advices allAdvices={customAdvices} adviceDispatch={adviceDispatch}></Advices>
            </Container>
        </Box>
    );
};

export default Search;