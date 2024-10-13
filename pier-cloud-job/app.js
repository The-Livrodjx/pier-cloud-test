import { connect, StringCodec } from "nats";
import axios from "axios";

async function startService() {
  // Conectar ao servidor NATS
  const nc = await connect({ servers: "localhost:4222" });
  const sc = StringCodec();

  async function fetchAndPublishVendors() {
    try {
      // Requisição à API de vendedores
      const response = await axios.get(process.env.VENDORS_API_URL);
      console.log(response.data);
      // Enviar ao Nats os dados pegados na API
      nc.publish("vendors", sc.encode(JSON.stringify(response.data)));

      console.log("Dados dos vendedores publicados com sucesso!");
    } catch (error) {
      console.error("Erro ao obter ou publicar dados dos vendedores:", error);
    }
  }

  // Simulação de CRON JOB
  setInterval(fetchAndPublishVendors, 60000); // 60 segundos

  nc.closed()
    .then(() => {
      console.log("Conexão NATS fechada.");
    })
    .catch((err) => {
      console.error("Erro ao fechar a conexão NATS:", err);
    });
}

startService();
