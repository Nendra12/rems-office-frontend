import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar({ setSideBar }) {
    return (
        <nav className='bg-white shadow-md h-15 pt-2 '>
            <div className='flex justify-between items-center mx-5'>
                <div className='items-center gap-2 hidden lg:flex'>
                    <img src="https://i.pinimg.com/736x/69/c7/9a/69c79a9ab7c89fe9287fc7cbbb9f5ddd.jpg" alt="" className='w-10 rounded-full' />
                    <p className='text-xl font-bold'>Rems</p>
                </div>

                <button className='block lg:hidden cursor-pointer' onClick={() => setSideBar(prev => !prev)}>
                    <MenuIcon />
                </button>

                <div className='flex items-center gap-3'>
                    <div className='flex items-center border px-2 rounded-xl'>
                        <button className='cursor-pointer'>
                            <SearchIcon />
                        </button>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search.."
                        />

                    </div>
                    <button className='hidden lg:flex border gap-2 items-center rounded-xl py-1 px-2 cursor-pointer'>
                        <CalendarTodayIcon />
                        <p className='text-sm'>Feb 08, 2026</p>
                    </button>
                    <button className='border border-red-600 hover:bg-red-700 bg-red-600 text-white flex gap-1.5 items-center px-2 py-1 rounded-xl cursor-pointer group'>
                        <LogoutIcon />
                        <span className='text-sm'>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar