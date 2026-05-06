<template>
  <div class="app">
    <h1>Barber App</h1>
    <p>API base: <strong>{{ apiUrl }}</strong></p>
    <button @click="loadStatus">Probar conexión al backend</button>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const message = ref('');

async function loadStatus() {
  message.value = 'Cargando...';
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      message.value = 'Backend accesible: ' + response.status;
    } else {
      message.value = 'Backend respondio: ' + response.status;
    }
  } catch (error) {
    message.value = 'Error conectando al backend: ' + error.message;
  }
}
</script>

<style scoped>
.app {
  max-width: 640px;
  margin: 4rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-family: system-ui, sans-serif;
}
.message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: #f6f8ff;
}
button {
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #2563eb;
}
</style>
