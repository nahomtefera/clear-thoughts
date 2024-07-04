/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {};
export default withPWA({
    // Your PWA configuration options here
    dest: 'public',
    register: true,
    skipWaiting: true,
});
  