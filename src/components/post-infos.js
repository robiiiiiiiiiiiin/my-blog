import React from "react"
import "./category.scss"
import Category from "./category"
import "./post-infos.scss"

const PostInfos = ({category, date}) => {

    return (
        <div className="post-infos"><Category category={category}></Category><span> - {date}</span></div>
    )

}

export default PostInfos