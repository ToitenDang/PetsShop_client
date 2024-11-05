import { TextField, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import contactImage from '../../assets/contact.png';
import ZaloIcon from '../../assets/zalo-icon.png';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import theme from '~/theme';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý dữ liệu form ở đây
    console.log(formData);
  };

  const handleZaloClick = () => {
    // Thay link Zalo
    window.open('https://zalo.me/your-zalo-id', '_blank');
  };

  const handleHotlineClick = () => {
    // Thay số đt
    window.open('tel:+1234567890', '_blank');
  };

  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
        width: '100%',
        height: 'auto',
        mt: 14
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '80%', md: '70%', lg: '1024px', xl: '1024px' },
          maxWidth: '1240px',
          padding: '0 16px 20px',
          position: 'relative',
          left: '50%',
          transform: 'TranslateX(-50%)',
        }}
      >
        <Typography variant='h3' sx={{ padding: '16px 0' }}>
          Liên hệ
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: { xs: '200px', sm: '300px', md: '400px' },
            border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000'),
            borderRadius: 1,
            overflow: 'hidden',
            padding: 1,
            mb: 4
          }}
        >
          <iframe
            style={{ width: '100%', height: '100%' }}
            allowFullScreen
            loading="lazy"
          />
        </Box>

        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Liên hệ với chúng tôi
        </Typography>


        {/* Contact Form */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', md: '60%' },
            }}
          >

            <TextField
              label="Name"
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Content"
              multiline
              rows={4}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              sx={{ marginBottom: 2 }}
            />

            <Button type="submit" variant="contained" color="primary">
              Gửi
            </Button>


          </Box>
          <Box
            sx={{
              display: { xs: 'none', sx: 'none', md: 'flex' },
              mt: 2,
              maxWidth: '100%',
              width: { xs: '100%', md: '30%' },
              flexShrink: 1,
            }}
          >
            <img
              src={contactImage}
              alt="Description of the image"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Box>
        {/* Nút liên hệ qua Zalo và hotline */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <Typography variant="h5" >
            Phương thức liên hệ khác
          </Typography>
          <Button
            sx={{
              width: '50px',
              height: '50px',
              padding: '0',
              borderRadius: '4px',
              ml: 2
            }}
            variant="contained" color="primary" onClick={handleZaloClick}>
            <img
              src={ZaloIcon}
              alt="Zalo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Button>
          <Button
            sx={{
              width: '50px',
              height: '50px',
              padding: '0',
              borderRadius: '4px',
              color: "red",
              borderColor: 'red',
              ml: 2
            }}
            variant="outlined"
            onClick={handleHotlineClick}
          >
            <PhoneInTalkIcon />
          </Button>
        </Box>
      </Box>


    </Box>
  );
}

export default Contact;
