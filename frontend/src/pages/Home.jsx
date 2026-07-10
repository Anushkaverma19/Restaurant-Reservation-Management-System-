import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import restaurantImage from "../assets/images/restaurant.png";
import {
  FaUtensils,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";




const features = [
  {
    icon: <FaCalendarAlt size={28} />,
    title: "Easy Booking",
    description:
      "Reserve your table in just a few clicks with our intuitive booking system.",
  },
  {
    icon: <FaClock size={28} />,
    title: "Real-Time Availability",
    description:
      "Instantly check table availability for your preferred date and time.",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Perfect for Groups",
    description:
      "From romantic dinners to family gatherings, we have tables for everyone.",
  },
];


const Home = () => {


  const navigate = useNavigate();

const handleReserve = () => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if(token && user){
    navigate("/create-reservation");
  }
  else{
    navigate("/login");
  }

};

  return (
    <div className="bg-slate-950 text-white">


      <Navbar />


      {/* ================= HERO SECTION ================= */}


      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${restaurantImage})`,
        }}
      >


        <div className="absolute inset-0 bg-black/65"></div>



        <div className="relative z-10 flex items-center min-h-screen">


          <div className="max-w-7xl mx-auto px-6 w-full">


            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
              }}
              className="max-w-3xl"
            >


              <span className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold mb-6">
                Premium Restaurant Experience
              </span>


              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">


                Reserve Your


                <span className="block text-yellow-400">
                  Perfect Dining
                </span>


                Experience


              </h1>


              <p className="text-gray-200 text-lg md:text-xl mt-8 leading-8">

                Enjoy effortless table reservations with real-time
                availability, seamless booking, and a memorable dining
                experience for every occasion.

              </p>



              <div className="flex flex-wrap gap-5 mt-10">

<button
  onClick={handleReserve}
  className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition"
>
  Reserve Now
  <FaArrowRight />
</button>


                <Link
                  to="/login"
                  className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
                >

                  Login

                </Link>


              </div>
                            {/* Quick Stats */}

              <div className="grid grid-cols-3 gap-8 mt-16">


                <div>

                  <h2 className="text-4xl font-bold text-yellow-400">
                    500+
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Reservations
                  </p>

                </div>



                <div>

                  <h2 className="text-4xl font-bold text-yellow-400">
                    50+
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Luxury Tables
                  </p>

                </div>



                <div>

                  <h2 className="text-4xl font-bold text-yellow-400">
                    4.9★
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Customer Rating
                  </p>

                </div>


              </div>


            </motion.div>


          </div>


        </div>


      </section>



      {/* ================= FEATURES ================= */}


      <section className="py-24 px-6">


        <div className="max-w-7xl mx-auto">


          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >


            <h2 className="text-5xl font-bold">
              Why Choose Us
            </h2>


            <p className="text-gray-400 mt-5 text-lg">
              Designed to make restaurant reservations fast,
              reliable and enjoyable.
            </p>


          </motion.div>



          <div className="grid md:grid-cols-3 gap-8">


            {features.map((feature,index)=>(


              <motion.div

                key={index}

                initial={{
                  opacity:0,
                  y:60
                }}

                whileInView={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  duration:0.6,
                  delay:index*0.2
                }}

                viewport={{
                  once:true
                }}

                className="bg-slate-900 rounded-3xl p-10 border border-slate-700 hover:border-yellow-500 transition"

              >


                <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center mb-6">

                  {feature.icon}

                </div>


                <h3 className="text-2xl font-bold mb-4">

                  {feature.title}

                </h3>


                <p className="text-gray-400 leading-8">

                  {feature.description}

                </p>


              </motion.div>


            ))}


          </div>


        </div>


      </section>



      {/* ================= ABOUT SECTION ================= */}


      <section className="py-24 bg-slate-900">


        <div className="max-w-7xl mx-auto px-6">


          <div className="grid lg:grid-cols-2 gap-16 items-center">


            <motion.div

              initial={{
                opacity:0,
                x:-80
              }}

              whileInView={{
                opacity:1,
                x:0
              }}

              transition={{
                duration:0.8
              }}

              viewport={{
                once:true
              }}

            >


              <span className="text-yellow-400 font-semibold uppercase tracking-widest">

                About ReserveEase

              </span>



              <h2 className="text-5xl font-bold mt-5 leading-tight">


                Luxury Dining

                <br />

                Starts With

                <span className="text-yellow-400">

                  {" "}A Perfect Reservation

                </span>


              </h2>



              <p className="mt-8 text-gray-400 leading-8 text-lg">


                ReserveEase simplifies restaurant reservations with
                an intelligent booking system that automatically finds
                the best available table based on your group size and
                preferred time slot.


              </p>


              <p className="mt-6 text-gray-400 leading-8">


                Whether you're planning a romantic dinner,
                business meeting, birthday celebration,
                or family gathering, ReserveEase ensures
                a smooth booking experience from start to finish.


              </p>


            </motion.div>



            <motion.div

              initial={{
                opacity:0,
                x:80
              }}

              whileInView={{
                opacity:1,
                x:0
              }}

              transition={{
                duration:0.8
              }}

              viewport={{
                once:true
              }}

            >


              <img

                src={restaurantImage}

                alt="Restaurant"

                className="rounded-3xl shadow-2xl"

              />


            </motion.div>


          </div>


        </div>


      </section>
      
      {/* ================= STATS SECTION ================= */}

      <section className="py-20 bg-black">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8">


            {[
              ["500+", "Reservations"],
              ["120+", "Daily Guests"],
              ["50+", "Luxury Tables"],
              ["4.9★", "Customer Rating"],
            ].map((item,index)=>(


              <motion.div

                key={index}

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
                  delay:index*0.15
                }}

                viewport={{
                  once:true
                }}

                className="text-center bg-slate-900 rounded-3xl py-10 border border-slate-700"

              >


                <h2 className="text-5xl font-bold text-yellow-400">

                  {item[0]}

                </h2>


                <p className="text-gray-400 mt-4">

                  {item[1]}

                </p>


              </motion.div>


            ))}


          </div>


        </div>


      </section>



      {/* ================= CTA SECTION ================= */}


      <section className="py-24">


        <div className="max-w-5xl mx-auto px-6">


          <motion.div

            initial={{
              opacity:0,
              scale:0.9
            }}

            whileInView={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:0.6
            }}

            viewport={{
              once:true
            }}

            className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-[40px] p-14 text-center text-black"

          >


            <h2 className="text-5xl font-bold">

              Ready To Reserve
              Your Table?

            </h2>



            <p className="mt-6 text-lg max-w-3xl mx-auto">

              Experience hassle-free online reservations
              with instant confirmation and premium service.

            </p>



            <div className="mt-10">


              <button

                onClick={handleReserve}

                className="bg-black text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-900 transition"

              >

                Book Your Table

              </button>


            </div>


          </motion.div>


        </div>


      </section>




      {/* ================= TESTIMONIAL SECTION ================= */}


      <section className="py-24 bg-slate-900">


        <div className="max-w-7xl mx-auto px-6">


          <div className="text-center mb-16">


            <h2 className="text-5xl font-bold">

              What Our Guests Say

            </h2>


            <p className="text-gray-400 mt-5 text-lg">

              Real experiences from our happy customers.

            </p>


          </div>



          <div className="grid md:grid-cols-3 gap-8">


            {
              [
                {
                  name:"Rahul Sharma",
                  review:"Amazing experience! The booking process was quick and the ambience was beautiful."
                },

                {
                  name:"Priya Singh",
                  review:"Loved the restaurant atmosphere. Reservation management is smooth and easy."
                },

                {
                  name:"Amit Verma",
                  review:"Perfect place for family dinners. Everything was well organized."
                }

              ].map((item,index)=>(


                <div

                  key={index}

                  className="bg-slate-950 p-8 rounded-3xl border border-slate-700"

                >


                  <div className="text-yellow-400 text-3xl mb-5">

                    ★★★★★

                  </div>


                  <p className="text-gray-300 leading-7">

                    "{item.review}"

                  </p>


                  <h3 className="mt-6 font-bold text-xl">

                    {item.name}

                  </h3>


                </div>


              ))
            }


          </div>


        </div>


      </section>





      {/* ================= FOOTER ================= */}


      <footer className="border-t border-slate-800 py-8">


        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">


          <p className="text-gray-400">

            © 2026 ReserveEase. All rights reserved.

          </p>



          <div className="flex gap-6 text-gray-400">


            <Link to="/">
              Home
            </Link>


            <Link to="/login">
              Login
            </Link>


            <Link to="/register">
              Register
            </Link>


          </div>


        </div>


      </footer>



    </div>
  );
};


export default Home;