import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Dialog,
  Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/rules'; // Đường dẫn đến file validate
import { RegisterFetch } from '~/REST-API-client';
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
  });
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

      // console.log('Form data:', formData);
      try {
        const data = await RegisterFetch.post(formData);
        // console.log("data", data);
        // console.log("thanh cong tao")
        setIsSuccess(true);
        setOpenDialog(true);

        // Xóa dữ liệu trong các textField khi thành công
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          address: '',
          phone: '',
        });
        setTimeout(() => {
          setOpenDialog(false);
          navigate("/dang-nhap");
        }, 3000)


      } catch (err) {
        // console.log(err);
        setErrorMassage(err.toString());
        setIsSuccess(false)
        setOpenDialog(true);
      }

    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#4b6584',
          position: 'relative',
        }}
      >
        <Paper
          elevation={3}
          sx={{
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
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {
          isSuccess === true ? <Alert severity='success'>Bạn đã đăng ký tài khoản thành công. Chờ 3 giây rồi hãy đăng nhập lại để tiếp tục nhé!</Alert>
            : <Alert severity='error'>{errorMessage}</Alert>
        }
      </Dialog>
    </>
  );
};

export default Register;
