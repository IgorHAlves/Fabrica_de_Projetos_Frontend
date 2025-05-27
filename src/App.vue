<script setup>
import Navbar from "./components/NavbarComponent.vue";
import Footer from "./components/FooterComponent.vue";
</script>

<template>
  <div class="flex">
  <Navbar />
  <router-view> </router-view>
</div>
  

  <div></div>
  <Footer />
</template>
