"use client";

import { motion } from "framer-motion";

export default function Testimonials() {

  const testimonials = [
    {
      name: "Educational Institution",
      message:
        "AD TECH helped us adopt modern digital solutions and improve our technology infrastructure."
    },
    {
      name: "Startup Founder",
      message:
        "Their AI automation approach helped us reduce manual efforts and improve productivity."
    },
    {
      name: "Business Enterprise",
      message:
        "A reliable technology partner delivering scalable and future-ready software solutions."
    }
  ];


  return (
    <section className="bg-[#0B1120] py-20 px-6">

      <div className="max-w-7xl mx-auto">


        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
          viewport={{once:true}}

          className="text-center"
        >

          <p className="text-[#94A3B8] uppercase tracking-widest">
            Testimonials
          </p>


          <h2 className="
          text-4xl
          font-bold
          text-[#F8FAFC]
          mt-3
          ">
            What Our Partners Say
          </h2>

        </motion.div>



        <div className="
        grid
        md:grid-cols-3
        gap-6
        mt-12
        ">


          {testimonials.map((item,index)=>(

            <motion.div

              key={item.name}

              initial={{
                opacity:0,
                y:50
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              transition={{
                duration:0.5,
                delay:index*0.15
              }}

              viewport={{
                once:true
              }}

              whileHover={{
                scale:1.03
              }}

              className="
              bg-[#1A2233]
              border
              border-[#2A3648]
              rounded-2xl
              p-8
              "
            >


              <p className="
              text-[#CBD5E1]
              leading-relaxed
              ">
                "{item.message}"
              </p>


              <h3 className="
              text-[#F8FAFC]
              font-semibold
              mt-6
              ">
                {item.name}
              </h3>


            </motion.div>

          ))}


        </div>


      </div>

    </section>
  );
}