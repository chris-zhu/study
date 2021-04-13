import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

function createApp(comp){
  const app = {
    rootComp: comp,
    mount(container){

    }
  }

  return app
}
