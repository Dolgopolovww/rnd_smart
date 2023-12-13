<template>
    <div>
      <FilterComponent :landings="landingsList" @filter-changed="fetchFilteredReports" />
      <table class="report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Landing Name</th>
            <th>User ID</th>
            <th>Report Data</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.landing_name }}</td>
            <td>{{ report.user_id }}</td>
            <td>
              <ul>
                <li v-for="option in JSON.parse(report.report_data)" :key="option.id">
                  {{ option.text }}
                </li>
              </ul>
            </td>
            <td>{{ report.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import FilterComponent from './FilterComp.vue';

  export default {
    name: "ReportTable",
    components: {
      FilterComponent,
    },
    data() {
      return {
        reports: [],
        landingsList: [],
      };
    },
    mounted() {
      this.fetchReports()
      this.fetchLandings()
    },
    methods: {
      fetchFilteredReports(updatedFilter) {
        const backendUrl = 'http://localhost:8084/reports';

        updatedFilter.fromTime = new Date(updatedFilter.fromTime).toISOString();
        updatedFilter.toTime = new Date(updatedFilter.toTime).toISOString();

        console.log('tuta',  updatedFilter )

        fetch(backendUrl, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFilter), 
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            this.reports = data;
            })
            .catch(error => {
            console.error('Error fetching reports:', error);
            });
        },
      fetchLandings() {
          fetch('http://localhost:8084/landings')
            .then(response => response.json())
            .then(data => {
                this.landingsList = data.landings
                console.log(this.landingsList)
            })
        .catch(error => {
          console.error('Error fetching landings:', error);
        });
      },
      fetchReports() {
        fetch('http://localhost:8084/reports')
          .then(response => response.json())
          .then(data => {
            this.reports = data;
          })
          .catch(error => {
            console.error('Error fetching reports:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .report-table th, .report-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .report-table th {
    background-color: #f2f2f2;
  }
  
  .report-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .report-table tr:hover {
    background-color: #f1f1f1;
  }
  </style>