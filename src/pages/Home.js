import React from "react";
import "./Home.css";
import { useNavigate } from "react";
import { post } from "../api/methods";
import { ReactComponent as YourSvg } from "./svgside.svg";
import Footer from "../components/Footer"
// import {s} from '../pages/home_svg'

const Home = () => {
  //  const navigate = useNavigate();
  const createRoom = async () => {
    // console.log("CREATE ROOM");
    try {
      const response = await post("room", {});
      if (response.success) {
        // console.log(response.data);
        redirect(response.data.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function redirect(Id) {
    // console.log(Id);
    window.location.href = `/room/${Id}`;
  }
  return (
    <div>
    <div className="HomeContainer">
      <div className="HomeTitle">
        APNA EDITOR APNA EDITOR APNA EDITOR APNA EDITOR APNA EDITOR
      </div>
      <div className="MainContainer">
        <div className="MainContainerHeading">
          Unleash Your Coding Potential
        </div>
        <p className="MainContainerText">
          Get ready to unleash your creativity! <br /><br/>
          With just a click of a button, you can create your very own coding
          room and dive into the world of programming. Our powerful backend
          infrastructure ensures a seamless experience, allowing you to focus on
          what you love - coding.
          <br /><br/>
          Simply click the "Create Room" button below our system will set up a
          dedicated workspace for you. <br /><br/>
          Once the room is created, the IDE will automatically open, providing
          you with a feature-rich environment equipped with all the tools and
          resources you need to bring your ideas to life. Click the button below
          to embark on your coding adventure!
        </p>
        {/* <YourSvg width={"25vw"}/> */}
        {/* <image src={s} alt="home" className="HomeImage"/> */}
        <button onClick={createRoom} className="HomeButton">
          {" "}
          Create Room{" "}
        </button>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
