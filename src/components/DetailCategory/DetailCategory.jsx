import myStyle from './DetailCategory.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryFetch } from '~/REST-API-client';
import CircularProgress from '@mui/material/CircularProgress';


const DetailCategory = ({ value, onChange }) => {
    const location = useLocation();
    const { tag } = useParams();
    // console.log("tag: ", tag);
    const navigate = useNavigate();
    const [cateData, setCateData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // console.log("reget Data")
        CategoryFetch.get()
            .then(data => {
                setCateData(data.data);
                const mainPath = location.pathname.split('/')[1]
                navigate(`/${mainPath}/${data.data[0].tag}`);
                onChange(data.data[0]._id)
                setIsLoading(false);
            })
            .catch(err => {
                console.log(`Lấy danh sách danh mục thất bại: \n ${err}`)
                toast.error("Lấy danh sách danh mục thất bại")
            })
    }, [])
    if (isLoading) {
        return (
            <Box sx={{ width: '100%', maxHeight: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    }
    const handleNaviage = (receviedTag, id) => {
        const mainPath = location.pathname.split('/')[1];
        navigate(`/${mainPath}/${receviedTag}`);
        onChange(id);
    }
    return (
        <Box sx={{ width: '100%', maxHeight: '100%', height: '100%' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem', textAlign: 'center', paddingY: '10px' }}>Chi tiết danh mục</Typography>
            <Divider />
            <Box sx={{ maxHeight: 'calc( 100% - 50px )', height: 'calc( 100% - 50px )', overflowY: 'auto', overflowX: 'hidden' }}>
                {
                    cateData?.map((data, index) => {
                        return (
                            <Box key={index} sx={{ marginTop: '4px' }}>
                                <Box onClick={() => {
                                    handleNaviage(data.tag, data._id)
                                }}
                                    className={data.tag === tag ? `${myStyle.selected} ${myStyle.common}` : myStyle.common}
                                >
                                    {data.name}
                                </Box>
                                {
                                    data.subCategory.map((subData, subIndex) => {
                                        return (
                                            <Box key={subIndex} sx={{ paddingLeft: '10px', marginTop: '4px' }} >
                                                <Box
                                                    onClick={() => {
                                                        handleNaviage(subData.tag, subData._id)
                                                    }}
                                                    className={subData.tag === tag ? `${myStyle.selected} ${myStyle.common}` : myStyle.common}
                                                >
                                                    <Typography sx={{ minWidth: '100%', maxWidth: '100%' }}>{subData.name}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        )
                    })
                }
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default DetailCategory;