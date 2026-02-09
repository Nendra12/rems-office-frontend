import SideBarList from './SidebarList'
import MenuIcon from '@mui/icons-material/Menu';



function SideBar({ menu, setMenu }) {

  return (
    <aside className={`relative hidden lg:block shadow-md rounded-xl bg-white p-3 ${menu ? 'w-[4%]' : 'w-[20%]'} transition-all duration-300 ease-in-out`} style={{ height: 'calc(100vh - 100px)' }}>
      <button className='cursor-pointer' onClick={() => setMenu(prev => !prev)}>
        <MenuIcon />
      </button>
      <SideBarList active={menu} />
      <div className='flex items-center gap-3 absolute bottom-5'>
        <img src="https://i.pinimg.com/736x/e7/88/8a/e7888a709184ccfe12cebf4803f591ef.jpg" alt="" className={`${menu ? 'w-7' : 'w-10'} rounded-full transition-all ease-in-out duration-300`} />
        <span className={`${menu ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-50 opacity-100 translate-x-0'} text-[13px] transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap`}>
          <h1 className='text-sm font-bold'>Ahmad Hadi Nuryani</h1>
          <p className='text-[10px]'>HRD</p>
        </span>
      </div>
    </aside>
  )
}

export default SideBar