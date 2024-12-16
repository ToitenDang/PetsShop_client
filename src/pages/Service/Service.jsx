import myStyle from './Service.module.scss';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Appointment from './Appointment';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { BookingFetch, ServiceFetch } from '~/REST-API-client';
import { useAuth } from '~/components/Authentication/Authentication';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Review from '~/components/Review/Review';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ChatContext } from '../ChatProvider/ChatProvider';
import { ADMIN_ID } from '~/utils/constants';
const DialogAlert = ({ onClose, data, open }) => {
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            {
                data.isSuccess ? <Alert severity="success">Thành công</Alert> :
                    <Alert severity="error">Thất bại</Alert>
            }
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {data.content}
                </DialogContentText>
            </DialogContent>

        </Dialog>
    )
}

const Service = () => {
    const auth = useAuth();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState();
    const [open, setOpen] = useState(false);
    const [contentDialog, setContentDialog] = useState("");
    const { sendBookingNotify } = useContext(ChatContext);
    useEffect(() => {
        setLoading(true);
        ServiceFetch.getById(id)
            .then(data => {
                setLoading(false);
                setService(data.data);
            })
            .catch(err => {
                console.log(`Lỗi lấy thông tin dịch vụ : ${err}`)
                toast.error(`Lỗi lấy thông tin dịch vụ`);
            })
    }, [id]);
    const handleClose = () => {
        setOpen(false);

    };
    if (loading) {
        return (
            <Box sx={{ marginTop: "150px", display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        )
    }
    const handleChangeValueSubmit = (dataBooking) => {
        const data = {
            ...dataBooking,
            userId: auth?.user._id,
            serviceId: id
        }
        BookingFetch.createNew(data)
            .then(getedData => {
                setContentDialog({
                    isSuccess: true,
                    content: "Cảm ơn bạn đã đăng ký lịch dịch vụ của chúng tôi. Đơn của bạn đang được xác nhận, hãy chú ý thông báo nhé"
                })
                setOpen(true);
                // console.log("booking getted: ", getedData);
                sendBookingNotify({
                    senderId: auth?.user._id,
                    receiverId: ADMIN_ID,
                    targetId: getedData.data._id,
                    type: "booking",
                    text: `Cần xác nhận đơn hàng dịch vụ`
                })
            })
            .catch(err => {
                setContentDialog({
                    isSuccess: false,
                    content: `Xin lỗi, đã có sự cố, không thể đăng ký lịch\n${err}`
                })
                setOpen(true)
            });;
    }
    return (
        <Box sx={{ marginTop: "150px" }}>
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>Dịch vụ {service?.name}</Typography>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: 1 }}>
                <Typography variant='h6'>Nếu bạn đã rõ về dịch vụ và lưu ý, bạn có thể đặt lịch nhanh</Typography>
                <a style={{ fontSize: '1rem', fontWeight: "bold" }} href='#datlich'>Tại đây</a>
            </Box>
            {/* List descriptions */}
            <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: "column", gap: 2 }}>
                {
                    service?.description?.map((des, index) => {
                        return (
                            <Box key={index}>
                                <Box sx={{ paddingX: "20px" }}>
                                    {/* Description content part */}
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}>
                                        <Box className={myStyle.descriptionCol} >
                                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                                                {/* Header description */}
                                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>{des.heading}</Typography>
                                                <Divider sx={{ marginY: '20px' }} />
                                                {/* List contents */}
                                                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                                                    {
                                                        des?.content?.map((subContent, idx) => {
                                                            return (
                                                                <Typography key={idx} sx={{ fontSize: "1.2rem" }}>{subContent}</Typography>
                                                            )
                                                        })
                                                    }

                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* Image part */}
                                        <Box className={myStyle.descriptionCol}>
                                            <Box className={myStyle.imageContainer} >
                                                <img className={myStyle.imageStyle} src='https://www.petmart.vn/wp-content/uploads/2023/09/grooming1.jpg' />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                {
                                    index === 0 ?
                                        (<Box sx={{ marginY: "10px", paddingX: "20px" }}>
                                            <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px" }}>
                                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>👍 3 ĐIỀU LUÔN CAM KẾT VỚI KHÁCH HÀNG</Typography>
                                                <Box sx={{ display: 'flex', flexWrap: "wrap" }}>
                                                    <Box className={myStyle.commitCol}>
                                                        <Box sx={{ height: "100%", maxWidth: "100%", backgroundColor: "#00205b", color: "#fff", padding: "10px", borderRadius: "8px", display: "flex", flexDirection: 'column', alignItems: "center" }}>
                                                            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>❣️ HẾT MÌNH VÌ CÔNG VIỆC</Typography>
                                                            <Typography sx={{ marginTop: "8px" }}>Chúng tôi làm việc hết mình với chữ tâm, trách nhiệm và lòng yêu mến nghề. Thú cưng khỏe mạnh là niềm hạnh phúc của chúng tôi.</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box className={myStyle.commitCol}>
                                                        <Box sx={{ height: "100%", maxWidth: "100%", backgroundColor: "#00205b", color: "#fff", padding: "10px", borderRadius: "8px", display: "flex", flexDirection: 'column', alignItems: "center" }}>
                                                            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>✅ GIÁ DỊCH VỤ RẺ NHẤT</Typography>
                                                            <Typography sx={{ marginTop: "8px" }}>Chúng tôi cam kết đưa ra mức giá ưu đãi nhất trên thị trường để tất cả thú cưng đều có cơ hội được trải nghiệm dịch vụ của chúng tôi.</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box className={myStyle.commitCol}>
                                                        <Box sx={{ height: "100%", maxWidth: "100%", backgroundColor: "#00205b", color: "#fff", padding: "10px", borderRadius: "8px", display: "flex", flexDirection: 'column', alignItems: "center" }}>
                                                            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>🥇 CHẤT LƯỢNG HÀNG ĐẦU</Typography>
                                                            <Typography sx={{ marginTop: "8px" }}>Chúng tôi không ngừng nâng cao phát triển trình độ kỹ năng của nhân sự để phục vụ thú cưng đem đến kết quả tốt nhất cho công việc.</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>) : null
                                }
                            </Box>
                        )
                    })
                }

            </Box>
            {/* Quy trình thực hiện + Trinhf độ nhân viên*/}
            <Box sx={{ padding: "20px", display: "flex", flexWrap: "wrap" }}>
                {/* Quy trình thực hiện */}
                <Box className={myStyle.col50} >
                    <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>♾️QUY TRÌNH THỰC HIỆN</Typography>
                        <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "20px" }}>
                            <Box>
                                {/* Vòng lặp tại đây */}
                                {
                                    service?.procedures?.map((process, index) => {
                                        return (
                                            <Accordion key={index} sx={{ backgroundColor: "#00205b", color: "#fff", border: "solid 1.5px #fff" }}>
                                                <AccordionSummary
                                                    expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>{process?.serial}. {process?.summary}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ border: "solid 1.5px #fff" }}>
                                                    <Typography>
                                                        {process?.detail}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })
                                }

                            </Box>
                        </Box>

                    </Box>
                </Box>
                {/* Trình độ nhân viên */}
                <Box className={myStyle.col50}>
                    <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>🏆 Nhân viên được Bet shob cấp chứng nhận</Typography>
                        <Divider sx={{ marginY: "20px" }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontSize: "1.2rem" }}>Bet Shob nổi bật với chương trình đào tạo nhân viên chuyên nghiệp và toàn diện, đảm bảo rằng đội ngũ của họ luôn
                                được trang bị kiến thức và kỹ năng tốt nhất. Với phương châm "Chất lượng dịch vụ là hàng đầu", Bet Shob không ngừng cải
                                thiện và nâng cao trình độ cho nhân viên, giúp họ đáp ứng được mọi yêu cầu từ phía khách hàng một cách hiệu quả và đáng
                                tin cậy. Nhờ quy trình đào tạo kỹ lưỡng, mỗi nhân viên đều nắm vững các tiêu chuẩn dịch vụ, từ đó mang lại
                                trải nghiệm hài lòng cho khách hàng và củng cố thêm niềm tin vào chất lượng dịch vụ của Bet Shob.
                            </Typography>
                            <Typography sx={{ fontSize: "1.2rem" }}>Nhân viên chăm sóc thú cưng tại Pet Mart không chỉ yêu thích công việc của họ, mà còn được đào tạo theo tiêu chuẩn cao nhất
                                và phải hoàn thành xuất sắc khóa học của chúng tôi để được cấp chứng chỉ làm việc chính thức.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Có mặt tại chi nhánh + Bảng giá */}
            <Box sx={{ padding: "20px", display: "flex", flexWrap: "wrap" }}>
                {/* Co tai chi nhanh */}
                <Box className={myStyle.col50}>
                    <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>🏢Dịch vụ được đáp ứng tại các chi nhánh sau</Typography>
                        <Divider sx={{ marginY: "20px" }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {
                                service?.applicableBranches?.map((branch, index) => {
                                    return (
                                        <Typography key={branch?._id} sx={{ fontSize: "1.2rem" }}>
                                            <span style={{ fontWeight: "bold" }}>- Cơ sở {branch?.nameBranch}: </span>
                                            <br />
                                            &nbsp;* Địa chỉ: {branch?.address}
                                        </Typography>

                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
                {/* Bang gia */}
                <Box className={myStyle.col50}>
                    <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>💵Bảng giá {service?.name}</Typography>
                        <Divider sx={{ marginY: "20px" }} />
                        <Box>
                            <TableContainer component={Paper} sx={{ backgroundColor: "#00205b" }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: "#fff" }} align="center">Số thứ tự</TableCell>
                                            <TableCell sx={{ color: "#fff" }} align="center">Trọng lượng tối đa</TableCell>
                                            <TableCell sx={{ color: "#fff" }} align="center">Giá thành</TableCell>
                                            <TableCell sx={{ color: "#fff" }} align="center">Đơn vị tính giá</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {service?.price?.map((sub, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ color: "#fff" }} align="center">{index + 1}</TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="center">{sub?.maxWeight} kg</TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="center">{sub?.value.toLocaleString('vi-VN')}đ</TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="center">/{sub?.billingUnit}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ marginY: "40px" }} />

            {/* Đặt lịch */}
            <Box id="datlich" >
                <Box >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant='h4' sx={{ fontWeight: "bold" }}>📅Đặt lịch nhanh thôi nào!</Typography>
                    </Box>
                    <Box sx={{ padding: "20px", display: "flex", flexWrap: "wrap" }}>
                        {/* Dat truc tiep */}
                        <Box className={myStyle.col50}>
                            <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>📄Đặt trực tiếp tại đây</Typography>
                                <Divider sx={{ marginY: "10px" }} />
                                <Appointment name={service?.name} user={auth?.user} addresses={service?.applicableBranches} prices={service?.price} onChange={handleChangeValueSubmit} />
                            </Box>
                        </Box>
                        {/* Dat qua lien he */}
                        <Box className={myStyle.col50}>
                            <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>📱Liên hệ với chúng tôi để đặt</Typography>
                                <Box sx={{marginTop:"20px", display:"flex", flexDirection:"column", gap:2}}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2 }}>
                                        <Box sx={{ width: "50px", height: "50px" }}>
                                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png' />
                                        </Box>
                                        <Box>
                                            <Typography sx={{fontWeight:"bold"}}>Liên hệ qua Zalo</Typography>
                                            <Typography sx={{fontWeight:"bold"}}>0928895717</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2 }}>
                                        <Box sx={{ width: "50px", height: "50px" }}>
                                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src='https://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png' />
                                        </Box>
                                        <Box>
                                            <Typography sx={{fontWeight:"bold"}}>Liên hệ qua số điện thoại</Typography>
                                            <Typography sx={{fontWeight:"bold"}}>0928895717</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2 }}>
                                        <Box sx={{ width: "50px", height: "50px" }}>
                                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png' />
                                        </Box>
                                        <Box>
                                            <Typography sx={{fontWeight:"bold"}}>Chúng tôi trên facebook</Typography>
                                            <a href='https://www.facebook.com/profile.php?id=100049653632141' target='_blank' sx={{fontWeight:"bold"}}>Xem tại đây</a>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ marginY: "40px" }} />

            {/* Đánh giá của khách hàng */}
            <Box sx={{ padding: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant='h4' sx={{ fontWeight: "bold" }}>🌟Đánh giá của khách hàng</Typography>
                </Box>

                <Box sx={{ padding: "10px", marginTop: "20px" }}>
                    <Review entityId={id} type="service" />
                </Box>
            </Box>
            <DialogAlert open={open}
                onClose={handleClose} data={contentDialog} />
            <ToastContainer />
        </Box>
    )
}

export default Service;