import React from "react"

type ImageProps = {
    className? : string | "",
    imgId : string
}
export function Image({className,imgId} : ImageProps){
    const imgHostServer = process.env.IMG_HOST_SERVER;
    return <img src={`${imgHostServer}/${imgId}`} className={className}/>
}


