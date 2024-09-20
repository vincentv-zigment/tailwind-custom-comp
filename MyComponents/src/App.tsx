import { useState } from "react"

 

const App = ( ) => {

  const [show, setShow] = useState(false)


  return (
    <div className='w-screen h-screen'>
      {/* <ReactFlowHierarchy/> */}
      <div style={{position:'relative'}}>
        <button className="" onClick={()=>setShow(!show)}>
            Filter
        </button>
        {
          show && 
        <div className="" style={{position:'absolute', left:0, top:'32px', background:'white', width:'200px', border:'1px solid gray', padding:'6px', borderRadius:'4px', }}>
          <div className="" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <label htmlFor="" style={{fontSize:'12px'}}>Sort By Type</label>
            <button onClick={()=>setShow(!show)}>X</button>
          </div>
          <select style={{width:'100%',border:'1px solid black', borderRadius:'4px',marginTop:'10px', padding:'4px', marginRight:'10px', fontSize:'10px' }} value={'pay Code Type'} >
            <option value="pay Code Type">Pay Code Type</option>
            <option value="pay Code Type">Pay Code Type</option>
            <option value="pay Code Type">Pay Code Type</option>
            <option value="pay Code Type">Pay Code Type</option>
          </select>
        </div>
        }
      </div>
      {/* Filter Component */}
    </div>
  )
}

export default App