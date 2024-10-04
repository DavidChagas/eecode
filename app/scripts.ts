
export type ScriptType = {
  id: string;
  name: string;
  template: string;
};


export function scripts(): ScriptType[] {
  return [
    {
      id: 'script1',
      name: 'Script base',
      template: `
      // Definir as coordenadas do ponto central
      var point = ee.Geometry.Point({longitude}, {latitude});

      // Criar um buffer de {buffer} metros ao redor do ponto
      var bufferedArea = point.buffer({buffer});

      // Selecionar a coleção de imagens do Sentinel-2
      var collection = ee.ImageCollection('COPERNICUS/S2')
                        .filterBounds(bufferedArea)
                        .filterDate('{startDate}', '{endDate}')
                        .sort('CLOUD_COVER')
                        .first();

      // Visualização em cores reais
      var trueColor = collection.visualize({
        bands: ['B4', 'B3', 'B2'],
        min: 0,
        max: 3000
      });

      // Adicionar a imagem ao mapa
      Map.centerObject(point, 17);
      Map.addLayer(trueColor, {}, 'True Color (Sentinel-2)');
      
      // Adicionar o buffer ao mapa
      Map.addLayer(ee.Image().paint(bufferedArea, 0, 2), {palette: '{bufferColor}'}, 'Buffer de {buffer} metros');
      
      // Exportar a imagem
      Export.image.toDrive({
        image: trueColor,
        description: 'sentinel_image_{buffer}_meters_radius',
        scale: 1,
        region: bufferedArea,
        fileFormat: 'GEOTIFF'
      });
    `
    },
    {
      id: 'ndvi',
      name: 'Cálculo do NDVI',
      template: `
      // Cálculo do NDVI
      var point = ee.Geometry.Point([{longitude}, {latitude}]);
      var bufferedArea = point.buffer({buffer}); // Buffer do ponto

      var collection = ee.ImageCollection('COPERNICUS/S2')
                        .filterBounds(bufferedArea)
                        .filterDate('{startDate}', '{endDate}')
                        .sort('CLOUD_COVER')
                        .first();

      var ndvi = collection.normalizedDifference(['B8', 'B4']).rename('NDVI');

      Map.centerObject(point, 17);
      Map.addLayer(ndvi, {min: 0, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
    `
    },
    {
      id: 'land_change',
      name: 'Análise de Mudanças de Uso do Solo',
      template: `
      // Análise de Mudanças de Uso do Solo
      var area = ee.Geometry.Rectangle([-51.9025, -28.8345, -51.8995, -28.8315]); // Defina a área de interesse

      var collection = ee.ImageCollection('COPERNICUS/S2')
                        .filterBounds(area)
                        .filterDate('{startDate}', '{endDate}')
                        .sort('CLOUD_COVER');

      // Imagem mais recente
      var recent = collection.filterDate('{recentStartDate}', '{recentEndDate}').first();

      // Imagem mais antiga
      var older = collection.filterDate('{olderStartDate}', '{olderEndDate}').first();

      // Calcular a diferença entre as duas imagens
      var change = recent.subtract(older).divide(older).rename('Change');

      Map.centerObject(area, 17);
      Map.addLayer(change, {min: -0.5, max: 0.5, palette: ['red', 'white', 'green']}, 'Mudança de Uso do Solo');
    `
    }
  ];

}