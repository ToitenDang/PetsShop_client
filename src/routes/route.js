
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Production from '../pages/Production/Production'

// routes cho những trang không cần đăng nhập vẫn vào được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/production', component: Production },
    { path: '/login', component: Login, layout: null }
]

// routes đăng nhập mới vào được
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }