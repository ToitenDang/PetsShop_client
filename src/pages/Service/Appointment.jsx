import { useState } from 'react';
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
const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};


const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, paddingX: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "1.2rem" }}>Tên dịch vụ:</Typography>
                <Typography sx={{ fontSize: "1.2rem" }}>Cắt tỉa lông thú cưng</Typography>
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
                <TextField id="time" type="time" defaultValue={getCurrentTime()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    sx={{ width: 220 }}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "1.2rem" }}>Chi nhánh: </Typography>
                <FormControl sx={{ width: "500px" }} onChange={(e) => console.log(e.target.value)}>
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
                        <option value={10}>437 Lê Văn Việt, Tăng Nhơn Phú A, Thủ Đức, Hồ Chí Minh</option>
                        <option value={20}>58 Tân Lập, Đông Hòa, Dĩ An, Bình Dương</option>
                        <option value={30}>1 Võ Văn Ngân, Linh Chiều, Thủ Đức, Hồ Chí Minh</option>
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
                    />
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "1.2rem" }}>Chi tiết thêm về thú cưng: </Typography>
                <TextField sx={{ width: "400px" }}
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={5}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "1.2rem" }}>Ghi chú của bạn: </Typography>
                <TextField sx={{ width: "400px" }}
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={5}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop:"10px" }}>
                <Button variant="contained" color="secondary">
                    Hủy
                </Button>
                <Button variant="contained" color="success">
                    Đặt ngay
                </Button>
            </Box>
        </Box>
    )
}

export default Appointment;