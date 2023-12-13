<template>
    <div class="filter-container">
      <div class="filter-section">
        <label for="landingFilter">Landing Name:</label>
        <select v-model="landingFilter" @change="applyFilters" id="landingFilter">
          <option value="">All Landings</option>
          <option v-for="landing in landings" :key="landing.id" :value="landing.name">{{ landing.name }}</option>
        </select>
      </div>
  
      <div class="filter-section">
        <label for="fromTime">From:</label>
        <input type="datetime-local" v-model="fromTime" @input="applyFilters" id="fromTime" />
      </div>
  
      <div class="filter-section">
        <label for="toTime">To:</label>
        <input type="datetime-local" v-model="toTime" @input="applyFilters" id="toTime" />
      </div>
  
      <div class="filter-section">
        <button @click="setFilter(1)">1 day</button>
        <button @click="setFilter(7)">7 days</button>
        <button @click="setFilter(30)">30 days</button>
      </div>
  
      <div class="filter-section">
        <button @click="exportReport" class="action-button">Export Report</button>
        <button @click="emitFilterChanged" class="action-button">Refresh</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      landings: Array, // массив лендингов, полученных с бэка
    },
    data() {
      return {
        landingFilter: '',
        fromTime: '',
        toTime: '',
      };
    },
    created() {
        const currentDate = new Date();
        this.toTime = currentDate.toISOString().slice(0, -8);
        
        const fromDate = new Date(currentDate);
        fromDate.setDate(currentDate.getDate() - 1);
        this.fromTime = fromDate.toISOString().slice(0, -8);
        
        this.applyFilters();
    },
    methods: {
      async exportReport() {
        try {
            const backendUrl = 'http://localhost:8084/export'; // Замените на ваш URL
            this.fromTime = new Date(this.fromTime).toISOString();
            this.toTime = new Date(this.toTime).toISOString();

            const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                landingFilter: this.landingFilter,
                fromTime: this.fromTime,
                toTime: this.toTime,
            }),
            };

            const response = await fetch(backendUrl, requestOptions);

            if (!response.ok) {
            throw new Error('Failed to export report');
            }

            const contentDisposition = response.headers.get('Content-Disposition');
            const match = contentDisposition && contentDisposition.match(/filename="(.+?)"/);
            const filename = match ? match[1] : 'report.csv';

            const blob = await response.blob();

            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting report:', error);
        }
      },
      emitFilterChanged() {
        this.$emit('filter-changed', {
            landingFilter: this.landingFilter,
            fromTime: this.fromTime,
            toTime: this.toTime,
        });
      },
      applyFilters() {
        this.$emit('filter-changed', {
          landingFilter: this.landingFilter,
          fromTime: this.fromTime,
          toTime: this.toTime,
        });
      },
      setFilter(days) {
        const now = new Date();
        const fromDate = new Date(now);
        fromDate.setDate(now.getDate() - days);
        this.fromTime = fromDate.toISOString().slice(0, -8);
  
        this.toTime = new Date().toISOString().slice(0, -8);
        this.applyFilters();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Стили по мере необходимости */
  label {
    margin-right: 10px;
  }
  button {
    margin-left: 10px;
  }
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-section {
  margin-right: 20px;
}

.action-button {
  background-color: #2fd2c4; /* Зеленый цвет */
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 150px; /* Задаем фиксированную ширину */
  margin: 5px; /* Задаем расстояние между кнопками */
}

.action-button:hover {
  background-color: #0c5b6a; /* Темно-зеленый цвет при наведении */
}

button {
  margin-right: 10px;
}
</style>

  