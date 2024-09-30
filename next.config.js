module.exports = {
  output: 'export',
  trailingSlash: true, // Isso garante que as rotas terminem com "/" no export estático
  basePath:'', // Ajuste para o nome do subdiretório, se necessário
  assetPrefix: '',
  images: {
    unoptimized: true, // Necessário para export estático no GitHub Pages
  },
};