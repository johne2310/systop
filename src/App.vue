<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { LocalStorage } from 'quasar'

  export default {
    name: 'App',
    methods: {
      ...mapActions('settings', [
        'setFreeMemory',
        'setUsedMemory',
        'setCPUUsed',
        'setPlatform',
        'setAlertFrequency',
        'setUpTime',
        'setCPU'
      ])
    },
    computed: {
      ...mapGetters('settings', ['getSettings'])
    },
    mounted() {
      //set dark mode
      this.$q.dark.set('auto')
      if ( this.$q.platform.is.electron ) {

        //listen for message from electron main process (dynamic)
        window.ipcRenderer.on('sysinfo:dynamic', (e, data) => {
          this.setFreeMemory(data.mem.free)
          this.setCPUUsed(data.currentLoad.currentload_user)
          this.setUpTime(data.time.uptime)
          this.setCPU(data.cpu)
        })

        //listen for static info
        window.ipcRenderer.on('sysinfo:static', (e, data) => {
          this.setPlatform(data.osInfo)
        })

        //send warning level to main process
        //TODO: change to direct read from localstorage
        let warning = parseInt(LocalStorage.getItem('systop:warning'))
        let alert = parseInt(LocalStorage.getItem('systop:alert'))

        if (!warning ) {
          warning = 75
        }

        if (!alert ) {
          alert = 5
        }

        window.ipcRenderer.send('sysinfo:warning', warning)
        window.ipcRenderer.send('sysinfo:alert', alert)
      }
    }
  }
</script>
