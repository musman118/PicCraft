import Image from "next/image";
import Button from "@/app/components/button"
import Mainmodal from "@/app/components/mainmodal"
export default function Home() {
  return (
      <div className="container  2xl:max-w-full p-5 text-white">
        <div className="flex flex-col place-items-center">
          <h1 className="text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-extrabold my-7">PicCraft</h1>
          <p className="text-5xl font-bold ">Upload Your Image...</p>
          <div className="container p-5">
            <div className="flex flex-row justify-center">
              <Mainmodal/>
            {/* <Button text={"Upload an Image"}/>
            <Button text={"About"}/> */}
            </div>
          </div>
          

        </div>
      </div>
  );
}
