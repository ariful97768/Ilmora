import Image from "next/image";
import logo from "@/assets/logo-white.png";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import bannerImg from "@/assets/hero-bg.jpg";
import libraryImg from "@/assets/library.jpg";
import statueImg from "@/assets/statue.jpg";
import researchImg from "@/assets/research.jpg";
import degreeImg from "@/assets/degree.jpg";
import person1 from "@/assets/person1.webp";
import person2 from "@/assets/person2.jpeg";
import person3 from "@/assets/rishisunak.jpg";
import news1 from "@/assets/news1.webp";
import news2 from "@/assets/news2.webp";
import news3 from "@/assets/news3.webp";

export default function Home() {
  return (
    <>
      <header className="max-w-7xl pt-3 text-white flex items-center justify-between mx-auto">
        <Link href={"#"} className="w-35 h-auto">
          <Image src={logo} alt="logo" />
        </Link>
        <Link href={"/login"} className="text-lg hover:underline font-bold">
          Login
        </Link>
      </header>
      <main className="text-white mx-auto">
        <section className="max-w-[1536px] mx-auto py-20 pt-16 relative z-10">
          <div className="max-w-[1050px] mx-auto space-y-3 pb-14">
            <div className="text-[56px] font-bold tracking-wide -space-y-1">
              <div className="w-full flex justify-start">
                <h1>UNIVERSITY OF ILMORA</h1>
              </div>
              <div className="w-full flex justify-end">
                <h1>A TRADITION OF EXCELLENCE</h1>
              </div>
            </div>
            <p className="text-[#e7e8ee] text-center">
              A respected institution on research, teaching, <br /> and making a
              positive impact globally
            </p>
          </div>
          <div className="flex gap-5 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold">Undergraduate Programs</h1>
              <p className="text-[#d4d7e4] leading-5.5">
                At Ilmora, undergraduates thrive in a dynamic academic
                environment. With access to expert faculty, state-of-the-art
                facilities, and a diverse community, students are equipped to
                excel. through challenging coursework and research, they develop
                critical thinking and creativity, preparing for successful
                careers.
              </p>
              <Link
                href={"#"}
                className="underline group flex items-center gap-2"
              >
                Learn more
                <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                  <IoIosArrowForward />
                </span>
              </Link>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold">Postgraduate Programs</h1>
              <p className="text-[#d4d7e4] leading-5.5">
                Postgraduate students at Ilmora engage in cutting-edge research,
                working with top experts and resources. they deepen their
                knowledge, contribute to innovative advancements, and prepare
                for leadership roles in academia and industry. Ilmora provides a
                collaborative environment for intellectual growth and global
                impact.
              </p>
              <Link
                href={"#"}
                className="underline group flex items-center gap-2"
              >
                Learn more
                <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                  <IoIosArrowForward />
                </span>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full relative h-150">
          <Image
            src={bannerImg}
            fill
            className="object-cover object-center"
            alt="image"
          />
        </section>
        <section className="bg-white text-black py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl space-y-5">
              <h1 className="font-bold text-4xl">CAMPUS</h1>
              <p className="text-[#223043] tracking-wide leading-5.5">
                The University of Ilmora combines rich history with modern
                amenities, offering a dynamic environment for learning,
                research, and personal growth.
                {/* <br /> */}
                With world-class facilities, historic buildings, and beautiful
                green spaces, the campus provides an inspiring setting for
                academic and personal development.
              </p>
            </div>
            <div className="max-w-7xl py-10 mx-auto flex flex-col items-center">
              <div className="flex py-5 items-center border-b-3 w-full justify-center gap-40">
                <span className="font-bold text-lg">01</span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Libraries</h1>
                  <p className="text-[#223043] leading-5.5">
                    Ilmora is home to some of the most prestigious libraries in
                    the world, offering students access to vast collections of
                    resources for research and study. Thee iconic University
                    Library, along with numerous departmental and college
                    libraries, provides an enriching environment for academic
                    pursuits.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex py-5 items-center border-b-3 w-full justify-center gap-40">
                <span className="font-bold text-lg">02</span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Museums</h1>
                  <p className="text-[#223043] leading-5.5">
                    The University boasts a number of renowned museums; such as
                    the Fitzwiliwam Museum and the Museum of Archeology and
                    Anthropology. These institutions offer students unique
                    opportunities to engage with history, art, and culture, all
                    within walking distance of the campus.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex py-5 items-center border-b-3 w-full justify-center gap-40">
                <span className="font-bold text-lg">03</span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Green Spaces</h1>
                  <p className="text-[#223043] leading-5.5">
                    The campus features beautiful green spaces, including the
                    Botanic Garden and various college gardens, providing
                    sutdents with places to relax, reflect, or engage in outdoor
                    activities. These areas contribute to a balanced and healthy
                    campus life.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex py-5 items-center border-b-3 w-full justify-center gap-40">
                <span className="font-bold text-lg">04</span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Sports and Recreation</h1>
                  <p className="text-[#223043] leading-5.5">
                    Ilmora offers a wide range of sporting facilities and clubs
                    for students to stay active and pursue their interest. From
                    rowing on the River Cam to football and tennis, there are
                    numerous opportunities for students to engage in physical
                    activities and social events.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white space-y-15 text-black pb-20">
          <div className="flex max-w-7xl gap-30 mx-auto">
            <h1 className="font-bold text-4xl shrink-0">STUDYING AT ILMORA</h1>
            <p className="text-[#223043] tracking-wide leading-5.5">
              Studying at Ilmoa mean being parts of a tradition of intellectual
              curiosity and academic excellence. With access to world-class
              research, personalized supervision, and a vibrant student life,
              students are empowered to make meaningful contribution to their
              fields and beyond.
            </p>
          </div>
          <div className="flex gap-5 max-w-max mx-auto">
            <div className="w-max group h-max overflow-hidden">
              <div className="relative text-white group-hover:-translate-y-2 group-hover:scale-105 duration-300 group w-76 h-110">
                <div className="absolute top-0 z-10 h-full w-full  group-hover:bg-gradient-to-b duration-600 from-[#0B2344]/0 to-[#0B2344]/30 "></div>
                <Image
                  src={libraryImg}
                  fill
                  className="object-cover"
                  alt="women in a library"
                />
                <div className="absolute bottom-5 z-20">
                  <div className="overflow-hidden mx-5">
                    <div className="space-y-1 duration-600 translate-y-27 group-hover:-translate-y-0">
                      <h3 className="font-semibold">World of Knowledge</h3>
                      <p className="leading-5 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum quis explicabo rem alias totam vero, illo in
                        obcaecati vitae minus.
                      </p>
                      <Link
                        href={"#"}
                        className="underline text-sm flex z-50 items-center gap-2"
                      >
                        Learn more
                        <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                          <IoIosArrowForward />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-max group h-max overflow-hidden">
              <div className="relative text-white group-hover:-translate-y-2 group-hover:scale-105 duration-300 group w-76 h-110">
                <div className="absolute top-0 z-10 h-full w-full  group-hover:bg-gradient-to-b duration-600 from-[#0B2344]/0 to-[#0B2344]/30 "></div>
                <Image
                  src={statueImg}
                  fill
                  className="object-cover "
                  alt="women in a library"
                />
                <div className="absolute bottom-5 z-20">
                  <div className="overflow-hidden mx-5">
                    <div className="space-y-1 duration-600 translate-y-27 group-hover:-translate-y-0">
                      <h3 className="font-semibold">Curriculum</h3>
                      <p className="leading-5 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum quis explicabo rem alias totam vero, illo in
                        obcaecati vitae minus.
                      </p>
                      <Link
                        href={"#"}
                        className="underline text-sm flex z-50 items-center gap-2"
                      >
                        Learn more
                        <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                          <IoIosArrowForward />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-max group h-max overflow-hidden">
              <div className="relative text-white group-hover:-translate-y-2 group-hover:scale-105 duration-300 group w-76 h-110">
                <div className="absolute top-0 z-10 h-full w-full  group-hover:bg-gradient-to-b duration-600 from-[#0B2344]/0 to-[#0B2344]/30 "></div>
                <Image
                  src={researchImg}
                  fill
                  className="object-cover "
                  alt="women in a library"
                />
                <div className="absolute bottom-5 z-20">
                  <div className="overflow-hidden mx-5">
                    <div className="space-y-1 duration-600 translate-y-27 group-hover:-translate-y-0">
                      <h3 className="font-semibold">Research Opportunities</h3>
                      <p className="leading-5 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum quis explicabo rem alias totam vero, illo in
                        obcaecati vitae minus.
                      </p>
                      <Link
                        href={"#"}
                        className="underline text-sm flex z-50 items-center gap-2"
                      >
                        Learn more
                        <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                          <IoIosArrowForward />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-max group h-max overflow-hidden">
              <div className="relative text-white group-hover:-translate-y-2 group-hover:scale-105 duration-300 group w-76 h-110">
                <div className="absolute top-0 z-10 h-full w-full  group-hover:bg-gradient-to-b duration-600 from-[#0B2344]/0 to-[#0B2344]/30 "></div>
                <Image
                  src={degreeImg}
                  fill
                  className="object-cover "
                  alt="women in a library"
                />
                <div className="absolute bottom-5 z-20">
                  <div className="overflow-hidden mx-5">
                    <div className="space-y-1 duration-600 translate-y-27 group-hover:-translate-y-0">
                      <h3 className="font-semibold">Degree Programs</h3>
                      <p className="leading-5 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum quis explicabo rem alias totam vero, illo in
                        obcaecati vitae minus.
                      </p>
                      <Link
                        href={"#"}
                        className="underline text-sm flex z-50 items-center gap-2"
                      >
                        Learn more
                        <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                          <IoIosArrowForward />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-white text-black">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl space-y-5 pt-10 pb-20 ">
                <h1 className="font-bold text-4xl shrink-0">ALUMNI</h1>
                <p className="text-[#223043] tracking-wide leading-5.5">
                  The University on Ilmora has a long history of producing
                  individuals who have shaped various fields, from science and
                  politics to entertainment and social activism. Below are just
                  a few of its many distinguished alumni.
                </p>
                <button className="rounded-full hover:cursor-pointer border-[#0B2344]/60 text-[#223043] py-2 px-4 border-2">
                  See more famous alumni
                </button>
              </div>
            </div>
          </div>
          <div className="flex py-14 gap-10 justify-center">
            <div className="relative w-100 h-105">
              <Image
                src={person1}
                fill
                className="object-cover object-top"
                alt="alumni"
              />
            </div>
            <div className="relative w-100 h-105">
              <Image src={person2} fill className="object-cover" alt="alumni" />
            </div>
            <div className="relative -mt-35 w-100 h-140">
              <Image
                src={person3}
                fill
                className="object-cover object-top"
                alt="alumni"
              />
            </div>
          </div>
        </section>
        <section className="bg-white text-black py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="max-w-4xl space-y-5">
                <h1 className="font-bold text-4xl">EVENTS</h1>
                <p className="text-[#223043] tracking-wide leading-5.5">
                  Concerts, lectures, sports events, and more
                </p>
              </div>
              <button className="rounded-full hover:cursor-pointer border-[#0B2344]/60 text-[#223043] py-2 px-4 border-2">
                See more events
              </button>
            </div>
            <div className="max-w-7xl py-10 mx-auto flex flex-col">
              <div className="flex py-5 items-center border-b-3 w-full gap-40">
                <span className="font-bold text-xl min-w-36">
                  SATURDAY 10 <br /> MAY
                </span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Libraries</h1>
                  <p className="text-[#223043] leading-5.5">
                    Ilmora is home to some of the most prestigious libraries in
                    the world, offering students access to vast collections of
                    resources for research and study. Thee iconic University
                    Library, along with numerous departmental and college
                    libraries, provides an enriching environment for academic
                    pursuits.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex py-5 items-center border-b-3 w-full gap-40">
                <span className="font-bold text-xl min-w-36">
                  SATURDAY 10 <br /> MAY
                </span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Museums</h1>
                  <p className="text-[#223043] leading-5.5">
                    The University boasts a number of renowned museums; such as
                    the Fitzwiliwam Museum and the Museum of Archeology and
                    Anthropology. These institutions offer students unique
                    opportunities to engage with history, art, and culture, all
                    within walking distance of the campus.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex py-5 items-center border-b-3 w-full gap-40">
                <span className="font-bold text-xl min-w-36">
                  SUNDAY 11 <br /> MAY
                </span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">
                    Here is a Gale Warning: Art, Crisis & Survival
                  </h1>
                  <p className="text-[#223043] leading-5.5">
                    This exhibition presents eight contemporary artists whose
                    works offer vantage points on a world in perpetual crisis.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex py-5 items-center border-b-3 w-full gap-40">
                <span className="font-bold text-xl min-w-36">
                  JULY 2025 <br /> JANUARY 2026
                </span>
                <div className="space-y-2 max-w-3xl">
                  <h1 className="font-bold text-lg">Admissions - AIM PhD</h1>
                  <p className="text-[#223043] leading-5.5">
                    Are you considering a PhD at Ilmora starting in 2026? Join
                    AIM; PhD to revieve 6 months of support preparing your PhD
                    application, Apply by 18 may to join the programme.
                  </p>
                  <Link
                    href={"#"}
                    className="underline group text-sm flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white text-black pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="max-w-4xl space-y-5">
                <h1 className="font-bold text-4xl">NEWS</h1>
                <p className="text-[#223043] tracking-wide leading-5.5">
                  Official news from Ilmora University from across the
                  University
                </p>
              </div>
              <button className="rounded-full hover:cursor-pointer border-[#0B2344]/60 text-[#223043] py-2 px-4 border-2">
                See more news
              </button>
            </div>
            <div className="flex pt-14 gap-10 justify-center">
              <div className="space-y-4">
                <div className="relative w-100 h-100">
                  <Image
                    src={news1}
                    fill
                    className="object-cover object-top"
                    alt="news"
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="mb-3 text-xl font-semibold">
                    Undergraduate Programs
                  </h1>
                  <p className="text-[#223043] text-sm tracking-wide leading-5.5">
                    At Ilmora, undergraduates thrive in a dynamic academic
                    environment. With access to expert faculty, state-of-the-art
                    facilities, and a diverse community, students are equipped
                    to excel. through challenging coursework and research, they
                    develop critical thinking and creativity, preparing for
                    successful careers.
                  </p>
                  <Link
                    href={"#"}
                    className="underline text-sm group flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative w-100 h-130">
                  <Image src={news2} fill className="object-cover" alt="news" />
                </div>
                <div className="space-y-1">
                  <h1 className="mb-3 text-xl font-semibold">
                    Undergraduate Programs
                  </h1>
                  <p className="text-[#223043] text-sm tracking-wide leading-5.5">
                    At Ilmora, undergraduates thrive in a dynamic academic
                    environment. With access to expert faculty, state-of-the-art
                    facilities, and a diverse community, students are equipped
                    to excel. through challenging coursework and research, they
                    develop critical thinking and creativity, preparing for
                    successful careers.
                  </p>
                  <Link
                    href={"#"}
                    className="underline text-sm group flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative w-100 h-100">
                  <Image
                    src={news3}
                    fill
                    className="object-cover object-top"
                    alt="news"
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="mb-3 text-xl font-semibold">
                    Undergraduate Programs
                  </h1>
                  <p className="text-[#223043] text-sm tracking-wide leading-5.5">
                    At Ilmora, undergraduates thrive in a dynamic academic
                    environment. With access to expert faculty, state-of-the-art
                    facilities, and a diverse community, students are equipped
                    to excel. through challenging coursework and research, they
                    develop critical thinking and creativity, preparing for
                    successful careers.
                  </p>
                  <Link
                    href={"#"}
                    className="underline text-sm group flex items-center gap-2"
                  >
                    Learn more
                    <span className="-mb-1 group-hover:-translate-x-1 duration-300">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-white pb-11 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4">
            <div className="flex flex-col -translate-y-9 gap-2">
              <div className="relative mb-3 -translate-x-2 w-34 h-13">
                <Image src={logo} fill className="object-cover" alt="logo" />
              </div>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Contact the University
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Accessibility statement
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Freedom on information
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Privacy policy and cookies
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Statement on Modern Slavery
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Terms and conditions
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                University A-Z
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold mb-1 text-lg">Study at Ilmora</h1>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Undergraduate
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Postgraduate
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Continuing education
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Courses in education
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Executive and professional education
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold mb-1 text-lg">
                About the University
              </h1>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                How the University and Colleges work
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Give to Ilmora
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Jobs
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Maps
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Visiting the University
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Ilmora University Press & Assessment
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold mb-1 text-lg">Research at Ilmora</h1>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Research news
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                About research at Ilmora
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Public engagement
              </Link>
              <Link className=" text-[#d4d7e4]" href={"#"}>
                Spotlight on Ilmora
              </Link>
            </div>
          </div>
          <div className="flex text-[#d4d7e4] items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href={"#"}>Terms of Use</Link>
              <Link href={"#"}>Privacy Policy</Link>
            </div>
            <div>@2025 University of Ilmora</div>
          </div>
        </div>
      </footer>
    </>
  );
}
