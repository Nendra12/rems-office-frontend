import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DateButton from './DateButton';

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
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-xl bg-white 
                        hover:border-gray-400 focus-within:border-blue-500 
                        focus-within:ring-2 focus-within:ring-blue-100 transition">

                        <SearchIcon className="text-gray-500 text-xl" />

                        <InputBase
                            sx={{ flex: 1 }}
                            placeholder="Search.."
                            className="text-sm"
                        />
                    </div>
                    <DateButton />
                    <button
                        className="hidden md:flex items-center justify-center
                                    w-9 h-9 border border-gray-300 rounded-xl
                                    text-gray-600 hover:text-gray-900
                                    hover:bg-gray-100 hover:border-gray-400
                                    transition-all cursor-pointer"
                    >
                        <SettingsIcon fontSize="small" />
                    </button>
                    <button className='hidden md:flex border border-red-600 hover:bg-red-700 bg-red-600 text-white gap-1.5 items-center px-2 py-1 rounded-xl cursor-pointer group'>
                        <LogoutIcon />
                        <span className='text-sm'>Logout</span>
                    </button>
                    <div className='flex md:hidden items-center gap-3'>
                        <span className={`max-w-50 opacity-100 translate-x-0 text-[13px] transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap`}>
                            <h1 className='text-sm font-bold'>Ahmad Hadi Nuryani</h1>
                            <p className='text-[10px] justify-end flex'>HRD</p>
                        </span>
                        <img src="https://i.pinimg.com/736x/e7/88/8a/e7888a709184ccfe12cebf4803f591ef.jpg" alt="" className={`w-8 rounded-full transition-all ease-in-out duration-300`} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar