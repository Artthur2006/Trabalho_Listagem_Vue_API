<template>
  <div class="mh-home-wrapper">
    <main class="container text-center mh-home-content">
      <h1 class="display-3 mh-main-title">
        Monster Hunter Compendium
      </h1>

      <div class="mh-title-decoration"></div>

      <p class="lead mh-subtitle mb-5">
        Explore informações e registros ecológicos sobre os monstros da franquia.
      </p>

      <button class="btn-mh-lg" @click="$router.push('/list')">
        Entrar na Guilda
      </button>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;900&family=Montserrat:wght@400;500&display=swap');

.mh-home-wrapper {
  background: radial-gradient(circle, #1e2328 0%, #0f1114 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 20px;
}

.mh-home-content {
  max-width: 800px;
}

.mh-main-title {
  font-family: 'Cinzel', serif;
  color: #dfb76c;
  font-weight: 900;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6), 0 0 20px rgba(223, 183, 108, 0.2);
  letter-spacing: 1px;
}

.mh-title-decoration {
  width: 180px;
  height: 3px;
  background: linear-gradient(to right, transparent, #c49a45, #dfb76c, #c49a45, transparent);
  margin: 20px auto;
}

.mh-subtitle {
  font-family: 'Montserrat', sans-serif;
  color: #a4a9b0;
  font-size: 1.2rem;
  font-weight: 400;
}

.btn-mh-lg {
  font-family: 'Cinzel', serif;
  background-color: #c49a45;
  color: #111417;
  font-weight: 900;
  font-size: 1.2rem;
  letter-spacing: 1px;
  padding: 14px 40px;
  border: 2px solid #dfb76c;
  border-radius: 4px;
  text-transform: uppercase;
  box-shadow: 0 6px 15px rgba(0,0,0,0.4);
  transition: all 0.3s ease;
}

.btn-mh-lg:hover {
  background-color: #dfb76c;
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(223, 183, 108, 0.5);
  cursor: pointer;
}
</style>