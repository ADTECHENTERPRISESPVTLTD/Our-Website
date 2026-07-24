"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "AI Automation",
      description:
        "Automate repetitive processes, improve efficiency, and enhance business operations using Artificial Intelligence.",
      icon: "🤖",
    },
    {
      title: "AI Agents",
      description:
        "Build intelligent AI agents that assist teams, automate tasks, and improve decision-making.",
      icon: "🧠",
    },
    {
      title: "Business Automation",
      description:
        "Streamline workflows and reduce manual operations with smart automation solutions.",
      icon: "⚙️",
    },
    {
      title: "Custom Software",
      description:
        "Develop scalable software solutions designed according to your business requirements.",
      icon: "💻",
    },
    {
      title: "AI Consulting",
      description:
        "Strategic AI guidance to help organizations adopt intelligent technology.",
      icon: "🚀",
    },
    {
      title: "Data Engineering",
      description:
        "Transform business data into valuable insights with modern data solutions.",
      icon: "📊",
    },
  ];


  return (
    <section className="bg-[#111827] py-24 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto">


        {/* Heading Animation */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }}
          viewport={{ once:true }}
          className="text-center mb-14"
        >

          <p className="text-[#94A3B8] uppercase tracking-widest">
            Our Services
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mt-3">
            Intelligent Solutions
            <span className="text-[#CBD5E1]">
              {" "}For Modern Businesses
            </span>
          </h2>


          <p className="text-[#94A3B8] max-w-2xl mx-auto mt-5">
            We build AI-powered software solutions that help organizations
            automate operations, improve productivity, and accelerate growth.
          </p>

        </motion.div>



        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">


          {services.map((service,index)=>(

            <motion.div

              key={service.title}

              initial={{
                opacity:0,
                y:60
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              transition={{
                duration:0.5,
                delay:index*0.1
              }}

              viewport={{
                once:true
              }}

              whileHover={{
                y:-10,
                scale:1.03
              }}

              className="
              bg-[#1A2233]
              border border-[#2A3648]
              rounded-2xl
              p-8
              shadow-lg
              hover:shadow-2xl
              transition-all
              "
            >


              <div
              className="
              h-14 w-14
              flex items-center justify-center
              rounded-xl
              bg-[#0B1120]
              text-3xl
              mb-6
              "
              >
                {service.icon}
              </div>



              <h3 className="
              text-xl
              font-semibold
              text-[#F8FAFC]
              ">
                {service.title}
              </h3>



              <p className="
              text-[#94A3B8]
              mt-4
              leading-relaxed
              ">
                {service.description}
              </p>



              <button
              className="
              mt-6
              text-[#F8FAFC]
              hover:text-[#CBD5E1]
              "
              >
                Explore →
              </button>


            </motion.div>

          ))}


        </div>


      </div>

    </section>
  );
}