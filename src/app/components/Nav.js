import Link from "next/link";

export default function Navbar(){
    return(
        <div className="Nav">
            <h1 className="nav-left">
                
                Bert 
            </h1>
            <div class="slash-line"></div>
            <div className="nav-right">
                <ul>
                    <li className="nav-link">Home</li>
                    <li className="nav-link">Bio</li>
                    <li className="nav-link">Projects</li>
                    <li className="nav-link">Contact</li>
                </ul>
            </div>
        </div>
    )
}