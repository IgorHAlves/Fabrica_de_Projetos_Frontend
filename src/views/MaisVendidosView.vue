<template>
  <div class="flex w-full min-h-screen bg-gray-100 dark:bg-gray-800">
    <main class="flex-1 p-6 md:p-10"> 
      <div class="flex justify-between items-center mb-6"> 
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard de Vendas   
        </h1>
      </div>

      <!-- Estado de Carregamento -->
      <div
        v-if="loading"
        class="flex flex-col justify-center items-center h-64 text-gray-600 dark:text-gray-300"
      >
        <svg class="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Carregando dados do dashboard...
      </div>

      <!-- Estado de Erro -->
      <div
        v-else-if="error"
        class="flex justify-center items-center h-64 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative shadow-md"
        role="alert"
      >
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Área de Conteúdo Principal -->
      <div v-else>
        <!-- Seção de Métricas Simplificada -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> <!-- Alterado para grid-cols-2 -->
          <!-- Total de Produtos Listados -->
          <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow-md flex items-center">
             <div class="bg-purple-100 dark:bg-purple-800 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             </div>
             <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Produtos Listados
                </p>
                <h3 class="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  {{ metricas.totalProdutosListados }}
                </h3>
              </div>
          </div>

          <!-- Total de Unidades Vendidas -->
           <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-md flex items-center">
             <div class="bg-blue-100 dark:bg-blue-800 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>
             </div>
             <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Total de Unidades Vendidas
                </p>
                <h3 class="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  {{ metricas.totalVendido }}
                </h3>
              </div>
          </div>

          <!-- Card de Valor Total em Estoque REMOVIDO -->

        </div>

        <!-- Seção do Gráfico -->
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
           <div class="h-80 md:h-96">
              <canvas ref="vendasPorCategoriaChart"></canvas>
           </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

// --- Configuração --- 
const API_BASE_URL = "https://localhost:7256/v1"; 

// --- Refs --- 
const produtos = ref([]);
const loading = ref(true);
const error = ref(null); 
const vendasPorCategoriaChart = ref(null); 
let chartInstance = null; 

// Métricas simplificadas (sem valorEstoque)
const metricas = ref({
  totalProdutosListados: 0, 
  totalVendido: 0, 
});

const dadosVendasPorCategoria = ref({
  labels: [],
  datasets: [
    {
      label: "Quantidade Vendida", 
      data: [],
      backgroundColor: [
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)" 
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1,
    },
  ],
});

// --- Chamadas API --- 
const fetchProdutosEPorCategoria = async () => {
  try {
    const responseProdutos = await axios.get(`${API_BASE_URL}/produtos/offset/0/limit/1000`);
    const results = responseProdutos.data?.data || []; 
    produtos.value = results;

    // Calcula apenas o total de produtos listados
    metricas.value.totalProdutosListados = results.length; 

    // Cálculo do valorEstoque REMOVIDO

    // Processa os dados para o gráfico de categorias
    atualizarDadosVendasPorCategoria(results);

  } catch (err) {
    console.error("Erro ao buscar lista de produtos:", err);
    throw new Error("Falha ao carregar dados dos produtos.");
  }
};

const fetchTotalVendido = async () => {
   try {
    const responseTotalVendido = await axios.get(`${API_BASE_URL}/produtos/quantidadetotalvendida`);
    metricas.value.totalVendido = responseTotalVendido.data?.data?.totalVendido || 0; 
   } catch (err) {
     console.error("Erro ao buscar total vendido:", err);
     throw new Error("Falha ao carregar total de vendas.");
   }
};


// --- Processamento de Dados --- 
const atualizarDadosVendasPorCategoria = (produtosParaProcessar) => {
  const categorias = {};
  produtosParaProcessar.forEach((prod) => {
    const categoriaNome = prod.categoria?.nome || "Sem Categoria"; 
    const quantidade = prod.quantidadeVenda || 0; 
    if (!categorias[categoriaNome]) {
      categorias[categoriaNome] = 0;
    }
    categorias[categoriaNome] += quantidade; 
  });
  dadosVendasPorCategoria.value.labels = Object.keys(categorias);
  dadosVendasPorCategoria.value.datasets[0].data = Object.values(categorias);
};

// --- Inicialização do Gráfico --- 
const initChart = async () => {
  // await nextTick(); // nextTick movido para onMounted para garantir execução após loading=false

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  if (vendasPorCategoriaChart.value) {
    const ctx = vendasPorCategoriaChart.value.getContext("2d");
    if (ctx) {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const textColor = isDarkMode ? '#FFFFFF' : '#333333';
        const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

        chartInstance = new Chart(ctx, {
        type: "bar", 
        data: dadosVendasPorCategoria.value, 
        options: {
          indexAxis: "y", 
          responsive: true, 
          maintainAspectRatio: false, 
          plugins: {
            legend: { display: false },
            title: { 
                display: true,
                text: 'Quantidade Vendida por Categoria',
                color: textColor, 
                font: { size: 16 }
            }
          },
          scales: { 
            x: { 
                grid: { color: gridColor }, 
                ticks: { color: textColor } 
            },
            y: { 
                grid: { display: false }, 
                ticks: { color: textColor } 
            },
          },
        },
      });
    } else {
        console.error("Não foi possível obter o contexto 2D do canvas.");
        error.value = "Erro ao renderizar o gráfico.";
    }
  } else {
      console.error("Referência do canvas 'vendasPorCategoriaChart' não encontrada.");
      error.value = "Erro ao encontrar o elemento do gráfico.";
  }
};

// --- Hook de Ciclo de Vida (com logs de depuração) --- 
onMounted(async () => {
  console.log("Componente montado, iniciando busca de dados...");
  loading.value = true;
  error.value = null;
  let apiSuccess = false; 

  try {
    await Promise.all([
        fetchProdutosEPorCategoria(),
        fetchTotalVendido()
    ]);
    console.log("Chamadas API concluídas com sucesso.");
    apiSuccess = true; 
  } catch (err) {
    console.error("Erro durante chamadas API:", err);
    error.value = err.message || "Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.";
    apiSuccess = false; 
  } finally {
    console.log("Bloco finally iniciado. Definindo loading = false.");
    loading.value = false;
    
    console.log("Aguardando nextTick...");
    await nextTick(); 
    console.log("nextTick concluído.");

    console.log(`Status antes de tentar inicializar gráfico: apiSuccess=${apiSuccess}, error.value=${error.value}`);
    console.log("Valor da ref vendasPorCategoriaChart:", vendasPorCategoriaChart.value);

    if (apiSuccess && !error.value) { 
        console.log("Condições para inicializar gráfico atendidas.");
        if (vendasPorCategoriaChart.value) { 
            console.log("Referência do gráfico encontrada. Tentando inicializar...");
            try {
                await initChart(); 
                console.log("initChart chamado com sucesso.");
            } catch (chartError) {
                console.error("Erro DENTRO de initChart:", chartError);
                error.value = "Erro ao inicializar o gráfico."; 
            }
        } else {
            console.warn("Referência do gráfico (vendasPorCategoriaChart.value) é nula ou indefinida neste ponto!");
            error.value = "Elemento do gráfico não encontrado no DOM."; 
        }
    } else {
        console.log("Inicialização do gráfico pulada. Motivo:", !apiSuccess ? "Falha na API" : "Erro definido");
    }
  }
});

</script>

<style scoped>
.h-80 { height: 20rem; } 
.h-96 { height: 24rem; } 
</style>

