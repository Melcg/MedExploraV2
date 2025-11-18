<template>
  <v-container fluid class="login-container fill-height pa-0">
    <!-- Fondo con gradiente -->
    <div class="background-gradient"></div>
    
    <!-- Contenido -->
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <LoginCard />
      </v-col>
    </v-row>

    <!-- Footer -->
    <div class="footer-info">
      <p class="text-caption text-center text-medium-emphasis">
        © 2025 MedExplora - Facultad de Medicina
      </p>
    </div>
  </v-container>
</template>

<script setup>
import LoginCard from '@/components/auth/LoginCard.vue'
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
  opacity: 0.1;
  z-index: 0;
}

.background-gradient::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(33, 150, 243, 0.1) 0%,
    transparent 70%
  );
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-row {
  position: relative;
  z-index: 1;
}

.footer-info {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>