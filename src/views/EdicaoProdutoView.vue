<template>
    <div
        class="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-emerald-700 to-sky-500">
        <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
            <h2 class="text-4xl font-extrabold text-center mb-6 text-blue-700">
                Editar Produto
            </h2>
            <form @submit.prevent="atualizacaoDados()">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1 font-semibold">Nome do Produto</label>
                    <input type="text" v-model="nome"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Ex: Camiseta, Smartphone..." required />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 mb-1 font-semibold">Preço (R$)</label>
                    <input type="number" v-model="preco" step="0.01"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ex: 99.90" required />
                </div>

                       <div class="mb-4">
                    <label class="block text-gray-700 mb-1 font-semibold">Quantidade Vendida</label>
                    <input type="number" v-model="quantidadeVenda"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Ex: 100" required />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 mb-1 font-semibold">Categoria</label>
                    <input type="number" v-model="idCategoria"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Ex: 10" required />
                </div>
                

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Salvar alterações
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
const produtoId = route.params.id;

const nome = ref("");
const preco = ref("");
const quantidadeVenda = ref("");

const idCategoria = ref("");

const editarProduto = async() => {
    try {
        const response = await axios.get(`https://localhost:7256/v1/produtos/${produtoId}`)
        const produto = response.data.data;
        console.log(produto);
        
        nome.value = produto.nome
        quantidadeVenda.value = produto.quantidadeVenda
        console.log(quantidadeVenda.value);
        
        idCategoria.value = produto.categoria.id
        preco.value = produto.preco

    } catch (error) {
        console.error("Erro ao carregar produto", error);
    }
}

async function atualizacaoDados() {
    const atualizacaoDados = {
        nome: nome.value,
        preco: preco.value,
        quantidadeVenda: quantidadeVenda.value,
        idCategoria: idCategoria.value,
    };

    try {
        const resposta = await axios.put(`https://localhost:7256/v1/produtos/${produtoId}`, atualizacaoDados
        );
        console.log("Resposta da API:", resposta.data);
        // Atualize a UI com a resposta da API, se necessário
        router.push("/produtos");
    } catch (erro) {
        console.error("Erro ao editar dados:", erro);
        // Mostre um erro para o usuário, se necessário
    }
}

onMounted(editarProduto);
</script>
  
