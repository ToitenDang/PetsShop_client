import Box from "@mui/material/Box"
import Header from "./Header/Header"

function DefaultLayout({ children }) {
    return (
        <Box>
            <Header />
            {children}
        </Box>
    )
}

export default DefaultLayout;