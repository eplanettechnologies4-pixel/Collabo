export default function BlogHero(){

return(
<section className="section pb-3 bg-ink blog-main"  style={{paddingTop:"10rem"}}>
    <div className="container">

        <span 
        className="eyebrow"
        style={{color:"var(--lime)",width:"100%",justifyContent:"center"}}
        >
        The COLLABO Blog
        </span>


        <h1 className="mt-3 text-center">
        Everything creators and brands need to know about growing online in Pakistan.
        </h1>


        <p 
        className="fs-lead mt-3 text-center"
        style={{
            color:"#c9c6ba",
            maxWidth:"60ch",
            margin:"auto",
            
        }}
        >
        Practical tips for creators, useful ideas for brands,
        and real insights into influencer marketing in Pakistan.
        </p>


    </div>
</section>
)

}