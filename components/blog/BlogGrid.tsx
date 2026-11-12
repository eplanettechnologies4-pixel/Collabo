"use client";

import {useState} from "react";
import BlogCard from "./BlogCard";
import { BLOG_POSTS } from "@/data/blogData";

export default function BlogGrid(){


const [filter,setFilter]=useState("all");


const filters=[
{
name:"All Articles",
value:"all"
},
{
name:"UGC & Content Ideas",
value:"ugc"
},
{
name:"Understanding COLLABO Score",
value:"score"
},
{
name:"For Nano & Micro Creators",
value:"creators"
},
{
name:"Creator Rewards",
value:"rewards"
},
{
name:"Marketing for Brands",
value:"brands"
}

]



const posts=BLOG_POSTS.filter(post=>{

return filter==="all" || post.category===filter

})



return(

<section className="section pt-5 pb-5">

<div className="container">


<div className="d-flex flex-wrap gap-2 mb-5">


{
filters.map(item=>(

<span

key={item.value}

onClick={()=>setFilter(item.value)}

className={`chip ${
filter===item.value ? "active":""
}`}

>

{item.name}

</span>


))

}


</div>



<div className="row g-4" style={{rowGap:"20px"}}>


{
posts.map(post=>(

<BlogCard 
key={post.slug}
post={post}
/>

))

}


</div>


</div>

</section>


)

}