// eslint-disable-next-line import/default -- Next.js requires default export
import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ['react-tweet'],
};

// eslint-disable-next-line import/no-default-export  -- Next.js requires default export
export default withNextra(nextConfig);
