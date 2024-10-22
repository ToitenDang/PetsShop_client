import myStyle from './DetailCategory.module.scss'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Tooltip } from '@mui/material';

const testData = [
    {
        _id: '1',
        name: 'Đồ cho chó',
        subCateGory: [
            {
                _id: 'x1',
                name: 'Nơi ở & Chuồng',
                subCateGory: []
            },
            {
                _id: '2x1',
                name: 'Thức ăn $ Dinh dưỡng',
                subCateGory: []
            },
            {
                _id: '3x1',
                name: 'Phụ Kiện & Đồ dùng',
                subCateGory: []
            },
        ]
    },
    {
        _id: '2',
        name: 'Đồ cho mèo',
        subCateGory: [
            {
                _id: 'x2',
                name: 'Nơi ở & Chuồng',
                subCateGory: []
            },
            {
                _id: '2x2',
                name: 'Thức ăn $ Dinh dưỡng',
                subCateGory: []
            },
            {
                _id: '3x2',
                name: 'Phụ Kiện & Đồ dùng',
                subCateGory: []
            }
        ]
    },
    {
        _id: '3',
        name: 'Category 3',
        subCateGory: [
            {
                _id: 'x3',
                name: 'Sub ne',
                subCateGory: []
            }
        ]
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
    {
        _id: '4',
        name: 'Category 4',
        subCateGory: []
    },
]

const DetailCategory = () => {
    return (
        <Box sx={{ width: '100%', maxHeight: '100%', height:'100%' }}>
            <Typography sx={{fontWeight:'bold', fontSize: '1.3rem',textAlign:'center',paddingY:'10px' }}>Chi tiết danh mục</Typography>
            <Divider />
            <Box sx= {{maxHeight: 'calc( 100% - 50px )',height: 'calc( 100% - 50px )', overflowY: 'auto', overflowX: 'hidden'}}>
                {
                    testData.map((data, index) => {
                        return (
                            <Box key={index} sx={{  }}>
                                <Box className={myStyle.common}
                                    sx={{fontWeight:'bold', paddingLeft: '10px', display: 'flex', alignItems: 'center', minHeight: '40px', maxHeight: '40px', overflow: 'hidden' }}>
                                    {data.name}
                                </Box>
                                {
                                    data.subCateGory.map((subData, subIndex) => {
                                        return (
                                            <Box className={myStyle.common} key={subIndex}
                                                sx={{ display: 'flex', alignItems: 'center',  paddingLeft: '20px', minWidth: '100%', maxWidth: '100%', minHeight: '40px', maxHeight: '40px', overflow: 'hidden' }}>
                                                <Typography sx={{ minWidth: '100%', maxWidth: '100%' }}>{subData.name}</Typography>
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