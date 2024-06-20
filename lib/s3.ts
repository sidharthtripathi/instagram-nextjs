import aws from 'aws-sdk'
aws.config.update({
    accessKeyId : process.env.AWSACCESSKEYID,
    secretAccessKey : process.env.AWSSECRETACCESSKEY,
    region  : process.env.AWSREGION
})
const s3 = new aws.S3({
    region : process.env.AWSREGION
})

const bucketName = process.env.BUCKETNAME

export async function getPutSignedURL(key:string) {
    try {
        const url = await s3.getSignedUrl('putObject',{
            Bucket : bucketName,
            Key : key
        })
        return url;
    } catch (error) {
        throw error;
    }
}