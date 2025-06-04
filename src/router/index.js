import { createRouter, createWebHistory } from "vue-router";
import MaisVendidosView from "../views/MaisVendidosView.vue";
import ProductView from "../views/ProductView.vue";
import CategoriaView from "../views/CategoriaView.vue";
import CadastroProdutoView from "../views/CadastroProdutoView.vue";
import CadastroCategoriaView from "../views/CadastroCategoriaView.vue";
import EdicaoView from "../views/EdicaoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/produtos",
      name: "produtos",
      component: ProductView,
    },
    {
      path: "/",
      name: "maisvedidos",
      component: MaisVendidosView,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: CategoriaView,
    },
    {
      path: "/cadastroProduto",
      name: "cadastroProduto",
      component: CadastroProdutoView,
    },
    {
      path: "/cadastroCategoria",
      name: "cadastroCategoria",
      component: CadastroCategoriaView,
    },
    {
      path: "/editar/:id",
      name: "editarproduto",
      component: EdicaoView,
    },
  ],
});

export default router;
