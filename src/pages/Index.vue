<template>
  <q-page class="flex flex-top">
    <div class="main-content q-pa-md">
      <h5 class="q-my-xs text-deep-orange-5">
        <q-icon color="deep-orange-5" name="fas fa-microchip"/>
        CPU Usage
      </h5>
      <q-linear-progress stripe rounded size="25px" :value="getCPUUsage / 100" :color="colourScale" class="q-my-md">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="grey darken-3" :label="getCPUUsage +'%'" />
        </div>
      </q-linear-progress>
      <q-list class="q-my-md" dense bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label>CPU Usage</q-item-label>
          </q-item-section>
          <q-item-section top side>
            <span >{{ getCPUUsage }}%</span>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>CPU Free</q-item-label>
          </q-item-section>
          <q-item-section top side>
            <span>{{ cpuFree }}%</span>
          </q-item-section>
        </q-item>

      </q-list>
      <div>
        <p class="text-grey">{{ getCPU.manufacturer }} {{ getCPU.brand }} {{ getCPU.speed }}GHz</p>
      </div>
    </div>
  </q-page>
</template>

<script>
  import {mapGetters} from 'vuex'
  // import si from 'systeminformation'
  // const si = require('systeminformation')
  export default {
    name: 'PageIndex',
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('settings', ['getCPUUsage', 'getCPU']),
      cpuFree() {
        return 100-this.getCPUUsage
      },
      progress() {
        console.log('getCPUUsage: ', this.getCPUUsage / 100 )
        return this.getCPUUsage / 100
      },
      colourScale() {
        const cpuScale = this.getCPUUsage
        if (cpuScale < 50 ) {
          return 'positive'
        } else if (cpuScale > 49 && cpuScale < 75) {
          return 'warning'
        } else {
          return 'negative'
        }
      }
    },
    created() {
      console.log('Loading info')
      // si.osInfo().then(data => console.log(data))
    }
  }
</script>

<style>
  .main-content {
    width: 100%;
  }
  .setRight {
    float: right;
  }
</style>
