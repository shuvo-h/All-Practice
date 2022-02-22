import { Box, TextField } from '@mui/material';
import React from 'react';
type inputReceiverType ={
    inputReceiver : React.Dispatch<React.SetStateAction<string>>
}
const SearchField = ({inputReceiver }: inputReceiverType) => {
    
    return (
        <form>
            <TextField onChange={e=>inputReceiver(e.target.value)} type="text" id="outlined-basic" label="Advice on" variant="outlined" />
        </form>
    );
};

export default SearchField;