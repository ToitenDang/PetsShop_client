import { Box, Typography, Button, CircularProgress, Divider } from "@mui/material"
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useEffect, useRef, useState, memo } from "react";
import { useAuth } from "~/components/Authentication/Authentication";
import { OrderFetch } from "~/REST-API-client";
import { BookingFetch } from "~/REST-API-client";
import FilterListIcon from '@mui/icons-material/FilterList';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function valueFormatter(value) {
    return `${value}đơn`;
}

const chartSetting = {
    yAxis: [
        {
            label: 'Số đơn',
        },
    ],
    width: 700,
    height: 450,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            // transform: 'translate(-20px, 0)',
        },
    },
};

const MyChartOrder = memo(ChartOrder);
const MyChartBooking = memo(ChartBooking)
const Activity = () => {
    const [orders, setOrders] = useState(null);
    const auth = useAuth();
    const originalOrders = useRef(null);
    const [yearList, setYearList] = useState("");
    const [yearTK, setYearTK] = useState("");
    const [bookings, setBookings] = useState(null);

    const fetchDataOrder = () => {

        let condition;
        let year = new Date().getFullYear();
        if (yearList !== "") {
            year = parseInt(yearList); // Hoặc lấy từ đầu vào người dùng


        }
        condition = {
            year: year
        }
        setYearTK(parseInt(year));
        OrderFetch.getOrderByUserId(auth.user._id, condition, undefined)
            .then((data) => {
                // console.log(`orders: ${userId}`, data);
                if (orders === null) {
                    originalOrders.current = data.data;
                }
                console.log("data get: ", data);
                setOrders(data.data);
            })
            .catch(err => {
                toast.error(`Lỗi lấy dữ liệu đơn hàng`);
                console.log(`Lỗi lấy dữ liệu đơn hàng: \n ${err}`)
            })
    }
    const fetchDataBookings = () => {
        let condition;
        let year = new Date().getFullYear();
        if (yearList !== "") {
            year = parseInt(yearList); // Hoặc lấy từ đầu vào người dùng


        }
        condition = {
            year: year
        }
        setYearTK(parseInt(year));
        BookingFetch.getAll(auth.user._id, condition, undefined, undefined, undefined, undefined)
            .then(data => {

                setBookings(data.data);
            })
            .catch(err => {
                toast.error(`Lỗi lấy dữ liệu lịch đặt \n${err}`);
            })
    }
    useEffect(() => {
        fetchDataOrder();
        fetchDataBookings();
    }, [])

    const handleFindYearList = () => {
        const isPositiveInteger = (yearList) => /^[1-9]\d*$/.test(yearList);
        if(yearList !== '' && !isPositiveInteger(yearList))  {
            toast.error("Dữ liệu năm chưa hợp lệ!");
            return
        }
        fetchDataOrder();
        fetchDataBookings();
    }
    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Hoạt động mua hàng của bạn</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Năm: <span style={{color: "#de5945"}}>{yearTK}</span></Typography>
            </Box>

            <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>Lọc theo năm: </Typography>
                <input value={yearList} onChange={(e) => setYearList(e.target.value)} placeholder="Ex: 2024" type="text" style={{ height: "30px" }} />
                <Button onClick={handleFindYearList} variant="contained"><FilterListIcon /></Button>
            </Box>

            <Box sx={{ marginTop: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Đơn hàng đã mua</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    {
                        orders ?
                            (
                                <Box >
                                    <MyChartOrder orders={orders} year={yearTK} />
                                </Box>
                            ) :
                            (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <CircularProgress />
                                </Box>
                            )
                    }
                </Box>
            </Box>

            <Box sx={{ marginTop: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Dịch vụ đã đặt</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    {
                        bookings ?
                            (
                                <Box >
                                    <MyChartBooking orders={bookings} year={yearTK} />
                                </Box>
                            ) :
                            (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <CircularProgress />
                                </Box>
                            )
                    }
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

function ChartOrder({ orders, year }) {
    console.log("re-render order chart")
    const changeToBarData = (orders, year) => {
        if (year === "") {
            year = new Date().getFullYear();
        }

        // Tạo object tóm tắt theo tháng và trạng thái
        const summary = {};

        // Duyệt qua danh sách đơn hàng và nhóm dữ liệu
        orders.forEach((order) => {
            const date = new Date(order.orderDate);
            const month = date.getMonth(); // Lấy tháng (0-11)
            const orderYear = date.getFullYear();
            const status = order.status;

            // Chỉ xử lý đơn hàng thuộc năm được chọn
            if (orderYear === year) {
                if (!summary[month]) {
                    summary[month] = {};
                }

                // Đếm số lượng trạng thái
                if (!summary[month][status]) {
                    summary[month][status] = 0;
                }
                summary[month][status] += 1;
            }
        });

        // Khởi tạo dữ liệu kết quả với 12 tháng
        const prevData = [
            { month: 'Jan' }, { month: 'Feb' }, { month: 'Mar' }, { month: 'Apr' },
            { month: 'May' }, { month: 'June' }, { month: 'July' }, { month: 'Aug' },
            { month: 'Sept' }, { month: 'Oct' }, { month: 'Nov' }, { month: 'Dec' }
        ];

        // Chuyển dữ liệu từ `summary` vào `prevData`
        prevData.forEach((item, index) => {
            const monthSummary = summary[index] || {};
            Object.keys(monthSummary).forEach((status) => {
                item[status] = monthSummary[status];
            });

            // Đảm bảo mọi trạng thái đều là số hoặc `0`
            ['tc', 'hbb', 'hbs'].forEach((status) => {
                if (!item[status]) {
                    item[status] = 0; // Gán 0 nếu không có đơn hàng
                }
            });
        });

        return prevData;
    }
    const countOrderByType = (myOrders, type) => {
        if (type === "all") {
            return myOrders.reduce((acu, curr) => {
                return acu += 1
            }, 0)
        } else {
            return myOrders.reduce((acu, curr) => {
                if (curr.status === type) {
                    return acu += 1
                }
                return acu
            }, 0)
        }
    }
    return (
        <>
            {
                orders ?
                    (
                        <>
                            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", marginTop: "20px" }}>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Tổng đơn đặt</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "all")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đơn đã nhận</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "tc")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đơn đang giao</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "dg")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đơn chờ xử lý</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "dxl")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Hủy bởi bạn</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "hbb")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Hủy bởi shop</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "hbs")}</span> đơn</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ maxHeight: "500px", overflowY: "auto", display: "flex", justifyContent: "center" }}>

                                <BarChart
                                    dataset={year === "" ? changeToBarData(orders, new Date().getFullYear()) : changeToBarData(orders, parseInt(year))}
                                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                                    series={[
                                        { dataKey: 'tc', label: 'Hoàn thành', valueFormatter },
                                        { dataKey: 'hbs', label: 'Hủy bởi shop', valueFormatter },
                                        { dataKey: 'hbb', label: 'Hủy bởi bạn', valueFormatter },
                                    ]}
                                    {...chartSetting}
                                />
                            </Box>
                        </>

                    ) :
                    (
                        null
                    )
            }
        </>
    )
}

function ChartBooking({ orders, year }) {
    console.log("re-render booking chart")
    const changeToBarData = (orders, year) => {
        if (year === "") {
            year = new Date().getFullYear();
        }

        // Tạo object tóm tắt theo tháng và trạng thái
        const summary = {};

        // Duyệt qua danh sách đơn hàng và tính toán
        orders.forEach((order) => {
            const date = new Date(order.bookingDate);
            const month = date.getMonth(); // Lấy tháng (0-11)
            const orderYear = date.getFullYear();
            const status = order.status;

            // Chỉ xử lý đơn hàng thuộc năm được chọn
            if (orderYear === year) {
                if (!summary[month]) {
                    summary[month] = {};
                }

                // Đếm số lượng trạng thái
                if (!summary[month][status]) {
                    summary[month][status] = 0;
                }
                summary[month][status] += 1;
            }
        });

        // Khởi tạo dữ liệu kết quả với 12 tháng
        const prevData = [
            { month: 'Jan' }, { month: 'Feb' }, { month: 'Mar' }, { month: 'Apr' },
            { month: 'May' }, { month: 'June' }, { month: 'July' }, { month: 'Aug' },
            { month: 'Sept' }, { month: 'Oct' }, { month: 'Nov' }, { month: 'Dec' }
        ];

        // Đưa dữ liệu từ `summary` vào `prevData`
        prevData.forEach((item, index) => {
            const monthSummary = summary[index] || {};
            Object.keys(monthSummary).forEach((status) => {
                item[status] = monthSummary[status];
            });

            // Đảm bảo mọi trạng thái đều là số hoặc `null`
            ['hoan-thanh', 'da-huy'].forEach((status) => {
                if (!item[status]) {
                    item[status] = 0; // Gán 0 nếu không có đơn hàng
                }
            });
        });

        return prevData;
    }
    const countOrderByType = (myOrders, type) => {
        if (type === "all") {
            return myOrders.reduce((acu, curr) => {
                return acu += 1
            }, 0)
        } else {
            return myOrders.reduce((acu, curr) => {
                if (curr.status === type) {
                    return acu += 1
                }
                return acu
            }, 0)
        }
    }
    return (
        <>
            {
                orders ?
                    (
                        <>
                            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", marginTop: "20px", gap:2}}>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Tổng đơn đặt</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "all")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đơn hoàn thành</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "hoan-thanh")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đơn chờ xử lý</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "dang-xac-nhan")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đã xác nhận</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "da-xac-nhan")}</span> đơn</Typography>
                                </Box>
                                <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", padding: "20px", marginY: "5px" }}>
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>Đã hủy</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}><span style={{ color: "#de5945" }}>{countOrderByType(orders, "da-huy")}</span> đơn</Typography>
                                </Box>
                               
                            </Box>
                            <Box sx={{ maxHeight: "500px", overflowY: "auto", display: "flex", justifyContent: "center" }}>
                                <BarChart
                                    dataset={year === "" ? changeToBarData(orders, new Date().getFullYear()) : changeToBarData(orders, parseInt(year))}
                                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                                    series={[
                                        { dataKey: 'hoan-thanh', label: 'Hoàn thành', valueFormatter },
                                        { dataKey: 'da-huy', label: 'Đã hủy', valueFormatter },
                                    ]}
                                    {...chartSetting}
                                />
                        
                            </Box>
                        </>
                    ) :
                    (
                        null
                    )
            }
        </>
    )
}

export default Activity