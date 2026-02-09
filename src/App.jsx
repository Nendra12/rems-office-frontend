import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'

import SideBarMobile from './components/SideBarMobile';
import Dashboard from './pages/Dashboard'
import Karyawan from './pages/Karyawan'
import Absensi from './pages/Absensi'
import Payroll from './pages/Payroll'
import OrgStruktur from './pages/OrgStruktur'
import Roles from './pages/Roles'


function App() {
  const [sideBar, setSideBar] = useState(false)
  const [menu, setMenu] = useState(false)

  return (
    <div className='overflow-hidden h-screen'>
      <SideBarMobile sideBar={sideBar} setSideBar={setSideBar} active={menu} />
      <Navbar setSideBar={setSideBar} />
      <main className='flex mt-5 mx-5 gap-5 '>
        <SideBar menu={menu} setMenu={setMenu} />
        <section className='bg-white rounded-xl shadow-md w-full overflow-y-auto' style={{ height: 'calc(100vh - 100px)' }}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/karyawan' element={<Karyawan />} />
            <Route path='/roles' element={<Roles />} />
            <Route path='/org-struktur' element={<OrgStruktur />} />
            <Route path='/absensi' element={<Absensi />} />
            <Route path='/payroll' element={<Payroll />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default App
