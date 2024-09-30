const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath: isProd ? '/eecode' : '', // Use o basePath apenas em produção
  trailingSlash: true, // Garante que as URLs terminem com "/"
  images: {
    unoptimized: true, // Necessário para export estático
  },
};