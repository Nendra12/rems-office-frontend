import CloseIcon from '@mui/icons-material/Close';
import SideBarList from './SidebarList';

function SideBarMobile({ sideBar, setSideBar }) {
  return (
    <>
      <div className={`${sideBar ? 'fixed' : 'hidden'} bg-black/50 w-full h-screen z-88`}></div>
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[300px] bg-white z-999 py-3 px-5 shadow-xl
          transition-transform duration-200 ease-in-out
          ${sideBar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='flex items-center justify-between'>
          <div className='items-center flex gap-2'>
            <img src="https://i.pinimg.com/736x/69/c7/9a/69c79a9ab7c89fe9287fc7cbbb9f5ddd.jpg" alt="" className='w-10 rounded-full' />
            <p className='text-xl font-bold'>Rems</p>
          </div>
          <button className='cursor-pointer hover:bg-red-700 p-3 rounded-xl flex justify-center bg-red-600' onClick={() => setSideBar(prev => !prev)}>
            <CloseIcon sx={{ fontSize: 18, textAlign: 'center', color: '#fff' }} />
          </button>
        </div>
        <SideBarList />
      </aside>
    </>
  )
}

export default SideBarMobile