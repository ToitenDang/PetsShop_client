import { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const listMap = [
    {
        _id: '1',
        name: 'Pham Huu Tuan',
        phone: '0928895717',
        numberHome: '437',
        street: 'Le Van Viet',
        commune: 'Tang Nhon Phu A',
        district: 'Quan 9',
        province: 'Thu Duc',
        subContent: 'quan tra sua',
        isDefault: 1,
    },
    {
        _id: '2',
        name: 'Pham Huu Tinh',
        phone: '0921234322',
        numberHome: '58',
        street: 'Tan Lap',
        commune: 'Dong Hoa',
        district: 'Di An',
        province: 'Binh Duong',
        subContent: '',
        isDefault: 0,
    }
]
const DialogDeltailAddress = ({ onClose, open, data = null, handleAdd, handleUpdate }) => {

    useEffect(() => {
        if (data) {
            setName(data.name || ''); // Sử dụng giá trị mặc định là ''
            setPhone(data.phone || '');
            setNumberHome(data.numberHome || '');
            setStreet(data.street || '');
            setCommune(data.commune || '');
            setDistrict(data.district || '');
            setProvince(data.province || '');
            setSubContent(data.subContent || '');
        }
    }, [data])
    const [name, setName] = useState(() => {
        console.log("set demo")
        return data != null ? data.name : '';

    });
    const [phone, setPhone] = useState(() => {

        return data !== null ? data.phone : '';
    });
    const [numberHome, setNumberHome] = useState(() => {
        return data !== null ? data.numberHome : '';
    });
    const [street, setStreet] = useState(() => {
        return data !== null ? data.street : '';
    });
    const [commune, setCommune] = useState(() => {
        return data !== null ? data.commune : '';
    });
    const [district, setDistrict] = useState(() => {
        return data !== null ? data.district : '';
    });
    const [province, setProvince] = useState(() => {
        return data !== null ? data.province : '';
    });
    const [subContent, setSubContent] = useState(() => {
        return data !== null ? data.subContent : '';
    })
    const handleClose = () => {
        onClose();
    };
    const handleConfirm = () => {
        const newData = {
            name,
            phone,
            numberHome,
            street,
            commune,
            district,
            province,
            subContent,
            isDefault: data?.isDefault || 0
        }
        if (data !== null) {
            handleUpdate(newData)
        } else {
            handleAdd(newData)
        }
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ padding: '20px', minWidth: '420px' }}>
                {
                    data == null ? <DialogTitle>Thêm địa chỉ mới</DialogTitle> : <DialogTitle>Cập nhật địa chỉ</DialogTitle>
                }
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} label="Họ và tên" variant="standard" />
                        <TextField value={phone} onChange={(e) => setPhone(e.target.value)} label="Số điện thoại nhận" variant="standard" />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                        <TextField value={province} onChange={(e) => setProvince(e.target.value)} label="Tỉnh/Thành phố" variant="standard" />
                        <TextField value={district} onChange={(e) => setDistrict(e.target.value)} label="Quận/Huyện" variant="standard" />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                        <TextField value={commune} onChange={(e) => setCommune(e.target.value)} label="Phường/Xã" variant="standard" />
                        <TextField value={street} onChange={(e) => setStreet(e.target.value)} label="Đường" variant="standard" />
                        <TextField value={numberHome} onChange={(e) => setNumberHome(e.target.value)} label="Số nhà" variant="standard" />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <TextField value={subContent} onChange={(e) => setSubContent(e.target.value)} sx={{ width: '100%' }} label="Địa chỉ cụ thể" variant="standard" />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: '10px' }}>
                    <Button>Trở lại</Button>
                    <Button variant='contained' onClick={handleConfirm}>Hoàn Thành</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

const Address = () => {
    const [openNewAddress, setOpenNewAddress] = useState(false);
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
    const [mapData, setMapData] = useState(listMap);
    const addressSelected = useRef(0);
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleClickOpenNewAddress = () => {
        setOpenNewAddress(true);
    };

    const handleCloseNewAddress = () => {
        setOpenNewAddress(false);
    };
    const handleClickOpenUpdateAddress = (index) => {
        addressSelected.current = index;
        setOpenUpdateAddress(true);

    };

    const handleCloseUpdateAddress = () => {
        setOpenUpdateAddress(false);
    };
    const addNewAddress = (newAddress) => {
        // console.log(newAddress);
        const newMaps = [
            ...mapData,
            newAddress
        ]
        setMapData(newMaps);
        setOpenSnackBar(true);
        setTimeout(handleCloseNewAddress,2000)
    }
    const updateAddress = (updatedAddress) => {
        const newMaps = [...mapData];
        newMaps[addressSelected.current] = updatedAddress;
        console.log(newMaps);
        setMapData(newMaps);
        setOpenSnackBar(true);
        setTimeout(handleCloseUpdateAddress,2000)
    }
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }
    // console.log(addressSelected.current);
    return (
        <>
            <Box sx={{ padding: '10px' }}>

                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6'>Địa chỉ của tôi</Typography>
                    <Button
                        onClick={handleClickOpenNewAddress}
                        sx={{ textTransform: 'none ', fontWeight: 'bold' }} variant='contained' startIcon={<AddIcon />} >Thêm địa chỉ mới</Button>
                </Box>
                <Divider sx={{ marginY: '20px' }} />
                <Box>
                    {/* 1 thông tin địa chỉ */}
                    {
                        mapData.map((map, index) => {
                            return (
                                <Box key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography>{map.name}</Typography>
                                                <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                                                <Typography>{map.phone}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>{map.numberHome} {map.street}</Typography>
                                                <Typography>{map.commune} {map.district} {map.province}</Typography>
                                                {
                                                    map.isDefault === 1 ? (<Box sx={{ border: 'solid 2px #ef6a41', maxWidth: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                                                        <Typography sx={{ color: '#ef6a41' }}>Mặc định</Typography>
                                                    </Box>) : null
                                                }

                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button onClick={() => handleClickOpenUpdateAddress(index)} sx={{ textTransform: 'none' }}>Cập nhật</Button>
                                                <Button sx={{ textTransform: 'none' }}>Xóa</Button>
                                            </Box>
                                            <Box>
                                                <Button disabled={map.isDefault === 1} variant='contained' sx={{ textTransform: 'none' }}>Thiết lập mặc định</Button>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ marginY: '20px' }} />
                                </Box>

                            )
                        })
                    }
                </Box>
            </Box>

            <DialogDeltailAddress open={openNewAddress}
                onClose={handleCloseNewAddress} handleAdd={addNewAddress} />
            <DialogDeltailAddress open={openUpdateAddress}
                onClose={handleCloseUpdateAddress} data={mapData[addressSelected.current]} handleUpdate={updateAddress} />
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                {

                    true ? (

                        <Alert
                            onClose={handleCloseSnackBar}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >

                            Cập nhật địa chỉ hoàn tất
                        </Alert>) : (
                        <Alert
                            onClose={handleCloseSnackBar}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Cập nhật địa chỉ thất bại
                        </Alert>

                    )
                }
            </Snackbar>
        </>
    )
}

export default Address;