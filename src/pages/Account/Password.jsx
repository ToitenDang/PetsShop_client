import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import { UserFetch } from '~/REST-API-client';
import { useAuth } from '~/components/Authentication/Authentication';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const pass = '123456'

export default function Password() {
    const auth = useAuth();
    const [activeStep, setActiveStep] = useState(0);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [reNewPass, setReNewPass] = useState('');
    const [isTruePass, setIsTruePass] = useState(true)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const handleNext = () => {
        UserFetch.resetPassword(auth?.user._id).checkOldPass(oldPass)
            .then(data => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            })
            .catch(err => {
                handleOpenSnackbar();
            })
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleFinish = () => {
        UserFetch.resetPassword(auth.user._id).reset(newPass,reNewPass)
            .then(data => {
                // console.log("Reset pass: ", data);
                setOpenDialog(true)
                setTimeout(() => {
                    handleReset();
                    handleCloseDialog();
                    setOldPass('');
                    setReNewPass('');
                    setNewPass('');
                }, 2000);
            })
            .catch(err => {
                console.log("err resetpass: ", err);
                toast.error(`Cập nhật mật khẩu thất bại`)
            })
       
    }
    const handleReset = () => {
        setActiveStep(0);
    };
    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    return (
        <>
            <Box sx={{ maxWidth: 400, minHeight: '300px' }}>
                <Typography sx={{ fontWeight: 'bold', padding: '10px' }} variant='h5'>Cập nhật mật khẩu</Typography>
                <Divider sx={{ marginY: '20px' }} />
                <Stepper activeStep={activeStep} orientation="vertical">

                    <Step >
                        <StepLabel>
                            Nhập mật khẩu cũ
                        </StepLabel>
                        <StepContent>
                            <Box>
                                <TextField value={oldPass} onChange={(e) => setOldPass(e.target.value)} label="Mật khẩu" variant="standard" />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={oldPass === ''}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step >
                        <StepLabel>
                            Nhập mật khẩu mới
                        </StepLabel>
                        <StepContent>
                            <Box>
                                <Box>
                                    <TextField value={newPass} onChange={(e) => setNewPass(e.target.value)} label="Mật khẩu mới" variant="standard" />
                                </Box>
                                <Box>
                                    <TextField value={reNewPass} onChange={(e) => {
                                        setReNewPass(e.target.value);
                                        if (e.target.value !== newPass) {
                                            setIsTruePass(false);
                                        } else {
                                            setIsTruePass(true);
                                        }
                                    }} label="Nhập lại mật khẩu mới" variant="standard" />
                                </Box>
                                {
                                    isTruePass === false ? <Typography sx={{ color: 'red', fontSize: '0.7rem' }}>Mật khẩu không khớp</Typography> : null
                                }
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={reNewPass !== newPass || newPass === ''}
                                        variant="contained"
                                        onClick={handleFinish}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Finish
                                    </Button>
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
                {activeStep === 2 && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Note archived"

            >
                <Alert severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}> Mật khẩu bạn nhập không đúng</Alert>
            </Snackbar>
            <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DialogTitle>Thông báo</DialogTitle>
                <Box sx={{ padding: '20px' }}>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Cập nhật mật khẩu thành công
                    </Alert>
                </Box>
            </Dialog>
            <ToastContainer />
        </>
    );
}