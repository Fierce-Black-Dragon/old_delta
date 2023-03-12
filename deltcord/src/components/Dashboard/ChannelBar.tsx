import { useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';
interface DropdownProps {
    selections: Array<string>;
    header?: string;
  }
  interface ChevronIconnProps {
    expanded:boolean;
  }
  interface TopicSelectionProps {
    selection: string;
    // header?: string;
  }
const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];

const ChannelBar = () => {
  return (
    <div className='w-80 h-auto m-0 ml-16 bg-gray-200 dark:bg-gray-800
    overflow-hidden shadow-lg'>
      <ChannelBlock />
      <div className='flex flex-col items-center justify-start 
    p-1 m-0'>
        <Dropdown header='Topics' selections={topics} />
        <Dropdown header='Questions' selections={questions} />
        <Dropdown header='Random' selections={random} />
      </div>
    </div>
  );
};

const Dropdown = ({ header, selections }:DropdownProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='m-0 w-full px-2 pb-2
    transition duration-300 ease-in-out'>
      <div onClick={() => setExpanded(!expanded)} className='lex flex-row items-center justify-evenly
    mx-0 text-gray-500
    cursor-pointer'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'text-blue-500 text-opacity-90 text-lg font-bold' : 'text-gray-500  text-opacity-90  text-lg font-semiboldcursor-default'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
      </div>
      {expanded &&
        selections &&
        selections.map((selection) => <TopicSelection selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }:ChevronIconnProps) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection  }:TopicSelectionProps) => (
  <div className='flex flex-row items-center justify-evenly
  mt-1 mr-auto ml-2
  transition duration-300 ease-in-out
  cursor-pointerdropdown-selection'>
    <BsHash size='24' className='text-gray-400' />
    <h5 className='text-gray-500 font-semibold tracking-wide
    mr-auto 
    transition duration-300 ease-in-out 
    hover:text-pink-500 dark:hover:text-gray-500
    cursor-pointer'>{selection}</h5>
  </div>
);

const ChannelBlock = () => (
  <div className='flex items-center justify-center 
  h-16 
  m-0 p-0'>
    <h5 className='text-lg tracking-wider font-bold 
    text-gray-600 dark:text-gray-400 
    mr-auto ml-4 my-auto align-middle'>Channels</h5>
  </div>
);

export default ChannelBar;