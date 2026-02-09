import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';

function SideBarList({ active }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <li className='mt-5 flex flex-col gap-3'>
            <ul >
                <Link to={"/"} className={`flex items-center ${currentPath === '/' ? 'text-blue-700' : 'text-black'} gap-2 py-2`}>
                    <DashboardIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Dashboard</p>
                </Link>
            </ul>

            <ul >
                <Link to={"/karyawan"} className={`flex items-center ${currentPath === '/karyawan' ? 'text-blue-700' : 'text-black'} gap-2 py-2`}>
                    <PeopleAltIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Karyawan</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/roles"} className={`flex items-center ${currentPath === '/roles' ? 'text-blue-700' : 'text-black'} gap-2 py-2`}>
                    <BadgeIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Role Karyawan</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/org-struktur"} className={`flex items-center ${currentPath === '/org-struktur' ? 'text-blue-700' : 'text-black'} gap-2 py-2`}>
                    <AccountTreeIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Org Struktur</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/absensi"} className={`flex items-center ${currentPath === '/absensi' ? 'text-blue-700' : 'text-black'} gap-2 py-2`}>
                    <CalendarMonthIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Absensi</p>

                </Link>
            </ul>

            {/* <ul >
                <Link to={"/payroll"} className={`flex items-center ${currentPath === '/payroll' ? 'text-blue-700' : 'text-black'} gap-2 py-2`}>
                    <PaymentsIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Payroll</p>

                </Link>
            </ul> */}
        </li>
    )
}

export default SideBarList