
import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import myStyle from './index.module.scss';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAuth } from "~/components/Authentication/Authentication";
import { obfuscateEmail, obfuscatePhone } from '~/utils/hiddenInfo';
import { EmailSenderFetch, UserFetch } from '~/REST-API-client';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { updateSchema } from '~/utils/rules';
const initialTiming = 60;
// const pinCodeInitial = '123456';


function ChangEmailDialog(props) {
    const auth = useAuth();
    const { onClose, open, resetData } = props;
    const [email, setEmail] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [time, setTime] = useState(initialTiming);
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [isTrue, setIsTrue] = useState(false);
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

        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Kiểm tra xem email có hợp lệ không
        if (!emailRegex.test(email)) {
            toast.error("Email không đúng định dạng!");
            return; // Dừng hành động tiếp theo nếu email không hợp lệ
        }

        setPageNumber(2);
        EmailSenderFetch.sendPIN(email, auth?.user._id)
            .then(data => {
                toast.success("Chúng tôi đã gửi mã PIN tới email mới, hãy kiểm tra!")
            })
            .catch(err => {
                console.log("Lỗi tạo pin: ", err);
                toast.error(`Lỗi khi tạo mã PIN`);
            })
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
        const inputpin = pin.join('');
        EmailSenderFetch.checkPIN(email, auth?.user._id, inputpin)
            .then(data => {
                clearInterval(reCode.current);
                resetData(email);
                // console.log('success');
                setTimeout(handleClose, 1000);
                setIsTrue(true);
                setOpenSnackBar(true);
            }).catch(err => {
                pinInputRefs.current[5].focus();
                setIsTrue(false);
                setOpenSnackBar(true);
            })


    }
    const handleResendCode = () => {
        EmailSenderFetch.sendPIN(auth?.user.email, auth?.user._id)
            .then(data => {
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
            })
            .catch(err => {
                console.log("Lỗi tạo pin: ", err);
                toast.error(`Lỗi khi tạo mã PIN: \n${err}`);
            })

    }
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }
    // console.log(pin.join(''));

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
                        <Typography>Nhập mã pin chúng tôi đã gửi tới {<span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#e77045" }}>email mới</span>}</Typography>
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

                                    isTrue ? (

                                        <Alert
                                            onClose={handleCloseSnackBar}
                                            severity="success"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >

                                            Cập nhật email thành công
                                        </Alert>) : (
                                        <Alert
                                            onClose={handleCloseSnackBar}
                                            severity="error"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            Thất bại, mã pin hết hạn hoặc nhập sai
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

function ChangePhoneDialog(props) {
    const [phone, setPhone] = useState("");
    const { onClose, open, resetData } = props;
    const handleClose = () => {
        setPhone("");
        onClose();

    }
    const handleCanle = () => {
        handleClose()
    }
    const handleSubmit = () => {
        const phoneRegex = /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;

    // Kiểm tra xem email có hợp lệ không
    if (!phoneRegex.test(phone)) {
        toast.error("Số điện thoại không đúng định dạng!");
        return; 
    }
        resetData(phone);
        handleClose();
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ padding: "20px" }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: "bold" }}>Cập nhật số điện thoại</Typography>
                <Divider sx={{ marginY: "20px" }} />
                <Box>
                    <Typography>Nhập số điện thoại mới</Typography>
                    <input type='text' style={{ padding: "10px" }} value={phone} onChange={(e) => {
                        setPhone(e.target.value);
                    }} />
                </Box>
                <Box>
                    <Button onClick={handleCanle}>Hủy</Button>
                    <Button onClick={handleSubmit}>Hoàn tất</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

const Profile = () => {
    const auth = useAuth();
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [disbleSaveButton, setDisableSaveButton] = useState(false);
    const [avatar, setAvatar] = useState({
        preview: "",
        file: null
    });
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePhone, setOpenChangePhone] = useState(false);
    // console.log(avatar);
    const cleanUpFunction = () => {
        if (avatar.preview !== "") {
            // console.log("clear image")
            URL.revokeObjectURL(avatar.preview);
        }
    }
    useEffect(() => {
        setGender(auth?.user?.gender);
        setName(auth?.user?.name);
        setAvatar({
            preview: auth?.user?.avatar.preview,
            file: null
        });
        setAddress(auth?.user?.address);
        setEmail(auth?.user?.email);
        setPhone(auth?.user?.phone);
        cleanUpFunction();
    }, [auth.user])
    useEffect(() => {
        return cleanUpFunction;
    }, [avatar])
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeGender = (event) => {
        // console.log(gender)
        setGender(event.target.value);
    }
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        console.log("preview: ", preview)
        setAvatar({
            preview: preview,
            file: file
        });
        e.target.value = null;
    }
    const handleCloseChangePassDialog = () => {
        setOpenChangeEmail(false)
    }
    const handleCloseChangePhoneDialog = () => {
        setOpenChangePhone(false)
    }

    const validateForm = async () => {
        try {
            await updateSchema.validate(
                {
                    name: name,
                    email: email,
                    address: address,
                    phone: phone,  
                },
                { abortEarly: false }
            );
            return true;
        } catch (error) {
            if (error.inner) {
                // Nhóm lỗi theo path (tên trường) và chỉ hiển thị lỗi đầu tiên
                const uniqueErrors = {};
                error.inner.forEach(err => {
                    if (!uniqueErrors[err.path]) {
                        uniqueErrors[err.path] = err.message;  // Lưu lỗi đầu tiên cho mỗi trường
                    }
                });
    
                // Hiển thị lỗi cho từng trường
                Object.values(uniqueErrors).forEach(errorMessage => {
                    toast.error(errorMessage);
                });
            } else {
                toast.error("Lỗi: " + error.message);  // Hiển thị lỗi chung nếu có
            }
            return false;
        }
    };

    const handleSaveChangeInfo = async () => {

        const isValid = await validateForm();
        if (!isValid) return;

        // console.log(auth?.user)
        console.log("avatar: ", avatar)
        const formData = new FormData();

        if (avatar.file) {
            formData.append("avatar", avatar.file);
        }
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("address", address);
        setDisableSaveButton(true);
        UserFetch.updateInfo(auth?.user?._id, formData)
            .then(data => {
                // console.log("Updated: ", data.data.user)
                localStorage.setItem("access_token", data.data.access_token)
                // console.log("data: ", data);
                auth.authenUser(data.data.user);
                setDisableSaveButton(false)
                window.alert("Cập nhật thông tin thành công")
                // console.log("new User:", auth.user);
            })
            .catch(err => {
                console.log("Err: ", err)
                setDisableSaveButton(false)
                toast.error(`Cập nhật thông tin thất bại: \n ${err}`);
            })

    }

    return (
        <>
            {
                auth?.user &&
                <>
                    <Box sx={{ padding: '10px' }}>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Hồ sơ của tôi</Typography>
                        </Box>
                        <Divider sx={{ margin: '10px 0' }} />
                        <Box sx={{ width: '100%', display: 'flex' }}>

                            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <Typography>Tên: </Typography>
                                    <input type="text" value={name} onChange={handleChangeName} />
                                </Box>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <Typography>Email: </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography >{obfuscateEmail(email)}</Typography>
                                        <Button sx={{ textTransform: 'none' }}
                                            onClick={() => {

                                                setOpenChangeEmail(true)
                                            }
                                            }
                                        >Thay đổi</Button>
                                    </Box>
                                    <ChangEmailDialog
                                        resetData={(value) => {
                                            setEmail(value)
                                        }}
                                        open={openChangeEmail}
                                        onClose={handleCloseChangePassDialog}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <Typography>Số điện thoại: </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography >{obfuscatePhone(phone)}</Typography>
                                        <Button onClick={() => {
                                            setOpenChangePhone(true)
                                        }} sx={{ textTransform: 'none' }}>Thay đổi</Button>
                                    </Box>
                                    <ChangePhoneDialog
                                        open={openChangePhone}
                                        onClose={handleCloseChangePhoneDialog}
                                        resetData={(value) => setPhone(value)}
                                    />
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
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: 3 }}>
                                    <Typography>Địa chỉ sống: </Typography>
                                    <input type="text" style={{ flex: 1 }} value={address} onChange={handleChangeAddress} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button disabled={disbleSaveButton} onClick={handleSaveChangeInfo} variant='contained'>Lưu</Button>
                                </Box>
                            </Box>

                            <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box>
                                    <Box sx={{ minWidth: '100px', maxWidth: '100px', height: "100px", overflow: 'hidden', borderRadius: '50%' }}>

                                        <Avatar sx={{ width: "100%", height: "100%" }} src={avatar.preview} />

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
                    <ToastContainer />
                </>
            }

        </>
    )
}

export default Profile;