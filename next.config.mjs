/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: 'static/audio/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
};

export default nextConfig;