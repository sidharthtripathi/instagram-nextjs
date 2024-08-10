/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
const nextConfig = {
    images : {
        domains : ["instaprojectpics.s3.ap-south-1.amazonaws.com"]
    }
};
if(process.env.NODE_ENV === 'development') {
       await setupDevPlatform();
}
export default nextConfig;
