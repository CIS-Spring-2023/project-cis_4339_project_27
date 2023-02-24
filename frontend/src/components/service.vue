<template>
  <div class="row justify-content-center">
    <div class="title-hd">
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
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
        <tr v-for="(service, index) in servicesData" :key="index">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button @click.prevent="updateItem(service.id)" class="btn btn-success mx-2">Edit</button>
            <button v-if="service.status ==='inactive'" @click.prevent="serviceStatus(service.id)" class="btn btn-success mx-2">Activate</button>
            <button v-else @click.prevent="serviceStatus(service.id)" class="btn btn-danger mx-2">Deactivate</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--Create new service form for front end-->
  <div class="row justify-content-center">
    <form @submit.prevent="addItem">
      <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Service Name</span>
          <span style="color: #ff0000">*</span>
          <input type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="name" required />
        </label>
      </div>
      <!-- form field -->
      <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Status</span>
          <span style="color: #ff0000">*</span>
          <input type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="status" required />
        </label>
      </div>

      <!-- form field -->
      <div></div>
      <div></div>

      <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Description</span>
          <textarea v-model="description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="2"></textarea>
        </label>
      </div>
      <div>
        <div></div>
        <button class="btn btn-danger mx-2" type="submit">Add Service</button>
        <button class="btn btn-success" v-on:click ="sendUpdatedItem" type="button">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      listOfServices: [],
      id: '',
      servicesData: [],
      name: '',
      status: '',
      description: ''
    }
  },
  created() {
    this.servicesData = JSON.parse(localStorage.getItem('services') || '[]')
    // axios.get(`${apiURL}/services`).then((res) => {
    //   this.servicesData = res.data;
    // })
  },
  methods: {
    // deleteItem(id) {
    //   let deleteURL = `${apiURL}/services/${id}`;
    //   //let indexofArrayItem = this.servicesData.findIndex(i => i._id === id);

    //   if(window.confirm("Do you really want to delete?")) {
    //     axios.delete(deleteURL).then((res) => {
    //       location.reload();
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   }  
    // },
    addItem() {
      this.servicesData.push({id:this.servicesData.length, name: this.name, status: this.status, description: this.description })
      localStorage.setItem('services', JSON.stringify(this.servicesData))
      this.name =''
      this.status =''
      this.description=''
    },
    updateItem(serviceID) {

      if (localStorage.getItem('services') == null) {
        this.listOfServices = [];
      } else {
        this.listOfServices = JSON.parse(localStorage.getItem('services'))
      }
      // this.$router.push({ name: 'updateservice', params: { id: serviceID } })
      this.name = this.listOfServices[serviceID].name
      this.status = this.listOfServices[serviceID].status
      this.description = this.listOfServices[serviceID].description
      this.id = this.listOfServices[serviceID].id
      console.log(this.id)
    },
    sendUpdatedItem() {
      this.listOfServices.id = this.id
      this.listOfServices[this.id].name = this.name
      this.listOfServices[this.id].status = this.status
      this.listOfServices[this.id].description = this.description

      console.log(this.listOfServices)

      localStorage.setItem('services', JSON.stringify(this.listOfServices))
      location.reload()
    },
    serviceStatus(serviceID) {
      if (localStorage.getItem('services') == null) {
        this.listOfServices = [];
      } else {
        this.listOfServices = JSON.parse(localStorage.getItem('services'))
      }
      // this.$router.push({ name: 'updateservice', params: { id: serviceID } })
      console.log(this.listOfServices)
      if (this.listOfServices[serviceID].status === 'active') {
        this.listOfServices[serviceID].status = 'inactive'
      } else {
        this.listOfServices[serviceID].status = 'active'
      }

      localStorage.setItem('services', JSON.stringify(this.listOfServices))
      location.reload()
    }
  },
  validations() {
    return {
      newItem: {
        service: { required },
        status: { required }
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

.btn.btn-danger.mx-2 {
  background-color: #c8102e;
}

.btn.btn-danger.mx-2:hover {
  opacity: 0.5;
}

.btn.btn-success{
  background-color: #28a745;
  border-color: #28a745;
}

.btn.btn-success:hover{
  opacity: 0.5;
}
</style>