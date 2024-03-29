module.exports = {
  reactStrictMode: true,
  experimental: {
    css: true
  },
  images: {
    loader: 'imgix',
    path: '/',
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
}
