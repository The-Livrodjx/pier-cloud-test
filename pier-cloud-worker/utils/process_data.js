export default function processData(vendors, clients, products, sales) {
  // Objeto acumulador por vendedor
  const vendorSales = {};

  sales.forEach((sale) => {
    const { vendedor_id, produto_id, cliente_id } = sale;

    // Se caso não exista, cria um acumulo por ID do vendedor
    if (!vendorSales[vendedor_id]) {
      vendorSales[vendedor_id] = {
        id: vendedor_id,
        nome: vendors.find((v) => v.id === vendedor_id)?.nome || "",
        telefone: vendors.find((v) => v.id === vendedor_id)?.telefone || "",
        vendas: [],
      };
    }

    // Filtra cada cliente que tem associação com a venda
    const cliente = clients.find((c) => c.id === cliente_id);
    const clienteInfo = cliente
      ? {
          id: cliente.id,
          nome: cliente.nome,
          telefone: cliente.telefone,
          email: cliente.email,
        }
      : null;

    // Filtra cada produto que tem associação com a venda
    const produto = products.find((p) => p.id === produto_id);
    const produtoInfo = produto
      ? {
          id: produto.id,
          nome: produto.nome,
          preco: parseFloat(produto.preco),
          sku: produto.sku,
        }
      : null;
    
    // Se caso já exista o acumulo do vendedor específico, ele apenas adiciona mais 
    // um produto / cliente associado
    if (!vendorSales[vendedor_id].vendas.some((v) => v.id === produto_id)) {
      vendorSales[vendedor_id].vendas.push({
        produto: produtoInfo,
        cliente: clienteInfo,
      });
    }
  });

  // Ordenação
  const sortedVendors = Object.values(vendorSales).sort(
    (a, b) => b.vendas.length - a.vendas.length
  );

  return sortedVendors;
}
