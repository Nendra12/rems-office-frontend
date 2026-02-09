import CloseIcon from '@mui/icons-material/Close';
import SideBarList from './SidebarList';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function SideBarMobile({ sideBar, setSideBar, active }) {
  return (
    <>
      <div className={`${sideBar ? 'fixed' : 'hidden'} bg-black/50 w-full h-screen z-88`}></div>
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[300px] bg-white z-999 py-3 px-5 shadow-xl flex flex-col justify-between
          transition-transform duration-200 ease-in-out
          ${sideBar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          <div className='flex items-center justify-between'>
            <div className='items-center flex gap-2'>
              <img src="https://i.pinimg.com/736x/69/c7/9a/69c79a9ab7c89fe9287fc7cbbb9f5ddd.jpg" alt="" className='w-10 rounded-full' />
              <p className='text-xl font-bold'>Rems</p>
            </div>
            <button className='cursor-pointer hover:bg-red-700 p-3 rounded-xl flex justify-center bg-red-600' onClick={() => setSideBar(prev => !prev)}>
              <CloseIcon sx={{ fontSize: 18, textAlign: 'center', color: '#fff' }} />
            </button>
          </div>
          <div className='mt-5 flex md:hidden items-center border px-2 rounded-xl'>
            <button className='cursor-pointer'>
              <SearchIcon />
            </button>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search.."
            />
          </div>
          <SideBarList active={active} />
        </div>
        <div className='flex items-center gap-3'>
          <button className='flex border justify-center border-red-600 hover:bg-red-700 bg-red-600 text-white gap-1.5 items-center px-2 py-1 rounded-xl cursor-pointer group w-full'>
            <LogoutIcon />
            <span className='text-sm'>Logout</span>
          </button>
          <button
            className="flex items-center justify-center
                                              w-9 h-9 border border-gray-300 rounded-xl
                                              text-gray-600 hover:text-gray-900
                                              hover:bg-gray-100 hover:border-gray-400
                                              transition-all cursor-pointer"
          >
            <SettingsIcon fontSize="small" />
          </button>
        </div>
      </aside>
    </>
  )
}

export default SideBarMobile