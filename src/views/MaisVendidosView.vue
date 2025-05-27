<template>
  <div class="flex w-full min-h-screen bg-gray-100 dark:bg-gray-800">
    <main class="flex-1 p-10">
      <div class="flex justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard de Produtos
        </h1>
      </div>

      <div class="mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">
            Insights
          </h2>
          <button
            @click="toggleInsights"
            class="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
          >
            {{ insightsMinimized ? "Expandir" : "Minimizar" }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
                v-if="!insightsMinimized"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
                v-if="insightsMinimized"
              />
            </svg>
          </button>
        </div>

        <div v-if="!insightsMinimized">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Total de Produtos
                  </p>
                  <h3
                    class="text-2xl font-bold text-blue-600 dark:text-blue-300"
                  >
                    {{ metricas.totalProdutos }}
                  </h3>
                </div>
                <div class="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>+5% este mês</span>
              </div>
            </div>

            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg shadow">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Valor Total em Estoque
                  </p>
                  <h3
                    class="text-2xl font-bold text-green-600 dark:text-green-300"
                  >
                    R$ {{ metricas.valorEstoque }}
                  </h3>
                </div>
                <div class="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-600 dark:text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>+12% este mês</span>
              </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Vendas Recentes
                  </p>
                  <h3
                    class="text-2xl font-bold text-yellow-600 dark:text-yellow-300"
                  >
                    {{ metricas.vendasRecentes }}
                  </h3>
                </div>
                <div class="bg-yellow-100 dark:bg-yellow-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-600 dark:text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>+8% este mês</span>
              </div>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Produto Mais Vendido
                  </p>
                  <h3
                    class="text-lg font-bold text-purple-600 dark:text-purple-300"
                  >
                    {{ metricas.produtoMaisVendido }}
                  </h3>
                </div>
                <div class="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-purple-600 dark:text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ metricas.quantidadeMaisVendido }} unidades vendidas
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              >
                Vendas por Categoria
              </h3>
              <div class="h-64">
                <canvas ref="vendasPorCategoriaChart"></canvas>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              >
                Tendência de Vendas
              </h3>
              <div class="h-64">
                <canvas ref="tendenciaVendasChart"></canvas>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              >
                Produtos em Destaque
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead>
                    <tr>
                      <th
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Produto
                      </th>
                      <th
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Categoria
                      </th>
                      <th
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Vendas
                      </th>
                      <th
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Crescimento
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr
                      v-for="(produto, index) in produtosDestaque"
                      :key="index"
                    >
                      <td
                        class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white"
                      >
                        {{ produto.nome }}
                      </td>
                      <td
                        class="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                      >
                        {{ produto.categoria }}
                      </td>
                      <td
                        class="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                      >
                        {{ produto.vendas }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          :class="
                            produto.crescimento > 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          "
                          class="flex items-center"
                        >
                          <svg
                            v-if="produto.crescimento > 0"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                          {{ produto.crescimento > 0 ? "+" : ""
                          }}{{ produto.crescimento }}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3
                class="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              >
                Alertas e Recomendações
              </h3>
              <div class="space-y-4">
                <div
                  v-for="(alerta, index) in alertas"
                  :key="index"
                  :class="`bg-${alerta.tipo}-50 dark:bg-${alerta.tipo}-900 p-3 rounded-lg border-l-4 border-${alerta.tipo}-500`"
                >
                  <div class="flex">
                    <div
                      :class="`text-${alerta.tipo}-500 dark:text-${alerta.tipo}-300 mr-3`"
                    >
                      <svg
                        v-if="alerta.tipo === 'green'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <svg
                        v-else-if="alerta.tipo === 'yellow'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        :class="`text-${alerta.tipo}-700 dark:text-${alerta.tipo}-300 font-medium`"
                      >
                        {{ alerta.titulo }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        {{ alerta.mensagem }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table
        class="w-full text-sm text-left rtl:text-gray-700 dark:text-gray-300"
      >
        <thead
          class="text-xs text-white uppercase bg-blue-600 dark:bg-blue-800"
        >
          <tr>
            <th
              scope="col"
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              ID
            </th>
            <th
              scope="col"
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              Nome
            </th>
            <th
              scope="col"
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              Preço
            </th>
            <th
              scope="col"
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              Categoria
            </th>
            <th
              scope="col"
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              Quantidade Venda
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              {{ produto.id }}
            </td>
            <td
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              {{ produto.nome }}
            </td>
            <td
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              {{ produto.preco }}
            </td>
            <td
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              {{ produto.categoria }}
            </td>
            <td
              class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
            >
              {{ produto.quantidadeVenda }}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

const router = useRouter();

const produtos = ref([]);
const offset = ref(0);
const limit = 20;
const insightsMinimized = ref(false);

const vendasPorCategoriaChart = ref(null);
const tendenciaVendasChart = ref(null);

const metricas = ref({
  totalProdutos: 156,
  valorEstoque: "487.350,00",
  vendasRecentes: 342,
  produtoMaisVendido: "PlayStation 5 Digital Edition",
  quantidadeMaisVendido: 321,
});

const produtosDestaque = ref([
  {
    nome: "PlayStation 5 Digital Edition",
    categoria: "Games",
    vendas: 321,
    crescimento: 15,
  },
  {
    nome: 'Smart TV LG 55" 4K',
    categoria: "Eletrônicos",
    vendas: 245,
    crescimento: 8,
  },
  {
    nome: "iPhone 14 Pro 256GB",
    categoria: "Celulares",
    vendas: 198,
    crescimento: 5,
  },
  {
    nome: "Notebook Dell Inspiron",
    categoria: "Informática",
    vendas: 156,
    crescimento: -3,
  },
  {
    nome: "Câmera Canon EOS Rebel T7",
    categoria: "Câmeras",
    vendas: 98,
    crescimento: 12,
  },
]);

const alertas = ref([
  {
    tipo: "green",
    titulo: "Aumento nas vendas",
    mensagem:
      "PlayStation 5 Digital Edition teve aumento de 15% nas vendas este mês.",
  },
  {
    tipo: "yellow",
    titulo: "Categoria em queda",
    mensagem:
      "A categoria Informática está com 3% de queda. Considere promoções.",
  },
  {
    tipo: "red",
    titulo: "Estoque baixo",
    mensagem: "3 produtos estão com estoque abaixo do mínimo recomendado.",
  },
]);

const dadosVendasPorCategoria = {
  labels: ["Games", "Eletrônicos", "Celulares", "Informática", "Câmeras"],
  datasets: [
    {
      label: "Vendas",
      data: [850, 720, 650, 480, 320],
      backgroundColor: [
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const dadosTendenciaVendas = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Vendas Mensais",
      data: [1200, 1350, 1250, 1420, 1550, 1650],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      tension: 0.4,
    },
  ],
};

const toggleInsights = () => {
  insightsMinimized.value = !insightsMinimized.value;
};

const fetchProduto = async () => {
  try {
    const response = await axios.get(`https://localhost:7256/v1/produtos`);
    const results = response.data;
    produtos.value = results;
    console.log(results);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    produtos.value = [
      {
        id: "MLB1234567890",
        nome: "PlayStation 5 Digital Edition",
        preco: "R$ 3999.99",
        categoria: "Games",
        quantidadeVenda: 321,
      },
      {
        id: "MLB2468013579",
        nome: 'Smart TV LG 55" 4K',
        preco: "R$ 2799.99",
        categoria: "Eletrônicos",
        quantidadeVenda: 245,
      },
      {
        id: "MLB9876543210",
        nome: "iPhone 14 Pro 256GB",
        preco: "R$ 7999.99",
        categoria: "Celulares",
        quantidadeVenda: 198,
      },
      {
        id: "MLB1357924680",
        nome: "Notebook Dell Inspiron",
        preco: "R$ 4599.99",
        categoria: "Informática",
        quantidadeVenda: 156,
      },
      {
        id: "MLB2468013570",
        nome: "Câmera Canon EOS Rebel T7",
        preco: "R$ 2499.99",
        categoria: "Câmeras",
        quantidadeVenda: 98,
      },
    ];
  }
};

const initCharts = async () => {
  await nextTick();

  if (vendasPorCategoriaChart.value) {
    new Chart(vendasPorCategoriaChart.value, {
      type: "bar",
      data: dadosVendasPorCategoria,
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  if (tendenciaVendasChart.value) {
    new Chart(tendenciaVendasChart.value, {
      type: "line",
      data: dadosTendenciaVendas,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
};

const irParaCadastro = () => {
  router.push("/cadastro");
};

onMounted(async () => {
  await fetchProduto();
  initCharts();
});
</script>
