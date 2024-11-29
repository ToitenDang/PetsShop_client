import myStyle from './ExperienceBlogs.module.scss';

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BlogItem from '~/components/BlogItem/BlogItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const ExperienceBlogs = () => {
    return (
        <Box sx={{ marginTop: '40px', paddingY: '10px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2a3b52' : '#fff' }}>
            <Box >
                <Typography sx={{ textAlign: 'center', marginY: '10px', fontSize: '2rem', fontWeight: 'bold' }}>Chia sẻ kinh nghiệm</Typography>
            </Box>

            {/* List blogs */}
            <Box className={myStyle.blogsContainer}>
                <Box className={myStyle.blogsRow}>
                    {/* List blogs in 1 row*/}
                    <Box  className={myStyle.blogsCol}>
                        {/* Detail blog */}
                            <BlogItem
                            //  url={`${publicUrl}/images/blogs/test.png`}
                             />
                    </Box>
                    <Box  className={myStyle.blogsCol}>
                        {/* Detail blog */}
                            <BlogItem 
                            // url={`${publicUrl}/images/blogs/test_2.png`}
                            />
                    </Box>
                    <Box  className={myStyle.blogsCol}>
                        {/* Detail blog */}
                            <BlogItem 
                            // url={`${publicUrl}/images/blogs/test_3.png`}
                            />
                    </Box>
                    <Box  className={myStyle.blogsCol}>
                        {/* Detail blog */}
                            <BlogItem 
                            // url={`${publicUrl}/images/blogs/test_4.png`}
                            />
                    </Box>
                    <Box  className={myStyle.blogsCol}>
                        {/* Detail blog */}
                            <BlogItem 
                            // url={`${publicUrl}/images/blogs/test_5.png`}
                            />
                    </Box>
                </Box>
            </Box>

            {/* Paging */}
            <Box sx={{marginTop: '10px',display: 'flex', justifyContent: 'center'}}>
                <Stack spacing={2}>
                    {/* Có thuộc tính onchange. nhận vào 2 đối số là event và value, value là số trang hiện tại */}
                    <Pagination count={10}  color="primary" />
                </Stack>
            </Box>
        </Box>
    )
}

export default ExperienceBlogs;