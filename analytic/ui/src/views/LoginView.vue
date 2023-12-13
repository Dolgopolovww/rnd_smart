<template>
    <div>
      <h2>Login Page</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Login</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      submitForm() {

        const data = {
          username: this.username,
          password: this.password
        };
  
        fetch('http://localhost:8084/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            this.$store.commit('login');
            this.$router.push('/');
          } else {
            console.error('Authentication failed');
            this.errorMessage = 'Invalid credentials';
          }
          })
          .catch(error => {
            console.error('Error:', error);
            this.errorMessage = 'An unexpected error occurred';
          });
      }
    }
  };
  </script>
  
  <style scoped>

.error-message {
  color: red;
  margin-top: 10px;
}

  form {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
  }
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  