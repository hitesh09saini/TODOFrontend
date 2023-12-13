import React from 'react'

const Update = ({message, success}) => {
  return (
    <div className='shadow-xl absolute m-6 bg-[#ffffff] p-2 rounded px-5' style={{color: !success?'red':'green'}}>
      {message|| 'get'}
    </div>
  )
}

export default Update
