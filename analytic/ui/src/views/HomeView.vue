<template>
  <div>
      <h2>Landings Reports</h2>
  </div>
  <div class="table">
    <ReportTable></ReportTable>
  </div>
</template>

<script>
// @ is an alias to /src
import ReportTable from '@/components/ReportTable.vue';




export default {
  name: 'HomeView',
  components: {
    ReportTable,
  }
}
</script>
