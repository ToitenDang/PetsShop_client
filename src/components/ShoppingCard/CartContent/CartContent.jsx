import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
const CartContent = () => {
    return (
        <>
            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',marginTop: '5px' }}>
                <CardMedia
                    sx={{ width: 'auto', height: '100px' }}
                    component="img"
                    alt="green iguana"
                    image="https://gaixinh.photo/wp-content/uploads/2024/10/anh-tran-ha-linh-tiktoker-vong-1-to-tron.jpg"
                />
                <CardContent>
                    <Typography gutterBottom component="div">
                        Trần Hà Linh
                    </Typography>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Typography gutterBottom >
                            1
                        </Typography>
                        <Typography>x</Typography>
                        <Typography gutterBottom >
                            5.000.000
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small"><DeleteIcon /></Button>
                </CardActions>
            </Card>
        </>
    )
}

export default CartContent