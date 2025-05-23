
import myStyle from './Blogs.module.scss';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BlogItem from '~/components/BlogItem/BlogItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { BlogFetch } from '~/REST-API-client';
const limit = 20;
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePage = async (event, value) => {
        setPage(value)
        try {
            setIsLoading(true);
            const result = await BlogFetch.getAll(value, limit);
            setBlogs(result.data.data.blogs)
            // console.log("blog data", result)
            setTotalPages(result.data.data.totalPage)
            setIsLoading(false)
        } catch (err) {
            console.log("blogs error: ", err)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const getBlog = async () => {
            try {
                const result = await BlogFetch.getAll(1, limit);
                setBlogs(result.data.data.blogs)
                console.log("blog data", result)
                setTotalPages(result.data.data.totalPage)
                setIsLoading(false)
            } catch (err) {
                console.log("blogs error: ", err)
                setIsLoading(false)
            }

        }
        getBlog()
    }, [])
    return (
        <Box sx={{ marginTop: '150px', paddingY: '10px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2a3b52' : '#fff' }}>
            <Box >
                <Typography sx={{ textAlign: 'center', marginY: '10px', fontSize: '2rem', fontWeight: 'bold' }}>Chia sẻ kinh nghiệm</Typography>
            </Box>

            {/* List blogs */}
            {
                isLoading ? <Box sx={{ display: "flex", justifyContent: "center" }}><CircularProgress /></Box> :
                    (
                        <>
                            <Box className={myStyle.blogsContainer}>
                                <Box className={myStyle.blogsRow}>
                                    {/* List blogs in 1 row*/}
                                    {
                                        blogs.length > 0 && blogs.map((item, index) => {
                                            return (
                                                <Box key={index} className={myStyle.blogsCol}>
                                                    {/* Detail blog */}
                                                    <BlogItem
                                                        information={item}
                                                    />
                                                </Box>
                                            )
                                        })
                                    }

                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                <Stack spacing={2}>
                                    {/* Có thuộc tính onchange. nhận vào 2 đối số là event và value, value là số trang hiện tại */}
                                    <Pagination page={page} onChange={handlePage} count={totalPages} color="primary" />
                                </Stack>
                            </Box>
                        </>
                    )
            }

        </Box>
    )
}

export default Blogs