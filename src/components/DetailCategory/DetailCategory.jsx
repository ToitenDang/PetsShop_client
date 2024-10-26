import myStyle from './DetailCategory.module.scss'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';

const testData = [
    {
        _id: '1',
        name: 'Đồ cho chó',
        path: 'do-cho-cho',
        subCateGory: [
            {
                _id: 'x1',
                name: 'Nơi ở & Chuồng',
                subCateGory: [],
                path: 'noi-o-cho'
            },
            {
                _id: '2x1',
                name: 'Thức ăn $ Dinh dưỡng',
                subCateGory: [],
                path: 'thuc-an-cho'
            },
            {
                _id: '3x1',
                name: 'Phụ Kiện & Đồ dùng',
                subCateGory: [],
                path: 'phu-kien-cho'
            },
        ]
    },
    {
        _id: '2',
        name: 'Đồ cho mèo',
        path: 'do-cho-meo',
        subCateGory: [
            {
                _id: 'x2',
                name: 'Nơi ở & Chuồng',
                subCateGory: [],
                path: 'noi-o-meo'
            },
            {
                _id: '2x2',
                name: 'Thức ăn $ Dinh dưỡng',
                subCateGory: [],
                path: 'thuc-an-meo'
            },
            {
                _id: '3x2',
                name: 'Phụ Kiện & Đồ dùng',
                subCateGory: [],
                path: 'phu-kien-meo'
            }
        ]
    },
    {
        _id: '3',
        name: 'Khác',
        path: 'khac',
        subCateGory: [
           
        ]
    }
]

const DetailCategory = () => {

    return (
        <Box sx={{ width: '100%', maxHeight: '100%', height: '100%' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem', textAlign: 'center', paddingY: '10px' }}>Chi tiết danh mục</Typography>
            <Divider />
            <Box sx={{ maxHeight: 'calc( 100% - 50px )', height: 'calc( 100% - 50px )', overflowY: 'auto', overflowX: 'hidden' }}>
                {
                    testData.map((data, index) => {
                        return (
                            <Box key={index} >
                                <NavLink to={data.path} className={({isActive}) =>isActive ? `${myStyle.selected} ${myStyle.common}` : myStyle.common} >
                                    {data.name}
                                </NavLink>
                                {
                                    data.subCateGory.map((subData, subIndex) => {
                                        return (
                                            <Box key={subIndex} sx={{paddingLeft:'10px'}}>
                                                <NavLink to={subData.path} className={({isActive}) =>isActive ? `${myStyle.selected} ${myStyle.common}` : myStyle.common} >
                                                    <Typography sx={{ minWidth: '100%', maxWidth: '100%' }}>{subData.name}</Typography>
                                                </NavLink>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default DetailCategory;