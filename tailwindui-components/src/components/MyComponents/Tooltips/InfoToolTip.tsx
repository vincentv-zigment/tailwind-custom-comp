import React, { ReactNode, useState } from 'react'
import { GoInfo } from 'react-icons/go';

type PostionI = 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-left' | 'bottom-right'

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


const InfoToolTip = ({info, children,position='top-right'}: Props) => {

  const [show, setShow] = useState(false)

  return (
    <>
     
      <div className='flex items-center gap-2 relative inline-block w-fit h-fit'>
        {children}

        <GoInfo 
          className="cursor-pointer right-0 w-4 h-4" 
          onMouseEnter={()=>setShow(true)} 
          onMouseLeave={()=>setShow(false)}  
        />
        {
          show && 
          <p className='min-w-[200px] max-w-[300px] h-fit bg-yellow-100 border absolute py-1.5 px-2  rounded-lg font-normal text-sm  '
            style={styles[position]}
          >{info}  </p>
        }
      </div>
    </>

  )
}

export default InfoToolTip