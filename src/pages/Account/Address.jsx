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
import { useAuth } from '~/components/Authentication/Authentication';
import { UserFetch } from '~/REST-API-client';

const DialogDeltailAddress = ({ onClose, open, data = null, type }) => {

    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const handleClose = () => {
        onClose();
    };
    const handleConfirm = () => {
        if(type == "add-new") {

        } else {
            
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
                        <TextField value={address} onChange={(e) => setAddress(e.target.value)} label="Địa chỉ" variant="standard" />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={{ width: '100%' }} label="Ghi chú" variant="standard" />
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
    const auth = useAuth()
    const [openNewAddress, setOpenNewAddress] = useState(false);
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
    const [addressData, setAddressData] = useState()
    

    useEffect(() => {
        setAddressData(auth?.user?.shippingAddress);
    }, [])
    const handleClickOpenNewAddress = () => {
        setOpenNewAddress(true);
    };

    const handleCloseNewAddress = () => {
        setOpenNewAddress(false);
    };
    const handleClickOpenUpdateAddress = (index) => {
        
        setOpenUpdateAddress(true);
    };

    const handleCloseUpdateAddress = () => {
        setOpenUpdateAddress(false);
    };
    const addNewAddress = (newAddress) => {
        // console.log(newAddress);
        
       
        setTimeout(handleCloseNewAddress,2000)
    }
    const updateAddress = (updatedAddress) => {
        
       
        setTimeout(handleCloseUpdateAddress,2000)
    }
   
    const handleResetAddress = (index) => {
        // const coppyAddress = [...auth.user.shippingAddress];
        const coppyAddress = addressData?.map((data, idx) => {
            data.isDefault = false
            if(idx === index) {data.isDefault = true}
            return data 
        })
        UserFetch.updateShippingAddress(auth?.user?._id, coppyAddress)
            .then((data) => {
                console.log("get new: ", data);
                window.alert(`Cập nhật địa chỉ thành công`);
                auth.authenUser(data.data.user);
            })
            .catch((err) => {
                window.alert(`Cập nhật địa chỉ thất bại: \n ${err}`);
                console.log("error: ", err)
            })
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
                        addressData?.map((map, index) => {
                            return (
                                <Box key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{display: 'flex', flexDirection:"column", gap:1}}>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography>Người nhận: {map.recipientName}</Typography>
                                                <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                                                <Typography>SĐT: {map.recipientPhone}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>Địa chỉ: {map.address}</Typography>
                                                
                                                {
                                                    map.isDefault === true ? (<Box sx={{ border: 'solid 2px #ef6a41', maxWidth: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
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
                                                <Button onClick={() => {handleResetAddress(index)}} disabled={map.isDefault === true} variant='contained' sx={{ textTransform: 'none' }}>Thiết lập mặc định</Button>
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
                onClose={handleCloseUpdateAddress}  handleUpdate={updateAddress} />
            
        </>
    )
}

export default Address;