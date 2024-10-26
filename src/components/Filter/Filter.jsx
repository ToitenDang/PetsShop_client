import myStyle from './Filter.module.scss';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Slider from '@mui/material/Slider';
import StarIcon from '@mui/icons-material/Star';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function valuetext(value) {
    return `${value} sao`;
}

const Filter = () => {
    const [valueSlider, setValueSlider] = useState([0, 5]);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [checked, setChecked] = useState([true, false]);
   
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = (value) => {
        setOpenDialog(false);
    };
    const handleChangeSlider = (event, newValue) => {
        setValueSlider(newValue);
    };
    const handlePriceFrom = (e) => {
        if (isNaN(Number(e.target.value))) {
            setPriceFrom('');
            handleOpenDialog();
            return;
        }
        setPriceFrom(e.target.value)
    }
    const handlePriceTo = (e) => {
        if (isNaN(Number(e.target.value))) {
            setPriceTo('');
            handleOpenDialog();
            return
        }
        setPriceTo(e.target.value)
    }
    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };
    const childrenCheckBox = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Giảm giá"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Voucher"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
            />
        </Box>
    );
    return (
        <Box sx={{ width: '100%', maxHeight: '100%', height: '100%'  }}>
            <Box sx={{paddingY:'10px'  }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem'}}>Bộ lọc</Typography>
                <Box sx={{display:'flex', justifyContent:'space-around'}}>
                    <Tooltip title='Áp dụng bộ lọc'>
                        <Button sx={{ textTransform: 'none' }} variant='contained'><CheckIcon /></Button>
                    </Tooltip>
                    <Tooltip title='Làm sạch bộ lọc'>
                        <Button sx={{ textTransform: 'none' }} variant='contained'><CleaningServicesIcon /></Button>
                    </Tooltip>
                </Box>
            </Box>
            <Divider />
            
            <Box sx={{overflowY: 'auto', overflowX: 'hidden', height:'calc( 100% - 100px )', maxHeight: 'calc( 100% - 100px )'}}>
                {/* Filter with Price */}
                <Box sx={{paddingY:'5px'}}>
                    <Typography sx={{ fontWeight: 'bold' }}>Giá (ngàn đồng):</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <label >Từ</label>
                        <input value={priceFrom}
                            onChange={handlePriceFrom}
                            className={myStyle.inputPrice} name='priceFrom' type='text' id='priceFrom' />
                        <label >Tới</label>
                        <input
                            value={priceTo}
                            onChange={handlePriceTo}
                            className={myStyle.inputPrice} name='priceTo' type='text' id='priceTo' />
                    </Box>
                </Box>
                {/* Filter with Rating */}
                <Box sx={{paddingY:'5px'}}>
                    <Typography sx={{ fontWeight: 'bold' }}>Đánh giá:</Typography>
                    <Typography sx={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>
                        Từ {valueSlider[0]} {<StarIcon sx={{ color: '#f9d240' }} />} tới {valueSlider[1]} {<StarIcon sx={{ color: '#f9d240' }} />}
                    </Typography>
                    <Box sx={{ paddingX: '10px' }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={valueSlider}
                            onChange={handleChangeSlider}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            max={5}
                        />
                    </Box>
                </Box>
                {/* Filter with Sale */}
                <Box>
                    <FormControlLabel
                        label="Khuyến mãi"
                        control={
                            <Checkbox
                                checked={checked[0] && checked[1]}
                                indeterminate={checked[0] !== checked[1]}
                                onChange={handleChange1}
                            />
                        }
                    />
                    {childrenCheckBox}
                </Box>
            </Box>
            <Dialog onClose={handleCloseDialog} open={openDialog}>
                <Box sx={{ padding: '10px' }}>
                    <DialogTitle>Cảnh báo</DialogTitle>
                    <Alert severity="error">Bạn cần nhập vào số</Alert>
                    <Button onClick={handleCloseDialog}>Đã hiểu</Button>
                </Box>

            </Dialog>
        </Box>
    )
}
export default Filter;