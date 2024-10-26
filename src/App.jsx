
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home/Home'
import ListProduct from './pages/ListProducts/ListProducts'

import Account from './pages/Account'
import Appbar from './components/Appbar/Appbar'
import Profile from './pages/Account/Profile'
import Address from './pages/Account/Address'
import Password from './pages/Account/Password'
import Purchase from './pages/Account/Purchase'
import DogProducts from './pages/ListProducts/ForDog/DogProducts'
import AllProducts from './pages/ListProducts/AllProducts'
import DogFoods from './pages/ListProducts/ForDog/DogFoods'
import DogHouses from './pages/ListProducts/ForDog/DogHouses'
import DogAccessory from './pages/ListProducts/ForDog/DogAccessory'
import CatProducts from './pages/ListProducts/ForCat/CatProducts'
import CatFoods from './pages/ListProducts/ForCat/CatFoods'
import CatHouses from './pages/ListProducts/ForCat/CatHouses'
import CatAccessory from './pages/ListProducts/ForCat/CatAccesory'
function App() {

  return (
    <>
      <Appbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='do-thu-cung' element={<ListProduct />}>
          <Route index element={<AllProducts />} />
          <Route path='do-cho-cho' element = {<DogProducts />} /> 
          <Route path='thuc-an-cho' element= {<DogFoods />} />
          <Route path='noi-o-cho' element= {<DogHouses />}/>
          <Route path='phu-kien-cho' element = {<DogAccessory />}/>
          <Route path='do-cho-meo' element = {<CatProducts />} /> 
          <Route path='thuc-an-meo' element= {<CatFoods />} />
          <Route path='noi-o-meo' element= {<CatHouses />}/>
          <Route path='phu-kien-meo' element = {<CatAccessory />}/>
        </Route>
        <Route path='tai-khoan' element={<Account />}>
          <Route index element={<Navigate to="ho-so" />} />
          <Route path='ho-so' element={<Profile />} />
          <Route path='dia-chi' element={<Address />} />
          <Route path='mat-khau' element={<Password />} />
          <Route path='don-mua' element={<Purchase />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
