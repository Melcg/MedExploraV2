// src/main.js
console.log('Iniciando aplicación...')

try {
  const { createApp } = await import('vue')
  console.log('Vue importado correctamente')
  
  const App = (await import('./App.vue')).default
  console.log('App.vue importado correctamente')
  
  const vuetify = (await import('./plugins/vuetify')).default
  console.log('Vuetify importado correctamente')
  
  const pinia = (await import('./plugins/pinia')).default
  console.log('Pinia importado correctamente')
  
  const router = (await import('./router')).default
  console.log('Router importado correctamente')
  
  const app = createApp(App)
  
  app.use(pinia)
  app.use(router)
  app.use(vuetify)
  
  app.mount('#app')
  console.log('Aplicación montada correctamente')
  
} catch (error) {
  console.error('Error al iniciar la aplicación:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial;">
      <h1>Error al cargar la aplicación</h1>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${error.message}</pre>
      <p>Revisa la consola para más detalles.</p>
    </div>
  `
}