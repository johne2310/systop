<template>
  <div class="main-content q-pa-md">
    <h5 class="q-my-xs text-positive">
      <q-icon color="positive" name="fa fa-cog"/>
      Settings
    </h5>

    <q-form
      class="q-gutter-md q-mt-md"
    >
      <q-input
        filled
        v-model="warningThreshold"
        label="Warning threshold"
        hint="Enter your desired warning threshold"
        :rules="[
          val => val !== null && val !== '' || 'Please enter a threshold',
          val => val > 0 && val < 100 || 'Please enter a threshold between 0 and 100']"
      />

      <q-input
        filled
        type="number"
        v-model="alertFrequency"
        label="Alert frequency"
        hint="Enter your desired alert frequency"
        :rules="[
          val => val !== null && val !== '' || 'Please enter a frequency',
          val => val > 0 && val < 100 || 'Please enter a frequency between 0 and 100'
        ]"
      />


<!--      <div>-->
<!--        <q-btn label="Save" type="submit" color="primary"/>-->
<!--      </div>-->
    </q-form>


  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Settings',
    data() {
      return {
        // warningThreshold: '',
        // alertFrequency: this.getSettings.alert
      }
    },
    methods: {
      ...mapActions('settings', ['saveWarning', 'loadWarning', 'saveAlert', 'loadAlert'])
      // onSave() {
      //   const settings = {
      //     warning: this.warningThreshold,
      //     alert: this.alertFrequency
      //   }
      //   // save settings to store
      //   this.saveWarning(settings.warning)
      //   this.saveAlert(settings.alert)
      //
      //   //send warning level to main process
      //   if ( this.$q.platform.is.electron ) {
      //     window.ipcRenderer.send('sysinfo:warning', settings)
      //   }
      // }
    },
    computed: {
      ...mapGetters('settings', ['getSettings']),
      warningThreshold: {
        get() {
          return this.getSettings.warning
        },
        set(value) {
          this.saveWarning(value)
          //send warning level to main process
          if ( this.$q.platform.is.electron ) {
            window.ipcRenderer.send('sysinfo:warning', value)
          }
        }
      },
      alertFrequency: {
        get() {
          return this.getSettings.alert
        },
        set(value) {
          this.saveAlert(value)
          //send warning level to main process
          if ( this.$q.platform.is.electron ) {
            window.ipcRenderer.send('sysinfo:alert', value)
          }
        }
      }
    },
      mounted() {
        this.loadAlert()
        this.loadWarning()
      }

  }
</script>

<style scoped>

</style>
