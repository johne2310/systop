<template>
  <div class="main-content q-pa-md">
    <h5 class="q-my-xs text-secondary">
      <q-icon color="secondary" name="fas fa-info-circle"/>
      System Info
    </h5>

    <q-list class="q-mt-md" dense bordered separator>
      <q-item >
        <q-item-section>
          <q-item-label>CPU</q-item-label>
        </q-item-section>
        <q-item-section side top>

          <span>{{ getCPU.manufacturer }} {{ getCPU.brand }} {{ getCPU.speed }}GHz</span>
        </q-item-section>
      </q-item>

      <q-item >
        <q-item-section>
          <q-item-label>OS</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <span>{{ getPlatform.codename }} {{ getPlatform.release }}</span>
        </q-item-section>
      </q-item>

      <q-item >
        <q-item-section>
          <q-item-label>System Uptime</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <span>{{ upTime }} days</span>
        </q-item-section>
      </q-item>

      <q-item >
        <q-item-section>
          <q-item-label>Free Memory</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <span>{{(getFreeMemory/100000000).toFixed(2) }}GB</span>
        </q-item-section>
      </q-item>



    </q-list>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex'
  export default {
    name: 'SysInfo',
    computed: {
      ...mapGetters('settings', [
        'getFreeMemory',
        'getUpTime',
        'getPlatform',
        'getCPU'
      ]),
      upTime() {
        return (this.getUpTime / (60*60*24)).toFixed(2)
      }
    },

  }
</script>

<style scoped>

</style>
