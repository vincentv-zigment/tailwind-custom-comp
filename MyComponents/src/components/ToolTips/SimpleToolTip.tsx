import { ReactNode, useState } from 'react'
import { GoInfo } from 'react-icons/go';

type PostionI = 'left' | 'right' | 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-left' | 'bottom-right'  

type Props = {
    info:string,
    children:ReactNode,
    position?:PostionI
}

const styles = {
  top:{
    transform: 'translate(-50%, -100%)', // Center the tooltip horizontally
    left: '50%', // Center the tooltip horizontally
    top: '-10px',
    marginLeft: '50%'
  },
  ['top-right']:{
    transform:'translate(100%, -100%)',
    right:0,
    top:0
  },
  ['top-left']:{
    transform:'translate(-100%, -100%)',
    left:0,
    top:0
  },
  bottom:{
    transform: 'translate(-50%, 100%)', // Center the tooltip horizontally
    left: '50%', // Center the tooltip horizontally
    bottom: '-10px',
    marginLeft: '50%'
  },
  ['bottom-left']:{
    transform:'translate(-100%, 0)',
    left:0,
    top:'20px'
  },
  ['bottom-right']:{
    transform:'translate(100%, 0%)',
    right:0,
    top:'20px'
  },
  ['left']:{
    transform:'translate(-100%, 0%)',
    left:'-10px'
  },
  ['right']:{
    transform:'translate(100%, 0%)',
    right:'-10px',
  }
}


const SimpleToolTip = ({info, children,position='right'}: Props) => {

  const [show, setShow] = useState(false)

  return (
    <>
     
      <div className='flex items-center gap-2 relative inline-block w-fit h-fit'>
        <span 
            className='cursor-pointer'
            onMouseEnter={()=>setShow(true)} 
            onMouseLeave={()=>setShow(false)}
        >
            {children}
        </span>
        <p className={`${show ? 'opacity-100' : 'opacity-0'} min-w-[100px] bg-white max-w-[300px] h-fit bg-white border border-gray-600 absolute py-1.5 px-2  rounded-lg font-normal text-sm transition-all drop-shadow-lg`}
        style={styles[position]}
        >
            {info}  
        </p>
      </div>
    </>

  )
}

export default SimpleToolTip