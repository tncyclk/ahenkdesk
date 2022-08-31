import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import store from './store';

import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton'
import PanelMenu from 'primevue/panelmenu';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'       //core css
import 'primeicons/primeicons.css'       //icons

import router from '@/router'
const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(store)

app.component('PanelMenu', PanelMenu)
app.component('InputText',InputText)
app.component('ToggleButton',ToggleButton)
app.component('MessageBox',Message)
// eslint-disable-next-line
app.component('Button',Button)

app.mount('#app')

