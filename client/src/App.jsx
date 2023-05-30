import { useState } from "react";
import Input from "./components/Input";
import "./App.css"
import {Typography, Container, Button} from '@mui/material';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [incurredOn, setIncurredOn] = useState("");
    const [notes, setNotes] = useState("");

    const submithandler = () => {
        let formData = {
            title,
            amount,
            category,
            incurredOn,
            notes
        }
        axios({
            method: 'post',
            url: 'http://localhost:8000/data',
            data: formData
        }).then(response => {
            console.log("response", response.data)
        });

    }

    const cancelHandler = () => {
        setTitle("");
        setAmount("");
        setCategory("");
        setIncurredOn("");
        setNotes("");
    }

    return (
        <div>
            <Container 
                maxWidth="lg"  
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    my : 5
                }}
            >
                <Typography variant="h6" gutterBottom color="primary">
                    Expense Record
                </Typography>
                <div>
                    <Input value={title} setValue={setTitle} label="Title" />
                    <Input value={amount} setValue={setAmount} label="Amount (Tk)" />
                    <Input value={category} setValue={setCategory} label="Category" />
                    <Input value={incurredOn} setValue={setIncurredOn} label="Incurred on" />
                    <Input value={notes} setValue={setNotes} label="Notes" />
                </div>
                <div style={{ marginTop: "1.5rem", width: "300px", display: "flex", justifyContent: "space-between"}} >
                    <div><Button variant="contained" onClick={submithandler}>Submit</Button></div>
                    <div><Button variant="outlined" onClick={cancelHandler}>Cancel</Button></div>
                </div>
            </Container>
        </div>
    );
}

export default App;
