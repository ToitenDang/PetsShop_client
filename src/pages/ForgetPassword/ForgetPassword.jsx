import { Box, Input, Paper, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { memo, useState, useRef, useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import myStyle from './ForgetPass.module.scss';
import { UserFetch } from "~/REST-API-client";
import { EmailSenderFetch } from "~/REST-API-client";
const initialTiming = 60;
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const PageThree = ({ toFirstPage, user }) => {
    const [newPass, setNewPass] = useState("");
    const [rePass, setRepass] = useState("");
    const [open, setOpen] = useState(false);
    const [isValidPass, setIsValidPass] = useState(true);
    const [isValidRePass, setIsValidRePass] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [successPassDialog, setSuccessPassDialog] = useState(false);
    const navigate = useNavigate();
   
    const handleClose = () => {
        setOpen(false);
    };
    const handleCancle = () => {
        setOpen(true);
    }
    const handleDisagree = () => {
        handleClose();

    }

    const handleAggree = () => {
        handleClose();
        toFirstPage();
    }

    const handleComfirm = () => {
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regexPass.test(newPass)) {
            if (newPass !== rePass) {
                setIsValidRePass(false);
                return;
            }
            setIsloading(true);
            UserFetch.forgetPassword(user._id, newPass)
                .then(data => {
                    setIsloading(false);
                    setSuccessPassDialog(true);
                })
                .catch(err => {
                    toast.error(`Cập nhật thất bại\n${err}`);
                    setIsloading(false);
                })
        } else {
            setIsValidPass(false);
        }
    }
    const handleChangeNewPass = (e) => {
        const content = e.target.value;
        if (content !== "") {
            setIsValidPass(true);
        }
        setNewPass(content);
    }
    const handleChangeRePass = (e) => {
        const content = e.target.value;
        if (content !== "") {
            setIsValidRePass(true);
        }
        setRepass(content);
    }
    const handleOke = () => {
        navigate("/dang-nhap");
        setSuccessPassDialog(false);
    }
    return (
        <>
            <Paper sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: 2, minWidth: "400px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography>Mật khẩu mới</Typography>
                    <TextField value={newPass} onChange={handleChangeNewPass} />
                    {
                        !isValidPass && <Box>
                            <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold", color: "red" }}>
                                Mật khẩu tối thiểu 8 ký tự
                            </Typography>
                            <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold", color: "red" }}>
                                Tối thiểu 1 ký tự in hoa, 1 ký tự in thường
                            </Typography>
                            <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold", color: "red" }}>
                                1 chữ số và 1 ký hiệu đặc biệt
                            </Typography>
                        </Box>
                    }
                    <Typography>Nhập lại mật khẩu</Typography>
                    <TextField value={rePass} onChange={handleChangeRePass} />
                    {!isValidRePass && <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold", color: "red" }}>Mật khẩu nhập lại không khớp</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: "10px" }}>
                    <Button disabled={isLoading} onClick={handleCancle}>Huỷ</Button>
                    <Button disabled={isLoading} onClick={handleComfirm}>Xác nhận</Button>
                </Box>
            </Paper>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cảnh báo"}
                </DialogTitle>
                <DialogContent>
                    <Alert variant="standard" color="warning">
                        <DialogContentText id="alert-dialog-description">
                            Tất cả thao tác sẽ không được lưu, bạn có chắc chắn muốn thoát không?
                        </DialogContentText>
                    </Alert>

                </DialogContent>
                <DialogActions>

                    <Button variant="contained" onClick={handleAggree} autoFocus>
                        Đồng ý
                    </Button>
                    <Button variant="contained" onClick={handleDisagree}>Không thoát</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={successPassDialog}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn đã cập nhật mật khẩu thành công"}
                </DialogTitle>
                <DialogContent>
                    <Alert variant="standard" color="success">
                        <DialogContentText id="alert-dialog-description">
                            Hãy đăng nhập lại để sử dụng
                        </DialogContentText>
                    </Alert>

                </DialogContent>
                <DialogActions>

                    <Button variant="contained" onClick={handleOke} autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const PageTwo = ({ toPrevPage, toNextPage, email }) => {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const reCode = useRef();
    const pinInputRefs = useRef([]);
    const [time, setTime] = useState(initialTiming);
    useEffect(() => {

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

    }, [])
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
    const handlePevStep = () => {
        toPrevPage();
        setPin(['', '', '', '', '', '']);
        clearInterval(reCode.current);
        setTime(initialTiming);
    }
    const handleResendCode = () => {
        EmailSenderFetch.sendPINNoUser(email)
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
    const handleConfirm = () => {
        const inputpin = pin.join('');
        EmailSenderFetch.checkPINNoUser(email, inputpin)
            .then(data => {
                clearInterval(reCode.current);
                toast.success("Xác nhận thành công");
                toNextPage();
            }).catch(err => {
                pinInputRefs.current[5].focus();
                toast.error("Mã pin hết hạn hoặc không chính xác");
            })

    }
    return (
        <Paper sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: 2, minWidth: "400px" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }} >Nhập mã pin</Typography>
            <Box>
                <Box sx={{ padding: '10px', display: 'flex', flexDirection: "column", gap: 2 }}>

                    <Typography>Nhập mã pin chúng tôi đã gửi tới {<span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#e77045" }}>email</span>}</Typography>
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
                        <Button onClick={handleConfirm} disabled={!pin.every(item => item !== '')}>Tiếp theo</Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

const MyPageTwo = memo(PageTwo);
const MyPageThree = memo(PageThree);

const ForgetPassword = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState();
    const handleNext = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            setIsloading(true);
            UserFetch.getByEmail(email)
                .then(user => {
                    setUser(user.data);
                    EmailSenderFetch.sendPINNoUser(email)
                        .then(data => {
                            toast.success("Chúng tôi đã gửi mã pin tới email ");
                            setPage(2);
                            setIsloading(false);
                        })
                        .catch(err => {
                            console.log("Lỗi tạo pin: ", err);
                            toast.error(`Lỗi khi tạo mã PIN: \n${err}`);
                            setIsloading(false);
                        })

                })
                .catch(err => {
                    toast.error(`Lỗi: ${err}`)
                    setIsloading(false);
                })
        } else {
            toast.error("Email không đúng định dạng")
        }
    }
    const toPrevPage = useCallback(() => {
        setPage((prev) => {
            if (prev > 1) {
                return prev - 1
            } else {
                return 1;
            }
        })
    }, [])
    const toNextPage = useCallback(() => {
        setPage((prev) => {
            if (prev < 3) {
                return prev + 1
            } else {
                return 1;
            }
        })
    })
    const toFirstPage = useCallback(() => {
        setPage(1);
    }, [])
    return (

        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // bgcolor: '#4b6584',
                position: 'relative',
                backgroundImage: `url(${publicUrl}/images/background.jpg)`
            }}
        >
            {
                page === 1 ?
                    <Paper sx={{zIndex:2, padding: "20px", display: "flex", flexDirection: "column", gap: 2, minWidth: "400px" }}>
                        <Box >
                            <Typography sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }}>Tìm tài khoản của bạn</Typography>

                        </Box>

                        <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Vui lòng nhập email để tìm được tài khoản của bạn</Typography>
                            <TextField placeholder="example@gmail.com" value={email} sx={{ width: "100%" }} onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", gap: 2 }}>
                            <Button
                                disabled={isLoading}
                                onClick={() => {
                                    navigate("/dang-nhap")
                                }} variant="contained" >Hủy</Button>
                            <Button disabled={isLoading} onClick={handleNext} variant="contained" >Tiếp tục</Button>
                        </Box>

                    </Paper>
                    : page === 2 ?
                        <Box sx={{ zIndex: 2 }}>
                            <MyPageTwo toPrevPage={toPrevPage} toNextPage={toNextPage} email={email} />
                        </Box>
                        :
                        <Box sx={{ zIndex: 2 }}>
                            <MyPageThree toFirstPage={toFirstPage} user={user} />
                        </Box>
            }
            <ToastContainer />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu phủ trong suốt
                    zIndex: 1, // Thấp hơn form
                }}
            ></Box>
        </Box>


    )
}

export default ForgetPassword;