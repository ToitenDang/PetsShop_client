import myStyle from './Service.module.scss';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const Service = () => {
    return (
        <Box sx={{ marginTop: "150px" }}>
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Dịch vụ cắt tỉa lông chó mèo tại Bet shob</Typography>
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
                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                                <img className={myStyle.imageStyle} src='https://www.petmart.vn/wp-content/uploads/2023/09/grooming1.jpg' />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Cam kết với khách hàng - Lưu ý phần này khi dùng vòng lặp với dữ liệu từ db */}
                <Box sx={{ paddingX: "20px" }}>
                    <Box sx={{border: "solid 1.5px #dbdbdb", padding: "10px"}}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>👍 3 ĐIỀU LUÔN CAM KẾT VỚI KHÁCH HÀNG</Typography>
                        <Box sx={{ display: 'flex', flexWrap: "wrap" }}>
                            <Box className={myStyle.commitCol}>
                                <Box sx={{maxWidth:"100%", backgroundColor:"#00205b", color:"#fff", padding:"10px", borderRadius:"8px", display:"flex", flexDirection:'column', alignItems:"center"}}>
                                    <Typography sx={{fontWeight:"bold", fontSize:"1.2rem"}}>❣️ HẾT MÌNH VÌ CÔNG VIỆC</Typography>
                                    <Typography sx={{marginTop:"8px"}}>Chúng tôi làm việc hết mình với chữ tâm, trách nhiệm và lòng yêu mến nghề. Thú cưng khỏe mạnh là niềm hạnh phúc của chúng tôi.</Typography>
                                </Box>
                            </Box>
                            <Box className={myStyle.commitCol}>
                                <Box sx={{maxWidth:"100%", backgroundColor:"#00205b", color:"#fff", padding:"10px", borderRadius:"8px", display:"flex", flexDirection:'column', alignItems:"center"}}>
                                    <Typography sx={{fontWeight:"bold", fontSize:"1.2rem"}}>✅ GIÁ DỊCH VỤ RẺ NHẤT</Typography>
                                    <Typography sx={{marginTop:"8px"}}>Chúng tôi cam kết đưa ra mức giá ưu đãi nhất trên thị trường để tất cả thú cưng đều có cơ hội được trải nghiệm dịch vụ của chúng tôi.</Typography>
                                </Box>
                            </Box>
                            <Box className={myStyle.commitCol}>
                                <Box sx={{maxWidth:"100%", backgroundColor:"#00205b", color:"#fff", padding:"10px", borderRadius:"8px", display:"flex", flexDirection:'column', alignItems:"center"}}>
                                    <Typography sx={{fontWeight:"bold", fontSize:"1.2rem"}}>🥇 CHẤT LƯỢNG HÀNG ĐẦU</Typography>
                                    <Typography sx={{marginTop:"8px"}}>Chúng tôi không ngừng nâng cao phát triển trình độ kỹ năng của nhân sự để phục vụ thú cưng đem đến kết quả tốt nhất cho công việc.</Typography>
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
                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
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
                            <Box sx={{ border: "solid 1.5px #828282", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px" }}>
                                <img className={myStyle.imageStyle} src='https://www.petmart.vn/wp-content/uploads/2023/09/grooming1.jpg' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Service;