import { TextField, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import contactImage from '../../assets/contact.png';
import ZaloIcon from '../../assets/zalo-icon.png';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { UserFetch } from '~/REST-API-client';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await UserFetch.sendMessage(formData);
            alert(response.message); // Nếu thành công, lưu thông báo thành công
        } catch (err) {
            alert(err.message); // Nếu có lỗi, hiển thị thông báo lỗi
        } 
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
          //src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4255.230312553549!2d106.76933817540052!3d10.850632389302671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e1!3m2!1svi!2s!4v1731829227547!5m2!1svi!2s"
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
              label="Message"
              multiline
              rows={4}
              name="message"
              value={formData.message}
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
