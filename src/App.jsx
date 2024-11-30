
import { Routes, useLocation, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home/Home'
import ListProduct from './pages/ListProducts/ListProducts'

import Account from './pages/Account'
import Profile from './pages/Account/Profile'
import Address from './pages/Account/Address'
import Password from './pages/Account/Password'
import Purchase from './pages/Account/Purchase'
import Contact from './pages/Contact/Contact'
import Product from './pages/Product/Product'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import HeaderLayout from './Layout/HeaderLayout'
import NoFound from './pages/NoFound/NoFound'
import Service from './pages/Service/Service'
import Promotion from './pages/Promotion/Promotion'
import { AuthProvider } from './components/Authentication/Authentication'
import Payment from './pages/Payment/Payment'
import VNPayReturn from './pages/Payment/NotyPayments/VNPayReturn'
import ProductSearch from './pages/ProductSearch/ProductSearch'
import Booking from './pages/Account/Booking'
import PurchaseDetail from './pages/PurchaseDetail/PurchaseDetail'
import Activity from './pages/Account/Activity'
function App() {

  return (
    <AuthProvider>
      <Routes>
          <Route path='vnpay_return' element={<VNPayReturn />} />
        <Route path='/' element={<HeaderLayout />}>
          <Route index element={<Home />} />
          <Route path='lien-he' element={<Contact />} />
          <Route path='thanh-toan' element={<Payment />} />
       
          <Route path='product/:id' element={<Product />} />
          <Route path='do-thu-cung' element={<ListProduct />} />
          <Route path='do-thu-cung/:tag' element={<ListProduct />}/>
          <Route path='tai-khoan' element={<Account />}>
            <Route index element={<Navigate to="ho-so" />} />
            <Route path='ho-so' element={<Profile />} />
            <Route path='dia-chi' element={<Address />} />
            <Route path='mat-khau' element={<Password />} />
            <Route path='don-mua' element={<Purchase />} />
            <Route path='lich-dat' element={<Booking />} />
            <Route path='hoat-dong' element={<Activity />}/>
          </Route>
          <Route path='don-hang/:id' element={<PurchaseDetail />}/>
          <Route path='dich-vu/:id' element = {<Service />} />
          <Route path='khuyen-mai/:id' element = {<Promotion />} />
          <Route path='product-search' element={<ProductSearch/>}/>
          <Route path='*' element={<NoFound />} />
        </Route>
        <Route path="dang-ky" element={<Register />} />
        <Route path="dang-nhap" element={<Login />} />
      </Routes>
    </AuthProvider>

  )
}

export default App
