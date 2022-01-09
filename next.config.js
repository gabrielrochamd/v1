/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['github.com']
  },
  reactStrictMode: true,
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}
