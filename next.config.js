const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  trailingSlash: true, // Isso garante que as rotas terminem com "/" no export estático
  basePath: isProd ? '/eecode' : '', // Ajuste para o nome do subdiretório, se necessário
  assetPrefix: isProd ? '/eecode/' : '',
  images: {
    unoptimized: true, // Necessário para export estático no GitHub Pages
  },
};