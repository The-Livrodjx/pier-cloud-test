import axios from 'axios';

export default async function fetchSales() {
  try {
    // Fazer requisição à API de vendas
    const response = await axios.get(process.env.SALES_API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter ou publicar dados das vendas:', error);
    return [];
  }
}