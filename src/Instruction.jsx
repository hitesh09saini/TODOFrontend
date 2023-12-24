import React from 'react'

const Instruction = ({ text }) => {
  return (
 
      <div className='z-8 pong  absolute left-[10px] bg-white rounded p-2 shadow px-4'>
        {text}
      </div>
  );
};

export default Instruction;
