import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BlogFetch } from '~/REST-API-client';
function Blog() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await BlogFetch.getById(id);
            console.log("blog data", result)
            setBlogData(result.data);
            setIsLoading(false)
        } catch (err) {
            console.log("blogs error: ", err)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    if (isLoading) {
        return (
            <Box sx={{ marginTop: "150px", display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <Box sx={{ marginTop: "150px", display: "flex", flexDirection: "column", alignItems: "start", padding: "40px" }}>
            <h1 >{blogData.title}</h1>
            <Box sx={{width:"100%"}}>
                <img style={{width:"100%", aspectRatio:"16/9", objectFit:"cover"}} src={blogData.img} />
            </Box>
            <Box sx={{ border: "solid 1px #ccc", padding: "20px" }}>
                <h2>Mục lục</h2>
                {
                    blogData.contents.map((item, index) => {
                        return (
                            <h4 key={index} style={{ fontWeight: "bold" }}>{index + 1}: {item.titleContent}</h4>
                        )
                    })
                }
            </Box>
            <Box>
                {
                    blogData.contents.map((item, index) => {
                        return (
                            <Box key={index} >
                                <h2 style={{ fontWeight: "bold" }}>{index + 1}. {item.titleContent}</h2>
                                <Box sx={{marginTop:"10px"}}>
                                    {
                                        item.contentItem.map((contentItem, contentIndex) => {
                                            return <p style={{fontSize:"1.2rem"}} key={contentIndex}>{contentItem}</p>
                                        })
                                    }
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default Blog