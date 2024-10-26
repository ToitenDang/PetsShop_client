
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import Production from '../pages/Production/Production'
import Contact from '../pages/Contact/Contact'
import Product from '../pages/Product/Product'
import Payment from '../pages/Payment/Payment'

// routes cho những trang không cần đăng nhập vẫn vào được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/production', component: Production },
    { path: '/contact', component: Contact },
    { path: '/product', component: Product },
    { path: '/payment', component: Payment, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null }
]

// routes đăng nhập mới vào được
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }