import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import SubjectIcon from '@mui/icons-material/Subject';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SubCategory from './SubCategory';
import { CategoryFetch } from '~/REST-API-client';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// const data = [
//     {
//         _id: '1',
//         name: 'Đồ cho chó',
//         subCateGory: [
//             {
//                 _id: 'x1',
//                 name: 'Nơi ở & Chuồng',
//                 subCateGory: []
//             },
//             {
//                 _id: '2x1',
//                 name: 'Thức ăn $ Dinh dưỡng',
//                 subCateGory: []
//             },
//             {
//                 _id: '3x1',
//                 name: 'Phụ Kiện & Đồ dùng',
//                 subCateGory: []
//             }
//         ]
//     },
//     {
//         _id: '2',
//         name: 'Đồ cho mèo',
//         subCateGory: [
//             {
//                 _id: 'x2',
//                 name: 'Nơi ở & Chuồng',
//                 subCateGory: []
//             },
//             {
//                 _id: '2x2',
//                 name: 'Thức ăn $ Dinh dưỡng',
//                 subCateGory: []
//             },
//             {
//                 _id: '3x2',
//                 name: 'Phụ Kiện & Đồ dùng',
//                 subCateGory: []
//             }
//         ]
//     },
//     {
//         _id: '3',
//         name: 'Category 3',
//         subCateGory: [
//             {
//                 _id: 'x3',
//                 name: 'Sub ne',
//                 subCateGory: []
//             }
//         ]
//     },
// ]

const Category = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    useEffect(() => {
        // console.log("getting data")
        CategoryFetch.get()
            .then(res => {
                // console.log("List category: ",res)
                setData(res.data);
            })
            .catch(err => {
               toast.error("Lỗi lấy dữ liệu danh mục")
            })
    },[])

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    function DrawerList() {
        return (
            <Box sx={{ padding: '10px', overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>Danh mục sản phẩm </Typography>
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' }} />
                    </Button>
                </Box>
                {/* Body */}
                <Box sx={{ width: 250, overflowY: 'auto', maxHeight: '90%' }} >
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {
                            data.map((data) => {
                                return <SubCategory key={data._id} subs={data.subCategory} details={data.name} />
                            })
                        }
                    </List>
                </Box>
            </Box>
        )
    }

    return (
        <div>
            <Button sx={{ backgroundColor: (theme) => theme.palette.main }} variant="contained" onClick={toggleDrawer(true)}

                startIcon={<SubjectIcon />}
            >Danh mục</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {<DrawerList />}
            </Drawer>
            <ToastContainer />
        </div>
    );
}

export default Category