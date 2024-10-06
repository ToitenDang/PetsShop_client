import Box from "@mui/material/Box"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

function DefaultLayout({ children }) {
    return (
        <Box>
            <Header />
            <Box>
                <Sidebar />
                <Box>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default DefaultLayout;