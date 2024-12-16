import { Box, Typography } from '@mui/material'
import React from 'react'
import AboutImage from '../../assets/lienhe.png'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VerifiedIcon from '@mui/icons-material/Verified'
import PlaceIcon from '@mui/icons-material/Place'
import { blue, red } from '@mui/material/colors'

function About() {
    return (
        <Box
            sx={{
                mt: 14,
                width: '100%',
                height: 'auto'
            }}
        >

            <Box sx={{
                textAlign: 'center',
                width: { xs: '100%', sm: '80%', md: '70%', lg: '1024px', xl: '1024px' },
                // maxWidth: '1240px',
                padding: '0 16px 20px',
                position: 'relative',
                left: '50%',
                transform: 'TranslateX(-50%)',
            }}>
                <Typography variant='h4' sx={{ padding: '24px 0 24px' }}><b>Giới thiệu về Bet Shob</b></Typography>
                <Box sx={{
                    width: '100%',
                    height: '526px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        width: '49%',
                        height: '100%',
                        border: '1px solid #ccc',
                        
                        padding: "4px 10px",
                        borderRadius: "12px",
                    }}>

                        <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>Chào mừng bạn đến với <b>Bet Shob</b>, một hệ thống thương mại điện tử chuyên cung cấp sản phẩm cho thú cưng tại Việt Nam. Được thành lập vào năm 2003.</Typography>

                        <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>Trải qua nhiều năm phát triển, chúng tôi đã mở rộng quy mô và xây dựng một hệ thống thương mại điện tử uy tín, cung cấp hàng nghìn sản phẩm đa dạng từ thức ăn dinh dưỡng, đồ chơi, đến các sản phẩm chăm sóc sức khỏe cho thú cưng. Mỗi sản phẩm tại <b>Bet Shob</b> đều được kiểm tra kỹ lưỡng, chọn lọc từ các thương hiệu uy tín trong và ngoài nước, đảm bảo an toàn và hiệu quả cao nhất.</Typography>

                        <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>Với đội ngũ nhân viên nhiệt huyết và giàu kinh nghiệm, <b>Bet Shob</b> cam kết sẽ luôn là người bạn đồng hành tin cậy, mang lại cho thú cưng của bạn cuộc sống khỏe mạnh và hạnh phúc. Chúng tôi hy vọng được tiếp tục phục vụ và phát triển mối quan hệ bền vững với tất cả khách hàng trong suốt hành trình chăm sóc thú cưng yêu thương.</Typography>

                        <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>Cảm ơn bạn đã tin tưởng lựa chọn <b>Bet Shob</b>!</Typography>

                    </Box>
                    <Box
                        sx={{
                            width: '49%',
                            height: '100%',
                            border: '1px solid #ccc',
                            padding: "12px 4px",
                            borderRadius: "12px",
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={AboutImage}
                            alt="Description of the image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', borderRadius: '12px'}}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.1)'; // Phóng to ảnh khi di chuột vào
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)'; // Trở lại kích thước ban đầu khi rời chuột
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    width: "100%",
                    height: "auto",
                    mt: 4,
                    
                    padding: '20px 10px',
                    border: '2px solid #ccc',
                    borderRadius: '12px'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUpIcon fontSize='large' sx={{ color: blue[500] }}/>
                        <Typography variant='h5' sx={{ textAlign: 'left', ml: 1 }}>Tầm nhìn của <b>Bet Shob</b></Typography>
                    </Box>
                    <hr style={{ marginBottom: '28px' }} />
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>
                        Tại <b>Bet Shob</b>, chúng tôi hướng tới mục tiêu xây dựng một cộng đồng yêu thương và chăm sóc thú cưng khỏe mạnh và hạnh phúc. Tầm nhìn của chúng tôi là trở thành hệ thống thương mại điện tử hàng đầu tại Việt Nam,
                        cung cấp các sản phẩm chất lượng cao, an toàn và phù hợp với nhu cầu của từng loại thú cưng. Chúng tôi mong muốn không chỉ cung cấp các sản phẩm tốt nhất mà còn giúp nâng cao nhận thức về việc chăm sóc thú cưng,
                        đem lại sự thoải mái và niềm vui cho người bạn bốn chân của bạn.
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>
                        Với cam kết mang đến trải nghiệm mua sắm thuận tiện, nhanh chóng và đáng tin cậy, <b>Bet Shob</b> luôn nỗ lực không ngừng để sáng tạo và cải tiến dịch vụ,
                        trở thành người bạn đồng hành tin cậy của mọi gia đình có thú cưng.
                        Hệ thống của chúng tôi sẽ tiếp tục mở rộng và phát triển, mang lại những giải pháp tiện lợi và hiệu quả, giúp chủ nuôi chăm sóc và yêu thương thú cưng một cách tốt nhất.
                    </Typography>
                </Box>

                <Box sx={{
                    width: "100%",
                    height: "auto",
                    mt: 4,
                    
                    padding: '20px 10px',
                    border: '2px solid #ccc',
                    borderRadius: '12px'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VerifiedIcon fontSize='large' color='success'/>
                        <Typography variant='h5' sx={{ textAlign: 'left', ml: 2 }}>Cam kết của <b>Bet Shob</b></Typography>
                    </Box>
                    <hr style={{ marginBottom: '28px' }} />
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>
                        Tại <b>Bet Shob</b>, chúng tôi cam kết cung cấp cho khách hàng những sản phẩm chất lượng nhất và dịch vụ chăm sóc thú cưng tận tâm, chuyên nghiệp.
                        Chúng tôi luôn đảm bảo rằng tất cả các sản phẩm được cung cấp qua nền tảng của chúng tôi đều được lựa chọn kỹ lưỡng từ các thương hiệu uy tín, đảm bảo an toàn và hiệu quả cao nhất cho thú cưng của bạn.
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>
                        Bên cạnh đó, chúng tôi cam kết mang lại một trải nghiệm mua sắm online thuận tiện, nhanh chóng và an toàn.
                        Từ việc lựa chọn sản phẩm đến quá trình thanh toán và giao hàng, <b>Bet Shob</b> luôn nỗ lực không ngừng để hoàn thiện dịch vụ và đảm bảo sự hài lòng tuyệt đối của khách hàng.
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1 }}>
                        Chúng tôi luôn lắng nghe và sẵn sàng hỗ trợ khách hàng mọi lúc, mọi nơi, với đội ngũ nhân viên giàu kinh nghiệm và nhiệt huyết.
                        <b>Bet Shob</b> là người bạn đồng hành đáng tin cậy, giúp bạn chăm sóc và nuôi dưỡng thú cưng của mình với tình yêu và sự chăm sóc tận tâm.
                    </Typography>
                </Box>
                
                <Box sx={{
                    width: "100%",
                    height: "auto",
                    mt: 4,
                    
                    padding: '20px 10px',
                    border: '2px solid #ccc',
                    borderRadius: '12px'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PlaceIcon fontSize='large' sx={{ color: red[500] }}/>
                        <Typography variant='h5' sx={{ textAlign: 'left', ml: 2 }}>Địa chỉ của <b>Bet Shob</b></Typography>
                    </Box>
                    <hr style={{ marginBottom: '28px' }} />
                    <Typography variant='h6' sx={{ textAlign: 'left', ml: 2 }}>TP. Hồ Chí Minh</Typography>
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: "px", ml: 2 }}>
                    <b>Chi nhánh 1:</b> <i>437 Lê Văn Việt, Tăng Nhơn Phú A, Thủ Đức, TP.Hồ Chí Minh</i>
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: 1, ml: 2 }}>
                    <b>Chi nhánh 2:</b>  <i>860 Xô Viết Nghệ Tĩnh, P.25, Quận Bình Thạnh, TP.Hồ Chí Minh</i>
                    </Typography>

                    <Typography variant='h6' sx={{ textAlign: 'left', ml: 2, mt: 2 }}>Bình Dương</Typography>
                    <Typography variant='body1' sx={{ fontSize: '18px', textAlign: 'justify', mt: '2px', ml:2 }}>
                        <b>Chi nhánh:</b> <i>58 Tân Lập, Đông Hòa, Dĩ An, Bình Dương</i>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default About
