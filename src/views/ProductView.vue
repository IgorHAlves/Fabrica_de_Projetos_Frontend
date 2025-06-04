<template>
  <div class="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-800">
    <main class="flex-1 p-10">
      <div class="flex justify-end mb-6">
        <router-link to="/cadastroProduto">
          <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            + Cadastrar Produto
          </button>
        </router-link>
      </div>

      <table class="w-full text-sm text-left rtl:text-gray-700 dark:text-gray-300">
        <thead class="text-xs text-white uppercase bg-blue-600 dark:bg-blue-800">
          <tr>
            <th scope="col" class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              ID
            </th>
            <th scope="col" class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              Nome
            </th>
            <th scope="col" class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              Preço
            </th>
            <th scope="col" class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              Categoria
            </th>
            <th scope="col" class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              Quantidade Venda
            </th>
            <th scope="col" class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">

            </th>
          </tr>
        </thead>

        <!--Exibição dos produtos-->

        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td class="px-10 py-5 border-l border-r border-b border-blue-400 dark:border-blue-700">
               {{ produto.id }}
            </td>
            <td class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              {{ produto.nome }}
            </td>
            <td class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
               {{ produto.preco }} 
            </td>
            <td class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
               {{ produto.categoria.nome }} 
            </td>
            <td class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
               {{ produto.quantidadeVenda }} 
            </td>
            <td class=" flex justify-between px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700">
              <router-link :to="`/editar/${produto.id}`">
                <button class="w-20 h-8 bg-blue-700 rounded lg">Editar</button>
              </router-link>
              <button @click="excluirProduto(produto.id)" class="w-20 h-8 bg-red-700 rounded lg">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <div class="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
      <button @click="prevPage"
        class="mr-4 bg-green-500 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Voltar
      </button>
      <button @click="nextPage" class="bg-green-500 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


const excluirProduto = async(id) => {
  const confirmacao = confirm("Após exclusão os dados não poderão ser recuperados")
  if (!confirmacao) {
    return false;
  }
  try {
    await axios.delete(`https://localhost:7256/v1/produtos/${id}`)
      alert("Produto excluído com sucesso!");
      fetchProduto();

  } catch (error) {
    console.error("erro ao excluir item", error);
    alert("Erro ao excluir produto.");
  }
}

const router = useRouter();

const produtos = ref([]);
const offset = ref(0);
const limit = 20;

const fetchProduto = async () => {
  try {
    const response = await axios.get(
      `https://localhost:7256/v1/produtos/offset/${offset.value}/limit/${limit}`
    );
    const results = response.data.data;
    produtos.value = results;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

const nextPage = () => {
  offset.value += limit;
  fetchProduto();
};

const prevPage = () => {
  if (offset.value > 0) {
    offset.value -= limit;
    fetchProduto();
  }
};

onMounted(fetchProduto);
</script>
