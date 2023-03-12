import { ReactElement } from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

interface SideBarIconProps {
    icon: ReactElement;
    text?: string;
  }
  
const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg">
                    
        <SideBarIcon icon={<img src='https://images.pexels.com/photos/9582359/pexels-photo-9582359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className='h-12 w-12 rounded-full  hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg '/>} />
        <Divider />
        <SideBarIcon icon={<BsPlus size="32" />} />
       
       <div className="fixed  w-16 bottom-0">
        <Divider />
       <SideBarIcon icon={<BsGearFill size="22" />} />
       </div>
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' } : SideBarIconProps) => (
  <div className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-400 hover: bg-green-600 dark:bg-gray-800 text-green-500 hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group">
    {icon}
    <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    text-white bg-gray-900 
    text-xs font-bold 
    transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
  </div>
);


const Divider = () => <hr className=" bg-gray-200 dark:bg-gray-800 
border border-gray-200 dark:border-gray-800 rounded-full
" />;

export default SideBar;