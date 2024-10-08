import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Link, Box } from '@mui/material';

const Register = () => {
  const [inputValue, setInputValue] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý đăng ký ở đây
    console.log('Name:', inputValue.fullName);
    console.log('Email:', inputValue.email);
    console.log('Password:', inputValue.password);
    console.log('Confirm Password:', inputValue.confirmPassword);
    console.log('Address:', inputValue.address);
    console.log('Phone:', inputValue.phone);
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#34495e',
        position: 'relative',
      }}
    >
      <Paper elevation={3} sx={{ padding: '20px', width: '100%', maxWidth: 400, bgcolor: '#40739e', boxShadow: '0 5px 5px #2c3e50' }}>
        <Typography component="h1" variant="h5" align="center">
          Đăng ký
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Họ tên"
            name="fullName"
            autoFocus
            value={inputValue.fullName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={inputValue.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            name="password"
            type="password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Xác nhận lại mật khẩu"
            name="confirmPassword"
            type="password"
            value={inputValue.confirmPassword}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Địa chỉ"
            name="address"
            value={inputValue.address}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Số điện thoại"
            name="phone"
            type="tel" // Sử dụng type "tel"
            value={inputValue.phone}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Đăng Ký
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Đã có tài khoản?{' '}
          <Link href="#" variant="body2">
            Đăng nhập
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
