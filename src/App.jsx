import { Login } from './modules/auth/pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Dashboard } from './modules/dashboard/pages/Dashboard'
import { Users } from './modules/users/pages/Users'
import { Inventory } from './modules/inventory/pages/Inventory'
import { InventoryHistory } from './modules/inventory/pages/InventoryHistory'
import { Products } from './modules/products/pages/Products'
import { MainLayout } from './layouts/MainLayout'
import { Sales } from './modules/sales/page/Sales'
import { Shopping } from './modules/shopping/page/Shopping'
import { Reports } from './modules/reports/pages/Reports'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PermissionRoute } from './routes/PermissionRoute'
import { GooeyToaster } from 'goey-toast'
import { PERMISSIONS } from './config/permissions'

function App() {
  return (
    <BrowserRouter>
      <GooeyToaster position='top-center' showProgress closeButton='top-right' />

      <Routes>
        <Route path='/' element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />} >
            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_DASHBOARD]} />} >
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>

            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_USERS]} />}>
              <Route path='/users' element={<Users />} />
            </Route>

            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_PRODUCTS]} />}>
              <Route path='/products' element={<Products />} />
            </Route>

            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_INVENTORY]} />}>
              <Route path='/inventory' element={<Inventory />} />
            </Route>
            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_INVENTORY_HISTORY]} />}>
              <Route path='/inventory/history' element={<InventoryHistory />} />
            </Route>

            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_SALES]} />}>
              <Route path='/sales' element={<Sales />} />
            </Route>

            <Route element={<PermissionRoute requiredPermissions={[PERMISSIONS.VIEW_PURCHASES]} />}>
              <Route path='/shopping' element={<Shopping />} />
            </Route>

            <Route
              element={
                <PermissionRoute
                  requiredPermissions={[
                    PERMISSIONS.VIEW_SALES_REPORT,
                    PERMISSIONS.VIEW_PURCHASES_REPORT,
                    PERMISSIONS.VIEW_INVENTORY_REPORT,
                    PERMISSIONS.VIEW_INVENTORY_HISTORY_REPORT
                  ]}
                />
              }
            >
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
