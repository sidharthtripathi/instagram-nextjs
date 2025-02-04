import React from "react"

type ImageProps = {
    className? : string | "",
    imgId : string
}
export function Image({className,imgId} : ImageProps){
    const imgHostServer = process.env.IMAGE_SERVING_HOST;
    return <img src={`https://${imgHostServer}/${imgId}`} className={className}/>
}


