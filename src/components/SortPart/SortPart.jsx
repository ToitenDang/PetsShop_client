
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
const SortPart = ({value, onChange}) => {
    // console.log("render sort")
    const [typePrice, setTypePrice] = useState(() => {
        if(value !== "sold" && value !== "date") return value;
        else return "none"
    })
    const handleChangePriceSort = (event) => {
        setTypePrice(event.target.value)
        if(event.target.value === "none") {
            onChange("sold");
        } else {
            onChange(event.target.value);
        }
    }
    const handleUpdateTarget = (target) => {
        onChange(target)
    }
    return (
        <Box sx={{width:"100%", display:'flex', justifyContent:'flex-start', gap: 3, alignItems:'center'}}>
            <Typography>Sắp xếp theo: </Typography>
            <Box sx={{display:'flex', gap:3, alignItems:'center'}}>
                <Button onClick={() => {
                    handleUpdateTarget("sold")
                }} variant= {value === "sold" ? 'contained': 'outlined'}>Phổ biến</Button>
                <Button onClick={() => {
                    handleUpdateTarget("date")
                }} variant= {value === "date" ? 'contained': 'outlined'}>Mới nhất</Button>
                <FormControl size="small" sx={{ minWidth: '120px' }}>
                    <InputLabel
                        id="label-sort-by-price"
                        sx={{
                            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                            '&.Mui-focused': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' }
                        }}
                    >
                        Giá
                    </InputLabel>
                    <Select
                        labelId="label-sort-by-price"
                        id="sort-by-price"
                        value={typePrice}
                        label="Chế độ"
                        onChange={handleChangePriceSort}
                        sx={{
                            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                            '.MuiOutlinedInput-notchedOutline': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                            '.MuiSvgIcon-root': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' }
                        }}
                    >
                        <MenuItem value={"none"}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                                {/*  */}
                                Không sắp xếp
                            </Box>
                        </MenuItem>
                        <MenuItem value={"price-up"}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                                {/*  */}
                                Thấp đến cao
                            </Box>
                        </MenuItem>
                        <MenuItem value={"price-down"}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                                {/*  */}
                                Cao đến thấp
                            </Box>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}
export default SortPart;