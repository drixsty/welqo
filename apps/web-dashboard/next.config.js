const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any specific dashboard config here
};

module.exports = withNextIntl(nextConfig);
