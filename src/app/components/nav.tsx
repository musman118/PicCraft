import Link from 'next/link'


const Navbar = () => {
    return(
    <div className=" container 2xl:max-w-full p-5 w-screen text-white">
        <div className="flex flex-row justify-between space-x-4 ">
                <Link className=" flex-row "href="/"><h1>PicCraft</h1></Link>
                <div className="flex-row-reverse  space-x-2">
                <Link className='ml-auto ' href="/about">About</Link>
                <Link className=' ml-auto' href="/xyz">XYZ</Link>
                </div>
        </div>
    </div>
    )


}

export default Navbar;