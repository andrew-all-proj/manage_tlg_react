import { useState } from "react";
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { useEffect } from "react";


export const TextChangeDoubleClick = ({label, inputData, setInputData, inputText, setInputText, id=0, getId }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        if(inputData){
            setText(inputData)
        }
    }, [inputData])

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const stateChange = (e) => {
        setInputText(true)
        setInputData(text)
        getId(id)
    }

    return(
        <div>
            <Typography variant="subtitle1" gutterBottom>
                {label} {inputText ?  
                <span onDoubleClick={() => setInputText(false)}>{text}</span>
                :
                <Input 
                    type="text"
                    value={text}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => stateChange(e)}
                    autoFocus
                    id={id}
                />}
            </Typography>
        </div>
    )
}