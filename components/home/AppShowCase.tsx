    import Image from "next/image";

        
        export default function AppShowCase() {
        return (
        <>
        <section className="section bg-ink app-showcase">
        <div className="container">
        <div className="row align-items-center gy-5">
        <div className="col-lg-6">
        <span className="eyebrow" style={{color:"var(--lime)"}}>The COLLABO App</span>
        <h2 className="mt-3 mb-3" style={{fontSize:"clamp(2.4rem,5.5vw,4.2rem)"}}>Your influence,<br/>your income.</h2>
        <p className="fs-lead" style={{color:"#c9c6ba",maxWidth:"48ch"}}>Everything you need as a creator, in one place. Find campaigns, apply for opportunities, keep track of your earnings, and access brand perks directly through the COLLABO app.
        </p>
        <div className="d-flex flex-wrap gap-3 mt-4">
        <a href="#" className="app-store-btn">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" id="app-store" data-name="Flat Color" className="icon flat-color"><path id="primary" d="M22,17a1,1,0,0,1-1,1H19.48l1.39,2.51a1,1,0,0,1-.38,1.36A1,1,0,0,1,20,22a1,1,0,0,1-.87-.51L13.42,11.21a1,1,0,0,1,1.74-1L18.37,16H21A1,1,0,0,1,22,17Zm-9-1H7.92l7-12.51a1,1,0,0,0-1.74-1L12,4.54l-1.13-2a1,1,0,1,0-1.74,1L10.86,6.6,5.63,16H3a1,1,0,0,0,0,2H4.52L3.13,20.51a1,1,0,0,0,.38,1.36A1,1,0,0,0,4,22a1,1,0,0,0,.87-.51L6.81,18H13a1,1,0,0,0,0-2Z" style={{fill: "white"}}/></svg>
        </span>
        <span>Download on the<br/><strong>App Store</strong></span>
        </a>
        <a href="#" className="app-store-btn">
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20px" height="20px" viewBox="0 0 24 24"><path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.729c.6-.336.929-.812.929-1.34 0-.527-.329-1.004-.928-1.34l-2.783-1.563-3.133 3.132 2.841 2.84zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098L4.1 4.002zm8.854 8.855L4.902 20.91c.154.059.32.09.495.09.312 0 .637-.092.968-.276l9.255-5.197-2.666-2.67z"/></svg>
        </span>
        <span>Get it on<br/><strong>Google Play</strong></span>
        </a>
        </div>
        <div className="svg-color-name">
        <a href="/eligibility" className="d-inline-block mt-4 fw-semibold" style={{color:"var(--paper)",textDecoration:"underline",textUnderlineOffset:"4px"}}>Check if you're eligible 
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="white"/>
        </svg>
        </div>
        </div>
        <div className="col-lg-6 custom-bottom-showcase-image">
       
       <Image
          src="/assets/Minimal-App-Icon-Mockup.jpg"
          alt="show case"
          width={700}
          height={700}
          priority
          style={{borderRadius:"20px",boxShadow:" 0 0 30px #fff"}}
          />
        
        </div>
        </div>
        </div>
        </section>
        </>
        );
        }