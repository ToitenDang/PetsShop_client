
import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import myStyle from './index.module.scss';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const initialTiming = 30;
const pinCodeInitial = '123456';
function ChangPassDialog(props) {
    const { onClose, open } = props;
    const [email, setEmail] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [time, setTime] = useState(initialTiming);
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const reCode = useRef();
    const pinInputRefs = useRef([]);
    useEffect(() => {
        if (pageNumber === 2) {
            reCode.current = setInterval(() => {
                setTime((prev) => {
                    if (prev > 0) {
                        // console.log('running timer');
                        return prev - 1;
                    } else {
                        clearInterval(reCode.current);
                        return 0; // Đảm bảo không trả về giá trị âm
                    }
                });
            }, 1000)
            return () => {
                // console.log("Clear timming")
                clearInterval(reCode.current);
            }
        }
    }, [pageNumber])

    const handleNextStep = () => {
        setPageNumber(2);
    }

    const handlePevStep = () => {
        setPageNumber(1);
        setOpenSnackBar(false);
        setPin(['', '', '', '', '', '']);
        clearInterval(reCode.current);
        setTime(initialTiming);
    }

    const handleClose = () => {
        onClose();
        setPageNumber(1);
    
        setEmail('');
        setTime(initialTiming);
        setOpenSnackBar(false);
        setPin(['', '', '', '', '', '']);;
    };
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (index === 5 && pin[index].length > 0) {
                const newPin = [...pin];  // Tạo mảng mới từ pin
                newPin[index] = '';  // Xóa ký tự tại vị trí hiện tại
                setPin(newPin);  // Cập nhật state để re-render lại giao diện
            } else {
                if (index >= 0 || pin[index].length > 0) {
                    const newPin = [...pin];  // Tạo mảng mới từ pin
                    newPin[index - 1] = '';  // Xóa ký tự tại vị trí hiện tại
                    setPin(newPin);  // Cập nhật state để re-render lại giao diện

                    // Nếu có ô trước đó, focus vào nó
                    if (index > 0) {
                        pinInputRefs.current[index - 1].focus();

                    }
                  
                }
                
            }

        }
    };

    const handleInputPIN = (e, index) => {
        const currentValue = e.target.value;
        if (currentValue.length === 1) {
            const newPin = [...pin];
            newPin[index] = currentValue;
            setPin(newPin);
            if (index + 1 < 6) {
                pinInputRefs.current[index + 1].focus();

            }
         
        }
    };
    const handleConfirm = () => {
        if (pin.join('') === pinCodeInitial) {
            clearInterval(reCode.current);
            // console.log('success');
            setTimeout(handleClose, 1000)
        } else {
            pinInputRefs.current[5].focus()
        }
        setOpenSnackBar(true);
    }
    const handleResendCode = () => {
        setTime(initialTiming)
        reCode.current = setInterval(() => {
            setTime((prev) => {
                if (prev > 0) {
                    // console.log('running timer');
                    return prev - 1;
                } else {
                    clearInterval(reCode.current);
                    return 0; // Đảm bảo không trả về giá trị âm
                }
            });
        }, 1000)
    }
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }
    console.log(pin.join(''));

    return (

        <Dialog onClose={handleClose} open={open}>
            {
                pageNumber === 1 ? (
                    <Box sx={{ padding: '10px', display: 'flex', flexDirection: "column", gap: 2 }}>
                        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Thay đổi địa chỉ email</Typography>
                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </DialogTitle>
                        <Typography>Nhập địa chỉ email mới</Typography>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px' }} placeholder='example@gmail.com' />
                        <Button onClick={handleNextStep}>Tiếp tục</Button>
                    </Box>
                ) : (
                    <Box sx={{ padding: '10px', display: 'flex', flexDirection: "column", gap: 2 }}>
                        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Thay đổi địa chỉ email</Typography>
                            <Button onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </DialogTitle>
                        <Typography>Nhập mã pin chúng tôi đã gửi tới email</Typography>
                        <Box style={{ display: 'flex', maxWidth: '350px', gap: 4 }}>
                            {pin.map((subpin, index) => (
                                <input
                                    value={subpin}
                                    autoFocus={index === 0}
                                    key={index}
                                    maxLength="1"
                                    ref={(el) => pinInputRefs.current[index] = el}
                                    className={myStyle.PINInput}
                                    type='text'
                                    onChange={(e) => handleInputPIN(e, index)}
                                    onMouseDown={(e) => index !== 0 && e.preventDefault()}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography>Gửi lại mã sau: {time} giây</Typography>
                            <button disabled={time !== 0} onClick={handleResendCode}>Gửi lại</button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                            <Button onClick={handlePevStep}>Quay về</Button>
                            <Button onClick={handleConfirm} disabled={!pin.every(item => item !== '')}>Xác nhận</Button>
                            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                                {

                                    pin.join('') === pinCodeInitial ? (

                                        <Alert
                                            onClose={handleCloseSnackBar}
                                            severity="success"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >

                                            Cập nhật mật khẩu thành công
                                        </Alert>) : (
                                        <Alert
                                            onClose={handleCloseSnackBar}
                                            severity="error"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            Thất bại, kiểm tra lại mã
                                        </Alert>

                                    )

                                }
                            </Snackbar>
                        </Box>
                    </Box>
                )
            }
        </Dialog>
    );
}

const Profile = () => {
    const [gender, setGender] = useState('female');
    const [name, setName] = useState("Pham Huu Tuan");
    const [birthDay, setBirthDay] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    useEffect(() => {
        return () => {
            if (avatar !== null) {
                URL.revokeObjectURL(avatar.preview);
            }
        }
    }, [avatar])
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeGender = (event) => {
        console.log(gender)
        setGender(event.target.value);
    }
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    }
    const handleCloseChangePassDialog = () => {
        setOpenChangePassword(false)
    }
    return (
        <>
            <Box sx={{ padding: '10px' }}>
                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Hồ sơ của tôi</Typography>
                </Box>
                <Divider sx={{ margin: '10px 0' }} />
                <Box sx={{ width: '100%', display: 'flex' }}>

                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Typography>Tên đăng nhập: </Typography>
                            <Typography>tuan24112003</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Typography>Tên: </Typography>
                            <input type="text" value={name} onChange={handleChangeName} />
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Typography>Email: </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography >pham...@gmail.com</Typography>
                                <Button sx={{ textTransform: 'none' }}
                                    onClick={() => setOpenChangePassword(true)}
                                >Thay đổi</Button>
                            </Box>
                            <ChangPassDialog
                                open={openChangePassword}
                                onClose={handleCloseChangePassDialog}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Typography>Số điện thoại: </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography >09...17</Typography>
                                <Button sx={{ textTransform: 'none' }}>Thay đổi</Button>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Typography>Giới tính: </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        row
                                        value={gender}
                                        onChange={handleChangeGender}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                        <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>Ngày sinh </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={birthDay} onChange={(newValue) => setBirthDay(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant='contained'>Lưu</Button>
                        </Box>
                    </Box>

                    <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Box sx={{ minWidth: '100px', maxWidth: '100px', height: "100px", overflow: 'hidden', borderRadius: '50%' }}>
                                {
                                    avatar !== null ? (
                                        <img className={myStyle.avatar} src={avatar.preview} />
                                    ) : (
                                        <img className={myStyle.avatar} src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                                    )
                                }
                            </Box>
                            <Box>
                                <Button>
                                    <label style={{ cursor: 'pointer' }} htmlFor="file-upload" >
                                        Chọn ảnh
                                    </label>
                                </Button>
                                <input accept="image/*" id="file-upload" style={{ display: 'none' }} type='file' onChange={handleUploadImage} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile;