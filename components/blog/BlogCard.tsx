import Link from "next/link";
interface BlogCardProps{
    post:{
        slug:string;
        image:string;
        categoryLabel:string;
        title:string;
        date:string;
        readTime:string;
    }
}


export default function BlogCard({post}:BlogCardProps){

return(

<div className="col-md-4 m-0">

<Link
href={`/blog/${post.slug}`}
className="text-decoration-none text-reset"
>

<div className="blog-card">


<div
className="blog-card-thumb"
style={{
backgroundImage:`url(${post.image})`
}}
></div>



<div className="p-4">

<span className="blog-cat-tag">
{post.categoryLabel}
</span>


<h5 className="mt-2 mb-2">
{post.title}
</h5>


<p className="blog-meta mb-0">
{post.date} · {post.readTime}
</p>


</div>


</div>

</Link>

</div>

)

}