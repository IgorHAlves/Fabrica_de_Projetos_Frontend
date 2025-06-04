<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-emerald-700 to-sky-500">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
      <h2 class="text-4xl font-extrabold text-center mb-6 text-blue-700">
        Editar Categoria
      </h2>
      <form @submit.prevent="atualizacaoDados()">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1 font-semibold">Nome da Categoria</label>
          <input type="text" v-model="nomeCategoria"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Roupas, Eletrônicos..." required />
        </div>

        <button type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          Editar Categoria
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();
const categoriaId = route.params.id;

const nomeCategoria = ref("")

const editarCategoria = async() => {
    try {
        const response = await axios.get(`https://localhost:7256/v1/categorias/${categoriaId}`)
        const categoria = response.data;
        nomeCategoria.value = categoria.nome
       

    } catch (error) {
        console.error("Erro ao carregar produto", error);
        
    }
}

async function atualizacaoDados() {
  const dadosAtualizados = {
    nome: nomeCategoria.value
  };

  try {
     const resposta = await axios.put(`https://localhost:7256/v1/categorias/${categoriaId}`, dadosAtualizados
    );
    console.log("Resposta da API:", resposta.data);
    // Atualize a UI com a resposta da API, se necessário
    router.push("/categorias");
  } catch (erro) {
    console.error("Erro ao enviar dados:", erro);
    // Mostre um erro para o usuário, se necessário
  }
}
onMounted(editarCategoria)

</script>