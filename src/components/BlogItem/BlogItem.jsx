import myStyle from './BlogItem.module.scss';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const BlogItem = ({url = `https://www.petmart.vn/wp-content/uploads/2023/09/grooming2.jpg`}) => {
    return (
        <Box className={myStyle.detailBlogContainer}
            sx={{ border: '1px solid #fff', padding: '12px', overflow: 'hidden', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;' }}>
            {/* Image */}
            <Box sx={{ height: 'auto', maxHeight: '210.738px',overflow: 'hidden' }}>
                <img className={myStyle.blogImage} src={url} />
            </Box>
            {/* Content */}
            <Box>
                <Button className={myStyle.blogContent} sx={{
                    fontWeight: 'bold', marginY: '10px', paddingX: '10px'
                }}>
                    7 cách chải lông cho mèo hiệu quả ngay tại nhà cực hiệu quả
                </Button>
                <Typography className={myStyle.blogContext} sx={{
                     paddingX: '10px'
                }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogItem;