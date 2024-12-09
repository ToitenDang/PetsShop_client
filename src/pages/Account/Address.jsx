import { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useAuth } from '~/components/Authentication/Authentication';
import { UserFetch } from '~/REST-API-client';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const strongText = {
    fontWeight:"bold",
    color: ""
}

const DialogDeltailAddress = ({ onClose, open, data = null, index = null }) => {
    const auth = useAuth();
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    useEffect(() => {
        if (open === true && data !== null) {
            setPhone(data.recipientPhone); setName(data.recipientName); setAddress(data.address); setNote(data.note);
        }
    }, [open])
    const handleClose = () => {
        onClose();
        if (data === null) {
            setPhone(""); setAddress(""); setName(""); setNote("");
        }
    };
    const handleConfirm = () => {
        const phoneRegex = /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Số điện thoại không đúng định dạng!");
            return; 
        }
        if (data === null) {
            if (phone !== "" && name !== "" && address !== "") {
                const newAddress = [...auth.user.shippingAddress, {
                    recipientName: name,
                    recipientPhone: phone,
                    address,
                    note,
                    isDefault: false
                }];
                UserFetch.updateShippingAddress(auth?.user?._id, newAddress)
                    .then((data) => {
                        console.log("new user: ", data.data.user)
                        auth.authenUser(data.data.user);
                        handleClose();
                    }).catch(err => {
                        toast.error(`Cập nhật địa chỉ thất bại`);
                        console.log("error: ", err)
                    })
            } else {
                window.alert("Bạn không để trống thông tin")
            }
        } else {
            if (phone !== "" && name !== "" && address !== "") {
                const newAddress = [...auth.user.shippingAddress];
                newAddress[index] = {
                    recipientName: name,
                    recipientPhone: phone,
                    address,
                    note,
                    isDefault: auth.user.shippingAddress[index].isDefault
                }
                UserFetch.updateShippingAddress(auth?.user?._id, newAddress)
                    .then((data) => {
                 
                        // console.log("new user: ", data.data.user)
                        auth.authenUser(data.data.user);
                        handleClose();
                    }).catch(err => {
                        toast.error(`Cập nhật địa chỉ thất bại`);
                        console.log("error: ", err)
                    })
            } else {
                window.alert("Bạn không để trống thông tin")
            }
        }
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ padding: '20px', minWidth: '420px' }}>
                {
                    data == null ? <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>Thêm địa chỉ mới</DialogTitle> :
                        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>Cập nhật địa chỉ</DialogTitle>
                }
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} label="Họ và tên nhận" variant="standard" />
                        <TextField value={phone} onChange={(e) => setPhone(e.target.value)} label="Số điện thoại nhận" variant="standard" />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <TextField sx={{ width: '100%' }} value={address} onChange={(e) => setAddress(e.target.value)} label="Địa chỉ" variant="standard" />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={{ width: '100%' }} label="Ghi chú" variant="standard" />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: '10px' }}>
                    <Button onClick={onClose}>Trở lại</Button>
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
    const idAddressSelected = useRef();

    useEffect(() => {
        setAddressData(auth?.user?.shippingAddress);
    }, [auth?.user])
    const handleClickOpenNewAddress = () => {
        setOpenNewAddress(true);
    };

    const handleCloseNewAddress = () => {
        setOpenNewAddress(false);
    };
    const handleClickOpenUpdateAddress = (index) => {
        setOpenUpdateAddress(true);
        idAddressSelected.current = index
    };

    const handleCloseUpdateAddress = () => {
        setOpenUpdateAddress(false);
    };


    const handleResetAddress = (index) => {
        // const coppyAddress = [...auth.user.shippingAddress];
        const coppyAddress = addressData?.map((data, idx) => {
            data.isDefault = false
            if (idx === index) { data.isDefault = true }
            return data
        })
        UserFetch.updateShippingAddress(auth?.user?._id, coppyAddress)
            .then((data) => {
                // console.log("get new: ", data);
                auth.authenUser(data.data.user);
            })
            .catch((err) => {
                toast.error(`Cập nhật địa chỉ thất bại`);
                console.log(`Cập nhật địa chỉ thất bại: \n ${err}`)
            })
    }
    const handleRemoveAddress = (index) => {
        if(auth.user.shippingAddress.length > 1) {
            const newAddress = [...auth.user.shippingAddress];
            const deleted = newAddress.splice(index,1);
            // console.log("deleted: ", deleted);
            if(deleted[0].isDefault === true) {
                // console.log("reseted default address");
                newAddress[0].isDefault = true;
                
            }
            // console.log("new addresses: ", newAddress)
            UserFetch.updateShippingAddress(auth?.user?._id, newAddress)
                .then((data) => {
                    // console.log("get new: ", data);
                    auth.authenUser(data.data.user);
                })
                .catch((err) => {
                    toast.error(`Cập nhật địa chỉ thất bại`);
                    console.log(`Cập nhật địa chỉ thất bại: \n ${err}`)
                })
        } else {
            window.alert(`Bạn không thể xóa hết địa chỉ giao hàng`);
        }
    }
    // console.log(idAddressSelected.current);
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
                                        <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography><span style={strongText}>Người nhận:</span> {map.recipientName}</Typography>
                                                <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                                                <Typography><span style={strongText}>SĐT:</span> {map.recipientPhone}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography><span style={strongText}></span>Địa chỉ: {map.address}</Typography>
                                                <Typography><span style={strongText}>Ghi chú: </span>{map.note || "Không có"}</Typography>
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
                                                <Button onClick={() => {
                                                    handleRemoveAddress(index)
                                                }} sx={{ textTransform: 'none' }}>Xóa</Button>
                                            </Box>
                                            <Box>
                                                <Button onClick={() => { handleResetAddress(index) }} disabled={map.isDefault === true} variant='contained' sx={{ textTransform: 'none' }}>Thiết lập mặc định</Button>
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
                onClose={handleCloseNewAddress} />
            <DialogDeltailAddress open={openUpdateAddress}
                onClose={handleCloseUpdateAddress}
                data={addressData ? addressData[idAddressSelected.current] : null}
                index={idAddressSelected.current}
            />
            <ToastContainer />
        </>
    )
}

export default Address;