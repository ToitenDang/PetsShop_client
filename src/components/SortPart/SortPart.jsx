
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
const SortPart = () => {
    const [typePrice, setTypePrice] = useState(0)
    const handleChangePriceSort = (event) => {
        setTypePrice(event.target.value)
    }
    return (
        <Box sx={{width:"100%", display:'flex', justifyContent:'flex-start', gap: 3, alignItems:'center'}}>
            <Typography>Sắp xếp theo: </Typography>
            <Box sx={{display:'flex', gap:3, alignItems:'center'}}>
                <Button variant='outlined'>Phổ biến</Button>
                <Button variant='outlined'>Mới nhất</Button>
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
                        <MenuItem value={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                                {/*  */}
                                Không sắp xếp
                            </Box>
                        </MenuItem>
                        <MenuItem value={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1' }}>
                                {/*  */}
                                Thấp đến cao
                            </Box>
                        </MenuItem>
                        <MenuItem value={-1}>
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