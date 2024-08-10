import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
const s3 = new S3Client({
  region: process.env.AWSREGION,
  credentials : {
    accessKeyId: process.env.AWSACCESSKEYID as string,
    secretAccessKey: process.env.AWSSECRETACCESSKEY as string
  }

})


const bucketName = process.env.BUCKETNAME;

export async function getPutSignedURL(key: string) {
  try {
    const cmd = new PutObjectCommand({
      Bucket : bucketName,
      Key : key
    })
    const url = await getSignedUrl(s3,cmd);
    return url;
  } catch (error) {
    throw error;
  }
}
