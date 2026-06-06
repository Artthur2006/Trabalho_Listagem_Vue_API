<template>
  <main class="container text-center m-5">
    <h1 class="display-4 mb-3">
      Monster Hunter Compendium
    </h1>

    <p class="lead mb-4">
      Explore informações sobre os monstros da franquia Monster Hunter.
    </p>

    <b-button variant="primary" size="lg" @click="$router.push('/list')">
      Explorar monstros
    </b-button>
  </main>
</template>