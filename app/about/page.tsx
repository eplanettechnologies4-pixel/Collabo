import Image from "next/image";


import {
  BsShieldCheck,
  BsLightbulb,
  BsGraphUpArrow,
  BsPeople,
} from "react-icons/bs";

import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section
        className="section pb-3 bg-ink blog-main"
        style={{ paddingTop: "10rem" }}
      >
        <div className="container">
          <span
            className="eyebrow"
            style={{
              color: "var(--lime)",
              width: "100%",
              justifyContent: "center",
            }}
          >
            About Collabo
          </span>

          <h1 className="mt-3 text-center">
            Connecting Pakistan's Creators with Exceptional Brands
          </h1>

          <p
            className="fs-lead mt-3 text-center"
            style={{
              color: "#c9c6ba",
              maxWidth: "60ch",
              margin: "auto",
            }}
          >
            Collabo is a modern creator marketplace built to help brands
            discover authentic creators, launch meaningful campaigns, and build
            long-term partnerships that create real impact.
          </p>
        </div>
      </section>







{/* Founders */}
      <section className="section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow">Leadership</span>
            <h2 className="mt-3">Meet the Founders</h2>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-4">
              <div className="p-4 rounded-4 border h-100 text-center">
                <Image
              src="/assets/zeeshan.jpg"
              alt="Khizar Awan"
              width={140}
              height={140}
              quality={90}
              className="rounded-circle mb-4"
              style={{ objectFit: "cover",objectPosition:"top" }}
              />
                <h4 className="mb-1">Zeeshan Zahid Gill</h4>
                <span className=" d-inline-block mb-3">Founder & CEO</span>
                <p className="para-founders">
                  Leads the overall vision and strategy for Collabo, focused on
                  building Pakistan's most trusted creator ecosystem.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="p-4 rounded-4 border h-100 text-center">
              <Image
              src="/assets/syed-muneeb.jpg"
              alt="Khizar Awan"
              width={140}
              height={140}
              quality={90}
              className="rounded-circle mb-4"
              style={{ objectFit: "cover",objectPosition:"top" }}
              />
                <h4 className="mb-1">Syed Muneeb Ahsan Gilani</h4>
                <span className=" d-inline-block mb-3">Co-Founder & COO</span>
                <p className="para-founders">
                  Drives operations and growth, ensuring every collaboration on
                  the platform is smooth, transparent, and impactful.
                </p>
              </div>
            </div>

          <div className="col-lg-4">
              <div className="p-4 rounded-4 border h-100 text-center">
                <Image
              src="/assets/mohsan.jpg"
              alt="Mohsan Gill"
              width={140}
              height={140}
              quality={90}
              className="rounded-circle mb-4"
              style={{ objectFit: "cover", objectPosition: "top" }}
              />
                <h4 className="mb-1">Mohsan Gill</h4>
                <span className=" d-inline-block mb-3">Director Production</span>
                <p className="para-founders">
                  Experienced production leader responsible for overseeing production operations, ensuring quality standards, optimizing workflows, and delivering projects efficiently and on schedule.
                </p>
              </div>
            </div>    
          

          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow">Our Team</span>
            <h2 className="mt-3">The People Behind Collabo</h2>
          </div>

          <div className="row g-4">


            <div className="col-md-6 col-lg-4">
              <div className="p-4 rounded-4 border h-100 text-center bg-white">
              <Image
              src="/assets/danish.jpeg"
              alt="Khizar Awan"
              width={140}
              height={140}
              quality={90}
              className="rounded-circle mb-4"
              style={{ objectFit: "cover",objectPosition:"top" }}
              />
                <h5 className="mb-1">Muhammad Danish</h5>
                <span className="eyebrow d-inline-block mb-3">
                  Project Manager & Python/AI Engineer
                </span>
                <p>
                  Oversees project execution while building AI-driven features
                  that power the platform.
                </p>
              </div>
            </div>


            <div className="col-md-6 col-lg-4">
              <div className="p-4 rounded-4 border h-100 text-center bg-white">
              <Image
              src="/assets/khizar.jpg"
              alt="Khizar Awan"
              width={140}
              height={140}
              quality={90}
              className="rounded-circle mb-4"
              style={{ objectFit: "cover",objectPosition:"top" }}
              />
                <h5 className="mb-1">Khizar Awan</h5>
                <span className="eyebrow d-inline-block mb-3">CMS Developer</span>
                <p>
                  Builds and maintains the content systems that power Collabo's
                  platform experience.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="p-4 rounded-4 border h-100 text-center bg-white">
              <Image
              src="/assets/areeba.png"
              alt="Khizar Awan"
              width={140}
              height={140}
              quality={90}
              className="rounded-circle mb-4"
              style={{ objectFit: "cover",objectPosition:"top" }}
              />
                <h5 className="mb-1">Areeba Jabbar</h5>
                <span className="eyebrow d-inline-block mb-3">AI Developer</span>
                <p>
                  Designs and implements the AI capabilities that make creator
                  discovery smarter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>







      {/* About */}
      <section className="section py-5">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-lg-6">
              <span className="eyebrow">Who We Are</span>

              <h2 className="mt-3 mb-4">
                Empowering the Future of Creator Marketing
              </h2>

              <p>
                Collabo was founded with one goal—to simplify the way creators
                and brands work together. We believe authentic content creates
                stronger customer relationships than traditional advertising.
              </p>

              <p>
                Whether you're an emerging content creator or an established
                business, our platform helps you find the right partnerships,
                manage collaborations, and grow with confidence.
              </p>

              <p>
                We focus on transparency, creativity, and measurable results,
                making every collaboration valuable for both creators and
                businesses.
              </p>
            </div>

            <div className="col-lg-6">
            <img
            src="assets/about-1.jpg"
            alt="Creative Team"
            className="img-fluid rounded-4"
            />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="p-4 rounded-4 h-100 border">
                <img
                src="https://images.pexels.com/photos/8128190/pexels-photo-8128190.jpeg?_gl=1*15jzv7n*_ga*MTk1ODI3MDkyNi4xNzg1NTc0MTcy*_ga_8JE65Q40S6*czE3ODYwODgwMzckbzMkZzEkdDE3ODYwODgyNzMkajU5JGwwJGgw"
                alt="Our Mission"
                className="img-fluid rounded-4 mb-4"
                />

                <span className="eyebrow">Our Mission</span>

                <h3 className="mt-2 mb-3">
                  Building Meaningful Collaborations
                </h3>

                <p>
                  Our mission is to create Pakistan's most trusted creator
                  ecosystem where talented creators and innovative brands can
                  connect, collaborate, and grow together through authentic
                  partnerships.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 rounded-4 h-100 border">
                <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Our Vision"
                className="img-fluid rounded-4 mb-4"
                />

                <span className="eyebrow">Our Vision</span>

                <h3 className="mt-2 mb-3">
                  Leading the Creator Economy
                </h3>

                <p>
                  We envision a future where every creator has access to
                  meaningful opportunities and every brand can easily discover
                  authentic voices that inspire trust and drive real engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="eyebrow">Our Values</span>
            <h2 className="mt-3">What Drives Everything We Do</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-xl-3">
              <div className="p-4 rounded-4 border h-100 text-center">
                <div className="display-5 mb-3"><BsShieldCheck size={52} /></div>
                <h4>Trust</h4>
                <p>
                  Building reliable partnerships through transparency and
                  honesty.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="p-4 rounded-4 border h-100 text-center">
                <div className="display-5 mb-3"><BsLightbulb size={52} /></div>
                <h4>Innovation</h4>
                <p>
                  Constantly improving the creator experience with modern
                  technology.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="p-4 rounded-4 border h-100 text-center">
                <div className="display-5 mb-3"><BsGraphUpArrow size={52} /></div>
                <h4>Growth</h4>
                <p>
                  Helping creators and brands achieve sustainable success
                  together.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="p-4 rounded-4 border h-100 text-center">
                <div className="display-5 mb-3"><BsPeople size={52} /></div>
                <h4>Community</h4>
                <p>
                  Creating an inclusive platform where creativity can thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-lg-6 order-lg-2">
            <img
            src="https://images.pexels.com/photos/34987126/pexels-photo-34987126.jpeg?_gl=1*1edqh07*_ga*MTk1ODI3MDkyNi4xNzg1NTc0MTcy*_ga_8JE65Q40S6*czE3ODYwODgwMzckbzMkZzEkdDE3ODYwODg2OTUkajQ2JGwwJGgw"
            alt="Creator Community"
            className="img-fluid rounded-4"
            />
            </div>

            <div className="col-lg-6 order-lg-1">
              <span className="eyebrow">Why Collabo?</span>

              <h2 className="mt-3 mb-4">
                Designed for Modern Creators & Brands
              </h2>

              <ul className="list-unstyled">
                <li className="mb-3">
                  ✓ Verified creator profiles and quality partnerships.
                </li>

                <li className="mb-3">
                  ✓ Smarter campaign discovery and collaboration tools.
                </li>

                <li className="mb-3">
                  ✓ Transparent communication between creators and brands.
                </li>

                <li className="mb-3">
                  ✓ Secure and professional collaboration experience.
                </li>

                <li className="mb-3">
                  ✓ Built to support creators across every niche.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-lg-3">
              <h2>500+</h2>
              <p>Creators Joining</p>
            </div>

            <div className="col-6 col-lg-3">
              <h2>100+</h2>
              <p>Brand Partnerships</p>
            </div>

            <div className="col-6 col-lg-3">
              <h2>1000+</h2>
              <p>Campaign Opportunities</p>
            </div>

            <div className="col-6 col-lg-3">
              <h2>24/7</h2>
              <p>Platform Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-5 bg-ink">
        <div className="container text-center">
          <span className="eyebrow">Join the Community</span>

          <h2 className="mt-3">
            Start Your Collaboration Journey Today
          </h2>

          <p
            className="mx-auto mt-3"
            style={{ maxWidth: "650px", color: "#c9c6ba" }}
          >
            Whether you're a creator looking for exciting brand partnerships or
            a business searching for authentic influencers, Collabo is the place
            where successful collaborations begin.
          </p>

          <Link href="/apply" className="btn btn-primary mt-4" style={{background:"radial-gradient(circle at -70% 78%, #fdf497 0% 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)"}}>
            Become a Creator
          </Link>
        </div>
      </section>
    </>
  );
}