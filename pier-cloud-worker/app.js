import * as dotenv from "dotenv";
import { connect, StringCodec } from 'nats';
import fetchClients from "./utils/retrieve_clients.js";
import fetchProducts from "./utils/retrieve_products.js";
import fetchSales from "./utils/retrieve_sales.js";
import processData from "./utils/process_data.js";
import criarArquivosCsv from "./utils/process_csv.js";

dotenv.config();

async function startWorker() {
  // Conectar ao servidor NATS
  const nc = await connect({ servers: 'localhost:4222' });
  const sc = StringCodec();
  const sub = nc.subscribe('vendors');

  // Função para processar as mensagens recebidas do Nats
  async function processMessage(msg) {
    try {
      // Decodificar o payload
      const data = JSON.parse(sc.decode(msg.data));
      
      // Se vier vazio forçar erro para cair no catch
      if(data.length == 0) {
        throw Error("Nenhuma mensagem encontrada");
      }

      // Faz requisição à API de Clientes
      const clients = await fetchClients();
      // Faz requisição à API de Produtos
      const products = await fetchProducts();
      // Faz requisição à API de Vendas
      const sales = await fetchSales();
      
      // Componentizei essa função para que ficasse melhor caso precisasse de manutenção
      const processedData = processData(data, clients, products, sales);
      
      // Enviar Dados processados para criar CSV
      await criarArquivosCsv(processedData);
      
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
    }
  }

  // Para cada mensagem recebida...processaremos ela, nesse caso é desnecessário pois é apenas um array
  // mas conforme o sistema ficasse maior poderia ser utilizado 
  for await (const msg of sub) {
    await processMessage(msg);
  }

  await nc.close();
}

startWorker();
