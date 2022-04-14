
import { Box, Typography } from '@mui/material';
import React from 'react';
import Search from '../Search/Search';


const Home = () => {
    return (
            <Box>
                <Typography sx={{backgroundColor:"lightgrey", padding:"50px 0"}}  variant="h3" textAlign={"center"}>
                    Get A Free Advice
                </Typography> 
                <Search></Search>
            </Box>
    );
};

export default Home;