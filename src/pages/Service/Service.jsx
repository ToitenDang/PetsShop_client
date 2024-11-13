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

import Appointment from './Appointment';

function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
}

const rows = [
    createData('1', 30, 200000, "/Lượt"),
    createData('2', 20, 150000, "/Lượt"),
    createData('3', 10, 100000, "/Lượt"),
    createData('4', 5, 80000, "/Lượt"),
    createData('5', 2, 50000, "/Lượt"),
];

const Service = () => {
    console.log("re-render")

    return (
        <Box sx={{ marginTop: "150px" }}>
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Dịch vụ cắt tỉa lông chó mèo tại Bet shob</Typography>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: 1 }}>
                <Typography variant='h6'>Nếu bạn đã rõ về dịch vụ và lưu ý, bạn có thể đặt lịch nhanh</Typography>
                <a style={{ fontSize: '1rem', fontWeight: "bold" }} href='#datlich'>Tại đây</a>
            </Box>
            {/* List descriptions */}
            <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: "column", gap: 2 }}>
                {/* description item 1*/}
                <Box sx={{ paddingX: "20px" }}>
                    {/* Description content part */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Box className={myStyle.descriptionCol} >
                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                                {/* Header description */}
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>🐶😸 Pet Salon hàng đầu cho thú cưng</Typography>
                                <Divider sx={{ marginY: '20px' }} />
                                {/* List contents */}
                                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Bạn đang tìm kiếm địa chỉ cung cấp dịch vụ cắt tỉa lông chó mèo chuyên nghiệp gần đây? Tại Pet Mart, chúng tôi cung cấp đầy đủ tất cả các loại hình dịch vụ chăm sóc và làm đẹp trọn gói tốt nhất dành cho thú cưng.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Chúng tôi tự hào cung cấp dịch vụ và các sản phẩm chăm sóc thú cưng không chứa paraben, phthalates và thuốc nhuộm hóa học.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Cắt lông cho chó mèo là một vấn đề rất quan trọng. Việc đó đảm bảo sự phát triển về sức khỏe, thể chất và tinh thần cho thú cưng của bạn. Những thú cưng không được chăm sóc, cắt tỉa và làm đẹp thường có nguy cơ gặp phải bọ chét, ve rận, ký sinh trùng và các vấn đề về viêm da khác.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Việc sử dụng dịch vụ cắt tỉa lông chó mèo tại Pet Mart định kỳ và thường xuyên sẽ đem lại nhiều lợi ích thiết thực cho vật nuôi của bạn. Hãy lập kế hoạch đưa thú cưng của bạn đến với chúng tôi mỗi tuần nhé.</Typography>
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

                {/* Cam kết với khách hàng - Lưu ý phần này khi dùng vòng lặp với dữ liệu từ db */}
                <Box sx={{ paddingX: "20px" }}>
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
                </Box>

                {/* description item 2*/}
                <Box sx={{ paddingX: "20px" }}>
                    {/* Description content part */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: "row-reverse" }}>
                        <Box className={myStyle.descriptionCol} >
                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                                {/* Header description */}
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>🐶😸 Pet Salon hàng đầu cho thú cưng</Typography>
                                <Divider sx={{ marginY: '20px' }} />
                                {/* List contents */}
                                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Bạn đang tìm kiếm địa chỉ cung cấp dịch vụ cắt tỉa lông chó mèo chuyên nghiệp gần đây? Tại Pet Mart, chúng tôi cung cấp đầy đủ tất cả các loại hình dịch vụ chăm sóc và làm đẹp trọn gói tốt nhất dành cho thú cưng.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Chúng tôi tự hào cung cấp dịch vụ và các sản phẩm chăm sóc thú cưng không chứa paraben, phthalates và thuốc nhuộm hóa học.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Cắt lông cho chó mèo là một vấn đề rất quan trọng. Việc đó đảm bảo sự phát triển về sức khỏe, thể chất và tinh thần cho thú cưng của bạn. Những thú cưng không được chăm sóc, cắt tỉa và làm đẹp thường có nguy cơ gặp phải bọ chét, ve rận, ký sinh trùng và các vấn đề về viêm da khác.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Việc sử dụng dịch vụ cắt tỉa lông chó mèo tại Pet Mart định kỳ và thường xuyên sẽ đem lại nhiều lợi ích thiết thực cho vật nuôi của bạn. Hãy lập kế hoạch đưa thú cưng của bạn đến với chúng tôi mỗi tuần nhé.</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Image part */}
                        <Box className={myStyle.descriptionCol}>
                            <Box className={myStyle.imageContainer}>
                                <img className={myStyle.imageStyle} src='https://www.petmart.vn/wp-content/uploads/2023/09/grooming1.jpg' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* description item 3*/}
                <Box sx={{ paddingX: "20px" }}>
                    {/* Description content part */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Box className={myStyle.descriptionCol} >
                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                                {/* Header description */}
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>🐶😸 Pet Salon hàng đầu cho thú cưng</Typography>
                                <Divider sx={{ marginY: '20px' }} />
                                {/* List contents */}
                                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Bạn đang tìm kiếm địa chỉ cung cấp dịch vụ cắt tỉa lông chó mèo chuyên nghiệp gần đây? Tại Pet Mart, chúng tôi cung cấp đầy đủ tất cả các loại hình dịch vụ chăm sóc và làm đẹp trọn gói tốt nhất dành cho thú cưng.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Chúng tôi tự hào cung cấp dịch vụ và các sản phẩm chăm sóc thú cưng không chứa paraben, phthalates và thuốc nhuộm hóa học.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Cắt lông cho chó mèo là một vấn đề rất quan trọng. Việc đó đảm bảo sự phát triển về sức khỏe, thể chất và tinh thần cho thú cưng của bạn. Những thú cưng không được chăm sóc, cắt tỉa và làm đẹp thường có nguy cơ gặp phải bọ chét, ve rận, ký sinh trùng và các vấn đề về viêm da khác.</Typography>
                                    <Typography sx={{ fontSize: "1.2rem" }}>Việc sử dụng dịch vụ cắt tỉa lông chó mèo tại Pet Mart định kỳ và thường xuyên sẽ đem lại nhiều lợi ích thiết thực cho vật nuôi của bạn. Hãy lập kế hoạch đưa thú cưng của bạn đến với chúng tôi mỗi tuần nhé.</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Image part */}
                        <Box className={myStyle.descriptionCol}>
                            <Box className={myStyle.imageContainer}>
                                <img className={myStyle.imageStyle} src='https://www.petmart.vn/wp-content/uploads/2023/09/grooming1.jpg' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
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
                                <Accordion sx={{ backgroundColor: "#00205b", color: "#fff", border: "solid 1.5px #fff" }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>1. Tiếp nhận tư vấn dịch vụ</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ border: "solid 1.5px #fff" }}>
                                        <Typography>
                                            Giờ làm việc của bộ phận dịch vụ bắt đầu từ 11h sáng hàng ngày. Thú cưng của bạn sẽ được bắt đầu bằng việc:
                                            Nhân viên của chúng tôi kiểm tra sàng lọcnhanh tình trạng sức khỏe để đảm bảo không có vấn đề gì trông hoặc
                                            cảm thấy bất thường.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ backgroundColor: "#00205b", color: "#fff", border: "solid 1.5px #fff" }}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>2. Chải chuốt lông, bấm cắt móng</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ border: "solid 1.5px #fff" }}>
                                        <Typography>
                                            Chúng tôi sẽ bắt đầu những quy trình làm dịch vụ đầu tiên cho thú cưng của bạn. Bao gồm việc chải lông rụng,
                                            gỡ rối lông hoặc cạo lông (theo yêu cầu), cắt dũa và mài móng chân.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
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
                            <Typography sx={{ fontSize: "1.2rem" }}>
                                <span style={{ fontWeight: "bold" }}>1. </span>
                                437 Lê Văn Việt, Tăng Nhơn Phú A, TP.Thủ Đức
                            </Typography>
                            <Typography sx={{ fontSize: "1.2rem" }}>
                                <span style={{ fontWeight: "bold" }}>2. </span>
                                437 Lê Văn Việt, Tăng Nhơn Phú A, TP.Thủ Đức
                            </Typography>
                            <Typography sx={{ fontSize: "1.2rem" }}>
                                <span style={{ fontWeight: "bold" }}>3. </span>
                                437 Lê Văn Việt, Tăng Nhơn Phú A, TP.Thủ Đức
                            </Typography>
                            <Typography sx={{ fontSize: "1.2rem" }}>
                                <span style={{ fontWeight: "bold" }}>4. </span>
                                437 Lê Văn Việt, Tăng Nhơn Phú A, TP.Thủ Đức
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {/* Bang gia */}
                <Box className={myStyle.col50}>
                    <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>💵Bảng giá cắt tỉa</Typography>
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
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ color: "#fff" }} align="center">{row.name}</TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="center">{row.calories}</TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="center">{row.fat}</TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="center">{row.carbs}</TableCell>
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
                                <Appointment />
                            </Box>
                        </Box>
                        {/* Dat qua lien he */}
                        <Box className={myStyle.col50}>
                            <Box sx={{ border: "solid 1.5px #dbdbdb", padding: "10px", height: "100%" }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>📱Liên hệ với chúng tôi để đặt</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ marginY: "40px" }} />

            {/* Đánh giá của khách hàng */}
            <Typography>Đánh giá của khách hàng</Typography>
        </Box>
    )
}

export default Service;