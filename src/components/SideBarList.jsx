import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupOffIcon from '@mui/icons-material/GroupOff';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';

function SideBarList({ active }) {
    const [ onLink, setOnLink ] = useState(1)
    return (
        <li className='mt-5 flex flex-col gap-3'>
            <ul >
                <Link to={"/"} className={`flex items-center ${onLink == 1? 'text-blue-700' : 'text-black'} gap-2 py-2`} onClick={() => setOnLink(1)}>
                    <DashboardIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Dashboard</p>
                </Link>
            </ul>

            <ul >
                <Link to={"/karyawan"} className={`flex items-center ${onLink == 2? 'text-blue-700' : 'text-black'} gap-2 py-2`} onClick={() => setOnLink(2)}>
                    <PeopleAltIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Karyawan</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/riwayat"} className={`flex items-center ${onLink == 3? 'text-blue-700' : 'text-black'} gap-2 py-2`} onClick={() => setOnLink(3)}>
                    <GroupOffIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Riwayat Karyawan</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/org-struktur"} className={`flex items-center ${onLink == 4? 'text-blue-700' : 'text-black'} gap-2 py-2`} onClick={() => setOnLink(4)}>
                    <AccountTreeIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Org Struktur</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/absensi"} className={`flex items-center ${onLink == 5? 'text-blue-700' : 'text-black'} gap-2 py-2`} onClick={() => setOnLink(5)}>
                    <CalendarMonthIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Absensi</p>

                </Link>
            </ul>

            <ul >
                <Link to={"/payroll"} className={`flex items-center ${onLink == 6? 'text-blue-700' : 'text-black'} gap-2 py-2`} onClick={() => setOnLink(6)}>
                    <PaymentsIcon sx={{ fontSize: 18 }} />
                    <p className={`${active ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap`}>Payroll</p>

                </Link>
            </ul>
        </li>
    )
}

export default SideBarList