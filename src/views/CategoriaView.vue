<template>
  <div class="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-800">
    <main class="flex-1 p-10">
      <div class="flex justify-end mb-6">
        <router-link to="/cadastroCategoria">
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            + Cadastrar Categoria
          </button>
        </router-link>
      </div>

      <div class="overflow-x-auto rounded-lg shadow-md">
        <table
          class="w-full text-sm text-left rtl:text-gray-700 dark:text-gray-300 border-collapse"
        >
          <thead
            class="text-xs text-white uppercase bg-blue-600 dark:bg-blue-800"
          >
            <tr>
              <th
                scope="col"
                class="px-10 py-5 border-r border-blue-400 dark:border-blue-700"
              >
                ID
              </th>
              <th scope="col" class="px-10 py-5 border-r border-l border-blue-400 dark:border-blue-700">Nome</th>
                            <th scope="col" class="px-10 py-5"></th>

            </tr>
          </thead>

          <tbody>
            <tr v-for="categoria in categorias" :key="categoria.id">
              <td
                class="px-10 py-5 border-r border-l border-b border-blue-400 dark:border-blue-700"
              >
                {{ categoria.id }}
              </td>
              <td
                class="px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700"
              >
                {{ categoria.nome }}
              </td>
              <td class=" flex justify-between px-10 py-5 border-r border-b border-blue-400 dark:border-blue-700 ">
              <router-link :to="`/editarCAtegoria/${categoria.id}`">
                <button class="w-20 h-8 bg-blue-700 rounded lg">Editar</button>
              </router-link>
              <button @click="excluirCategoria(categoria.id)" class="w-20 h-8 bg-red-700 rounded lg">Excluir</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <div
      class="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700"
    >
      <button
        @click="prevPage"
        class="mr-4 bg-green-500 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Voltar
      </button>
      <button
        @click="nextPage"
        class="bg-green-500 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const excluirCategoria = async(id) => {
  const confirmacao = confirm("Após exclusão os dados não poderão ser recuperados")
  if (!confirmacao) {
    return false;
  }
  try {
    await axios.delete(`https://localhost:7256/v1/categorias/${id}`)
      alert("Categoria excluída com sucesso!");
      fetchCategoria();

  } catch (error) {
    console.error("erro ao excluir categoria", error);
    alert("Erro ao excluir categoria.");
  }
}

const router = useRouter();
const categorias = ref([]);
const offset = ref(0);
const limit = 20;

const fetchCategoria = async () => {
  try {
    const response = await axios.get(
      `https://localhost:7256/v1/categorias/offset/${offset.value}/limit/${limit}`
    );
    const results = response.data.data;
    console.log(results);

    categorias.value = results;
    console.log(results);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  }
};

const nextPage = () => {
  offset.value += limit;
  fetchCategoria();
};

const prevPage = () => {
  if (offset.value > 0) {
    offset.value -= limit;
    fetchCategoria();
  }
};

onMounted(() => {
  fetchCategoria();
});
</script>
