import Link from "next/link";

export default function Navbar(){
    return(
        <div className="Nav">
            <h1 className="nav-left">
                Bert 
            </h1>
            <div className="slash-line"></div>
            <div className="nav-right">
                <ul>
                    <Link href="/" className="nav-link"><li>Home</li></Link>
                    <Link href="/bio" className="nav-link"><li>Bio</li></Link>
                    <Link href="/projects" className="nav-link"><li >Projects</li></Link>
                    <Link href="/contact" className="nav-link"><li >Contact</li></Link>
                </ul>
            </div>
        </div>
    )
}