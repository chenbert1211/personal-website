import Image from "next/image";
export default function Top() {
    return (
      <div className="top-section" >
        <div className="profile-pic">
          <Image src='/PP.jpg'
            alt = 'profile'
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="about-me">
          <h1>About Me</h1>
            <p>
              I am currently pursuing a Bachelor’s in Computer Science at the University of Houston.
              I’m passionate about technology and advancement of humanity. 
            </p>
            <p>
              When I’m not coding, I really enjoy investing, outdoors, and spending time with friends and family! 
            </p>
          </div>
        </div>
    );
  }