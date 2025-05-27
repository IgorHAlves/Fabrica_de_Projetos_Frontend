<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-rose-600 via-purple-800 to-red-500"
  >
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
      <h2 class="text-4xl font-extrabold text-center mb-6 text-purple-700">
        Cadastro de Categorias
      </h2>
      <form @submit.prevent="enviarDados(nome)">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1 font-semibold"
            >Nome da Categoria</label
          >
          <input
            type="text"
            v-model="nome"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ex: Roupas, Eletrônicos..."
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Cadastrar sua Categoria
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";

async function enviarDados(nomeCategoria) {
  const dados = {
    nome: nomeCategoria,
  };

  try {
    const resposta = await axios.post(
      "https://localhost:7256/v1/categorias",
      dados
    );
    console.log("Resposta da API:", resposta.data);
    // Atualize a UI com a resposta da API, se necessário
    router.push("/categoria");
  } catch (erro) {
    console.error("Erro ao enviar dados:", erro);
    // Mostre um erro para o usuário, se necessário
  }
}

const nome = ref("");
const tipo = ref("");
</script>
