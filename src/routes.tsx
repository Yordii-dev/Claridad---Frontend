import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProveedorView from './views/ProvedorView'

function MyRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>
        <Route path="/proveedor" element={<ProveedorView />}></Route>
        {/*  <Route path="/main" element={<MainView />}>
            <Route index element={<DashboardView />}></Route>
            <Route path="dash" element={<DashboardView />}></Route>
            <Route path="store" element={<StoreView />}>
              <Route index element={<StoreSales />}></Route>
              <Route path="sales" element={<StoreSales />}></Route>
              <Route path="quotes" element={<StoreQuotes />}></Route>
              <Route path="repayments" element={<StoreRepayments />}></Route>
            </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes
