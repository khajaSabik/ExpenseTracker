import React from 'react'
import TextField from '@mui/material/TextField';

function Input(props) {
  const { value, setValue, label} = props;
  return (
    <div style={{marginTop: ".5rem", marginBottom: ".5rem"}}>
        <TextField 
            id="standard-basic" 
            label={label} 
            variant="standard" 
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            sx={{
                width: "300px"
            }}
        />
    </div>
  )
}

export default Input