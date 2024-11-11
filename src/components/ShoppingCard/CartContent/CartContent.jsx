import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
const CartContent = ({ data }) => {
    return (
        <>
            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
                <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center",gap:1}}>
                <CardMedia
                    sx={{ width: 'auto', height: '100px' }}
                    component="img"
                    alt="green iguana"
                    image={
                        data?.img || 
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4wCVyGUWHo8v9gC2GoUP2xUdpOH5L25ywupnhIinYT95Le-jG3E-NPyoTcgwIxW4yDM8&usqp=CAU"
                    }
                />
                <CardContent>
                    <Typography  >
                        {data?.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography  sx={{color: "#ec6b41", fontWeight:"bold"}} >
                            {data?.quantity}
                        </Typography>
                        <Typography>x</Typography>
                        <Typography  >
                            {data?.price.toLocaleString('vi-VN')}
                        </Typography>
                    </Box>
                    <Typography>
                        Size: {data?.size}
                    </Typography>
                </CardContent>
                </Box>
                <CardActions>
                    <Button size="small"><DeleteIcon /></Button>
                </CardActions>
            </Card>
        </>
    )
}

export default CartContent