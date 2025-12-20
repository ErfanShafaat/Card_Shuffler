import React from 'react'

export default function Cards(myProp) {
    let HandleClick = ()=>{
    
       if (!myProp.disable) {
        myProp.play(myProp.x)
       }
    
    }
  
  return (
    <div  className='card'>
      <div className={myProp.flipped ? "flipped":""}>
    <img className='front' src={myProp.x.src}></img>
    <img className='back' src='./images/ball.jpg' onClick={HandleClick}></img>
    </div>
  </div>
  )
}
