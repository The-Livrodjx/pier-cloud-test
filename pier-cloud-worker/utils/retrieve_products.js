import axios from 'axios';

export default async function fetchProducts() {
  try {
    // Fazer requisição à API de clientes
    const response = await axios.get(process.env.PRODUCTS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter ou publicar dados dos clientes:', error);
    return [];
  }
}