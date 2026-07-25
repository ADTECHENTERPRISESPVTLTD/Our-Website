"use client";

import { motion } from "framer-motion";

export default function ServicesPreview() {

  const services = [
    "AI Automation",
    "AI Agents",
    "Business Automation",
    "Custom Software",
    "AI Consulting",
    "Data Engineering",
  ];


  return (
    <section className="bg-[#111827] py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
          viewport={{once:true}}
          className="text-center"
        >

          <p className="text-[#94A3B8] uppercase tracking-widest">
            Our Services
          </p>

          <h2 className="text-4xl font-bold text-[#F8FAFC] mt-3">
            Technology Solutions That Drive Growth
          </h2>

        </motion.div>



        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {services.map((service,index)=>(

            <motion.div
              key={service}
              initial={{opacity:0,y:50}}
              whileInView={{opacity:1,y:0}}
              transition={{
                duration:0.5,
                delay:index*0.1
              }}
              viewport={{once:true}}

              whileHover={{
                scale:1.05
              }}

              className="
              bg-[#1A2233]
              border border-[#2A3648]
              rounded-2xl
              p-6
              "
            >

              <h3 className="
              text-xl
              font-semibold
              text-[#F8FAFC]
              ">
                {service}
              </h3>


              <p className="
              text-[#94A3B8]
              mt-3
              ">
                Intelligent solutions designed to automate,
                optimize and transform businesses.
              </p>


            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}