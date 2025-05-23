import myStyle from './BlogItem.module.scss';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const BlogItem = ({information}) => {
    const navigate = useNavigate();
    return (
        <Box className={myStyle.detailBlogContainer}
            sx={{ border: '1px solid #fff', padding: '12px', overflow: 'hidden', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;' }}>
            {/* Image */}
            <Box sx={{ height: 'auto', maxHeight: '210.738px',overflow: 'hidden' }}>
                <img className={myStyle.blogImage} src={information.img} />
            </Box>
            {/* Content */}
            <Box>
                <Button onClick={() => {
                    navigate(`/tap-chi/${information._id}`)
                }} className={myStyle.blogContent} sx={{
                    fontWeight: 'bold', marginY: '10px', paddingX: '10px'
                }}>
                    {information.title}
                </Button>
                <Typography className={myStyle.blogContext} sx={{
                     paddingX: '10px'
                }}>
                    {information.contents[0].titleContent}
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogItem;