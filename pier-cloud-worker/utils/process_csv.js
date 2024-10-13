import * as path from "path";
import * as csv from "csv-writer";

async function criarArquivoCsv(writer, vendedor, vendas) {
  let records = [];

  // Processar cada venda e adicionar aos records
  // Preferi manter dessa forma para facilitar o visualização (podia ser um map)
  vendas.forEach((venda) => {
    const produto = venda.produto;
    const cliente = venda.cliente;

    records.push({
      id_vendedor: vendedor.id_vendedor,
      nome_vendedor: vendedor.nome_vendedor,
      telefone_vendedor: vendedor.telefone_vendedor,
      id_cliente: cliente.id,
      nome_cliente: cliente.nome,
      telefone_cliente: cliente.telefone,
      email_cliente: cliente.email || "",
      id_produto: produto.id,
      nome_produto: produto.nome,
      preco_produto: produto.preco,
      sku_produto: produto.sku,
    });
  });

  // Mandando para o writer escrever todos os records no arquivo .csv
  await writer.writeRecords(records);

  return records.length > 0
    ? "CSV arquivo criado com sucesso."
    : "Nenhum registro foi adicionado.";
}

export default async function criarArquivosCsv(dados) {
  try {
    // Para cada vendedor acumulado, faremos um for criando seu arquivo .csv e passando os dados
    // Para a função acima
    for (const vendedor of Object.values(dados)) {
      const nomeArquivo = `vendas_vendedor_${vendedor.id}.csv`;
      // Inicia csv-writer aqui
      const writer = csv.createObjectCsvWriter({
        path: path.resolve("./csv/", nomeArquivo),
        header: [
          { id: "id_vendedor", title: "ID do Vendedor" },
          { id: "nome_vendedor", title: "Nome do Vendedor" },
          { id: "telefone_vendedor", title: "Telefone do Vendedor" },
          { id: "id_cliente", title: "ID do Cliente" },
          { id: "nome_cliente", title: "Nome do Cliente" },
          { id: "telefone_cliente", title: "Telefone do Cliente" },
          { id: "email_cliente", title: "E-mail do Cliente" },
          { id: "id_produto", title: "ID do Produto" },
          { id: "nome_produto", title: "Nome do Produto" },
          { id: "preco_produto", title: "Preço do Produto" },
          { id: "sku_produto", title: "SKU do Produto" },
        ],
      });

      // Chama função acima passando o csv-writer, dados do vendedor e suas vendas 
      // Vendas => array contendo produtos e clientes associados
      await criarArquivoCsv(writer, {
        id_vendedor: vendedor.id,
        nome_vendedor: vendedor.nome,
        telefone_vendedor: vendedor.telefone
      } ,vendedor.vendas);

      console.log(`Arquivo CSV criado: ${nomeArquivo}`);
    }
  } catch (error) {
    console.error("Erro ao criar arquivos CSV:", error);
  }
}
