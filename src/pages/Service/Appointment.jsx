import {  useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};



const Appointment = ({ name, addresses, onChange, prices, user }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectedTime, setSeletedTime] = useState(getCurrentTime());
    const [weightPet, setWeightPet] = useState(2);
    const [openDialog, setOpenDialog] = useState(false);
    const [weightAlert, setWeightAlert] = useState(false);
    const [addressSelected, setAddressSelected] = useState(addresses[0].address);
    const [detailPet, setDetailPet] = useState("");
    const [note, setNote] = useState("");
    const [totalPrice, setTotalPrice] = useState(getTotalPrice(weightPet))
    
    function getTotalPrice(value) {
        const sortedPrices = prices.sort((a, b) => a.maxWeight - b.maxWeight);
        const priceObj = sortedPrices.find(price => value <= price.maxWeight);
        return priceObj ? priceObj.value : null;
    }
    // console.log("total price: " ,getTotalPrice(2))
    // console.log("addresses: ", addresses);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = (value) => {
        setOpenDialog(false);
    };
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSetTime = (e) => {
        setSeletedTime(e.target.value);
    }
    const handleSetWeightPet = e => {
        if (weightAlert) {
            setWeightAlert(false);
        }
        if (isNaN(Number(e.target.value))) {
            setWeightPet('');
            handleOpenDialog();
            return;
        }
        setWeightPet(e.target.value);
        setTotalPrice(getTotalPrice(parseFloat(e.target.value)))
    }
    const handleChangeAddress = (e) => {
        setAddressSelected(e.target.value)
    }
    const handleSubmit = () => {
        if (weightPet === "" || parseFloat(weightPet) > prices.slice(-1)[0].maxWeight || weightPet < 0) {
            setWeightAlert(true);
            return;
        }
        onChange({
            bookingDate: selectedDate,
            bookingTime: selectedTime,
            address: addressSelected,
            petWeight: weightPet,
            detailPet: detailPet,
            note: note,
            totalPrice: totalPrice
        })
        setWeightPet(2);
        setDetailPet("");
        setNote("");
        setTotalPrice(getTotalPrice(weightPet))
    }
    // console.log("addressSelect: ", addressSelected);
    return (

        user ?
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, paddingX: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>Tên dịch vụ:</Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>{name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography sx={{ fontSize: "1.2rem" }}>Ngày thực hiện: </Typography>
                        <Typography>(Tháng/Ngày/Năm)</Typography>
                    </Box>
                    <TextField id="date" value={selectedDate} onChange={handleDateChange} type="date" sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>Thời gian bắt đầu: </Typography>
                    <TextField id="time" type="time" value={selectedTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        sx={{ width: 220 }}
                        onChange={handleSetTime}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>Chi nhánh: </Typography>
                    <FormControl sx={{ width: "500px" }} value={addressSelected} onChange={handleChangeAddress}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Chi nhánh
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            {
                                addresses?.map((address, index) => {
                                    return <option key={index} value={address.address}>{address.address}</option>
                                })
                            }
                        </NativeSelect>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>Cân nặng thú cưng: </Typography>
                    <Box>
                        <OutlinedInput sx={{ width: 220 }}
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            value={weightPet}
                            onChange={handleSetWeightPet}
                        />
                        {weightAlert && <Typography sx={{ color: "red", fontWeight: "bold", fontSize: "0.7rem" }}>Xin lỗi, chúng tôi không hỗ trợ cân nặng này</Typography>}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>Chi tiết thêm về thú cưng: </Typography>
                    <TextField sx={{ width: "400px" }}
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={5}
                        value={detailPet}
                        onChange={(e) => {
                            setDetailPet(e.target.value)
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>Ghi chú của bạn: </Typography>
                    <TextField sx={{ width: "400px" }}
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={5}
                        value={note}
                        onChange={(e) => {
                            setNote(e.target.value)
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Tổng hóa đơn: </Typography>
                    <Typography sx={{ fontSize: "1.2rem", color: "#e77045", fontWeight: "bold" }}>
                        {totalPrice?.toLocaleString('vi-VN')}đ
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: "10px" }}>
                    <Button onClick={() => {
                        setDetailPet("");
                        setNote("");
                        setWeightPet(2);
                        setTotalPrice(getTotalPrice(2))
                    }} variant="contained" color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="success">
                        Đặt ngay
                    </Button>
                </Box>
                <Dialog onClose={handleCloseDialog} open={openDialog}>
                    <Box sx={{ padding: '10px' }}>
                        <DialogTitle>Cảnh báo</DialogTitle>
                        <Alert severity="error">Bạn cần nhập vào số</Alert>
                        <Button onClick={handleCloseDialog}>Đã hiểu</Button>
                    </Box>

                </Dialog>
            </Box>
            :
            <Box>
                <Typography sx={{ fontSize: "1.2rem" }}>
                    Bạn cần có tài khoản để đặt lịch trực tiếp.
                    Hãy liên hệ với chúng tôi để đặt lịch nhé!
                </Typography>
            </Box>
    )
}

export default Appointment;