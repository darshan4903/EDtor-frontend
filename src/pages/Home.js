import React from 'react'
import './Home.css'
import { useNavigate} from 'react';
import {post} from '../api/methods';
// import {s} from '../pages/home_svg'


const Home = () => {
  //  const navigate = useNavigate();
    const createRoom =  async () => {
      console.log("CREATE ROOM");
      try{
        const response = await post("room",{});
        if(response.success){
          console.log(response.data);
          redirect(response.data.id);
        }
      }catch(e){
        console.log(e);
      }
    }

    function redirect(Id){
        console.log(Id)
        window.location.href = `/room/${Id}`
    }
  return (
    <div className='HomeContainer'>
        <div className='HomeTitle'>APNA EDITOR</div>
        {/* <image src={s} alt="home" className="HomeImage"/> */}
        <button onClick={createRoom} className="HomeButton"> Create Room </button>
    </div>
  )
}

export default Home