import { Button, TextField, duration } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calculator = () => {
    const [inputStock, setInputStock] = useState('');
    const [details, setDetails] = useState(null);
    const [duration,setDuration] = useState(null);

    const handelsearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8002/${inputStock}/2020-01-01/2020-01-30`);
            setDetails(response.data);
            console.log(details);
            console.log(inputStock);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        handelsearch();
    }, []);

    return (
        <>
            <div>Calculator</div>
            <TextField
                label="Stock Name"
                value={inputStock}
                onChange={(e) => setInputStock(e.target.value)}
            />
            <TextField 
            placeholder='1M/3M/6M'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}/>
            <Button onClick={handelsearch} variant='contained'>Search</Button>
            {/* Display details */}
            {details && (
                <div>
                    <pre>{JSON.stringify(details, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default Calculator;
