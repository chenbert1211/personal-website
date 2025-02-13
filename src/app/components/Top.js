import Image from "next/image";
import About from "./top-components/About";
export default function Top() {
    return (
      <div className="top-section" >
        <div className="profile-pic">
          <Image 
            className="profile-pic1"
            src='/PP.jpg'
            alt = 'profile'
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
          <About/>
        </div>
    );
  }