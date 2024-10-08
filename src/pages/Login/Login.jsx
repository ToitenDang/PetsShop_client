import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Link, Box } from '@mui/material';
import theme from '../../theme';

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputValue((prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#34495e', // Màu nền chính của trang
        position: 'relative',
      }}
    >

      <Paper elevation={3} sx={{ padding: '20px', width: '100%', maxWidth: 400, bgcolor: '#40739e', boxShadow: '0 5px 5px #2c3e50' }}>
        <Typography component="h1" variant="h5" align="center">
          Đăng Nhập
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputValue.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật Khẩu"
            type="password"
            name="password"
            autoComplete="current-password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Đăng Nhập
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          <Link href="#" variant="body2">
            Quên mật khẩu?
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Chưa có tài khoản?{' '}
          <Link href="#" variant="body2">
            Đăng ký
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
