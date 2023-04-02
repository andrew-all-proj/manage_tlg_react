import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export const SelectFilterSorte = ({sx, label, setReverseSort, reverseSort}) => {

    const handleChange = (event) => {
        setReverseSort(event.target.value)
    };

    return (
        <Box sx={sx}>
        <FormControl >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reverseSort}
                label={label}
                onChange={handleChange}
            >
                <MenuItem value={false}>возрастанию</MenuItem>
                <MenuItem value={true}>убыванию</MenuItem>
            </Select>
        </FormControl>
        </Box>
    )
}