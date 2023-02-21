<template>
  <div class="row justify-content-center">
    <div class="title-hd">
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
    </div>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Service Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in servicesData" :key="service._id">
          <td>{{ service.serviceName }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button @click.prevent="deleteItem()" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row justify-content-center">
    <div>
      <button class="btn btn-danger mx-2" type="button"  @click="$router.push('createservice')">New Service</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      servicesData: [],
      newItem: {
        id: null,
        service: '',
        description: ''
      }
    }
  },
  created() {
    this.getServicesData()
  },
  methods: {
    getServicesData () {
      axios.get(`${apiURL}/services`).then((res) => {
        this.servicesData = res.data
      })
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    addItem() {
      this.newItem.id = this.items.length + 1;
      this.items.push(this.newItem);
      this.newItem = {
        id: null,
        service: '',
        description: ''
      }
    }
  }
}
</script>

<style>
.title-hd {
  padding-bottom: 50px;
}

.row.justify-content-center {
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
}

.btn.btn-danger.mx-2{
  background-color: #c8102e;
}

.btn.btn-danger.mx-2:hover{
  opacity: 0.5;
}
</style>