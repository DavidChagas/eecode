/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/eecode', // O caminho base, para que os links e assets estejam corretos no GitHub Pages
  trailingSlash: true, // Garante que todas as páginas exportadas terminem com '/'
  images: {
    unoptimized: true, // Desabilita a otimização de imagens (necessário para exportação estática)
  },
};

export default nextConfig;