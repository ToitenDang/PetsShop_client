import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Dialog,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/rules'; // Đường dẫn đến file validate
import { RegisterFetch } from '~/REST-API-client';
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const Register = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMassage] = useState("Đã có lỗi, :(")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    gender: 'male'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Xóa lỗi khi người dùng nhập liệu
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      // Nếu tất cả các trường hợp đều hợp lệ

      console.log('Form data:', formData);
      try {
        setIsLoading(true);
        const data = await RegisterFetch.post(formData);
        // console.log("data", data);
        // console.log("thanh cong tao")
        setIsSuccess(true);
        setOpenDialog(true);
        setIsLoading(false)
        // Xóa dữ liệu trong các textField khi thành công
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          address: '',
          phone: '',
          gender: 'male'
        });


      } catch (err) {
        // console.log(err);
        setErrorMassage(err.toString());
        setIsSuccess(false)
        setOpenDialog(true);
        setIsLoading(false)
      }

    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };
  const handleSuccess = () => {
    setOpenDialog(false);
    navigate("/dang-nhap");
  }

  return (
    <>
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
        <Paper
          elevation={3}
          sx={{
            zIndex:2,
            padding: '20px',
            width: '100%',
            maxWidth: 400,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#ffffff'),
            boxShadow: '0 5px 5px #2c3e50',
          }}
        >
          <Typography component="h1" variant="h5" align="center" color={(theme) => (theme.palette.mode === 'dark' ? '#ffffff' : '#333333')}>
            Đăng Ký
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Họ và tên"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name} // Kiểm tra lỗi
              helperText={errors.name} // Hiển thị thông báo lỗi
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            {/* Gender Radio Buttons */}
            <FormControl component="fieldset" fullWidth sx={{ marginTop: 2 }}>
              <FormLabel component="legend">Giới tính</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                <FormControlLabel value="other" control={<Radio />} label="Khác" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Đăng Ký
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }} color={(theme) => (theme.palette.mode === 'dark' ? '#ffffff' : '#666666')}>
            Đã có tài khoản?{' '}
            <Link to="/dang-nhap" variant="body2" style={{ color: "#2d98da" }}>
              Đăng nhập
            </Link>
          </Typography>
        </Paper>
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
      <Dialog open={openDialog} >
        {
          isSuccess === true ?
            <Box sx={{ backgroundColor: "#f5e3b0", padding: "10px" }}>
              <Alert severity='warning'>Hãy kiểm tra email để xác nhận tài khoản </Alert>
              <Button sx={{ marginTop: "10px" }} variant='contained' onClick={handleSuccess}>Đã hiểu</Button>
            </Box>
            :
            <Box sx={{ backgroundColor: "#ffbad1", padding: "10px" }}>
              <Alert severity='error'>{errorMessage}</Alert>
              <Button sx={{ marginTop: "10px", float: "right" }} variant='contained' onClick={() => setOpenDialog(false)}>Đã hiểu</Button>
            </Box>
        }
      </Dialog>
      {/* Loading */}
      {
        isLoading && (
          <Box sx={{
            position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex", justifyContent: "center", alignItems: "center",zIndex:5
          }}
          >
            <CircularProgress />
          </Box>
        )
      }

    </>
  );
};

export default Register;
