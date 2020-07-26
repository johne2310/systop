<template>
  <q-layout view="lHh Lpr lFf">


    <q-footer bordered class="bg-dark text-primary">
      <q-tabs no-caps active-color="white" class="text-grey shadow-2">
        <q-route-tab
          :tab="link.title"
          v-for="link in footerLinks"
          :key="link.title"
          :icon="link.icon"
          :to="link.path"
          :label="link.title"
          exact
        />
      </q-tabs>
    </q-footer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>



export default {
  name: 'MainLayout',
  data () {
    return {
      footerLinks: [
        {
          title: 'CPU',
          caption: 'CPU',
          icon: 'fa fa-microchip',
          path: { name: 'CPU' },
        },
        {
          title: 'System Info',
          caption: 'View system information',
          icon: 'fa fa-laptop-code',
          path: { name: 'SysInfo' },
        },
        {
          title: 'Settings',
          caption: 'Edit Settings',
          icon: 'fa fa-cog',
          path: { name: 'Settings' },
        }

      ]
    }
  }
}
</script>
