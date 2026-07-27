"use client";

import Link from "next/link";
import SplitText from "@/components/ui/SplitText";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Hero() {
  return (
    <section className="site-hero flex items-center">

      {/* Background Glow */}
      <div className="bg-glow-cyan -top-40 -left-40 h-[500px] w-[500px]" />
      <div className="bg-glow-blue -bottom-40 -right-40 h-[500px] w-[500px]" />

      {/* Grid Background */}
      <div className="bg-grid" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">


        {/* LEFT */}

        <div>

          <span className="
          inline-flex
          rounded-full
          border
          border-cyan-400/30
          bg-cyan-400/10
          px-5
          py-2
          text-sm
          text-cyan-300
          ">
            🚀 AI • Cloud • Cyber Security • Software Development
          </span>


          <div className="mt-8">

            <AnimatedHeading
              text="AD TECH ENTERPRISES PVT. LTD."
              className="text-5xl md:text-6xl xl:text-7xl leading-tight text-[#F8FAFC]"
              tag="h1"
              textAlign="left"
            />

          </div>



          <h2 className="
          mt-8
          text-3xl
          font-semibold
          text-[#CBD5E1]
          ">
            Empowering Businesses Through AI
          </h2>



          <p className="
          mt-6
          max-w-xl
          text-lg
          leading-8
          text-[#94A3B8]
          ">
            Empowering businesses with intelligent AI solutions,
            enterprise software, cloud technologies and digital
            transformation that accelerate innovation and growth.
          </p>



          <div className="mt-10 flex gap-5 flex-wrap">


            <Link href="/services">

              <button className="
              rounded-xl
              bg-[#F8FAFC]
              px-8
              py-4
              font-semibold
              text-[#0B1120]
              hover:bg-[#CBD5E1]
              transition
              hover:scale-105
              ">
                Explore Services
              </button>

            </Link>



            <Link href="/contact">

              <button className="
              rounded-xl
              border
              border-[#2A3648]
              bg-[#111827]
              px-8
              py-4
              text-[#F8FAFC]
              font-semibold
              hover:border-cyan-400
              transition
              hover:scale-105
              ">
                Contact Us
              </button>

            </Link>


          </div>

        </div>





        {/* RIGHT CARD */}

        <div className="flex justify-center">


          <div className="
          relative
          rounded-[32px]
          border
          border-[#2A3648]
          bg-[#1A2233]/80
          backdrop-blur-xl
          p-10
          shadow-xl
          ">


            <img
              src="/AD tech logo.png"
              alt="AD TECH"
              className="
              h-64
              w-64
              object-contain
              mx-auto
              "
            />



            <div className="
            mt-8
            grid
            grid-cols-2
            gap-5
            ">


              {[
                ["100+","Projects Delivered"],
                ["50+","Happy Clients"],
                ["AI","Automation"],
                ["24×7","Support"]
              ].map((item,index)=>(

                <div
                key={index}
                className="
                rounded-xl
                bg-[#111827]
                border
                border-[#2A3648]
                p-5
                text-center
                "
                >

                  <h3 className="text-3xl font-bold text-[#F8FAFC]">
                    {item[0]}
                  </h3>

                  <p className="text-sm mt-2 text-[#94A3B8]">
                    {item[1]}
                  </p>


                </div>

              ))}


            </div>


          </div>


        </div>



      </div>


    </section>
  );
}