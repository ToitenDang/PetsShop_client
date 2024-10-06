import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Link } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
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
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật Khẩu"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Đăng Nhập
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          <Link href="#" variant="body2">
            Quên mật khẩu?
          </Link>
        </Typography>
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          Chưa có tài khoản?{' '}
          <Link href="#" variant="body2">
            Đăng ký
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
