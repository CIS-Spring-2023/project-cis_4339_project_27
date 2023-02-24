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
        <tr v-for="(service, index) in servicesData" :key="id">
          <td>{{ service.service }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button @click.prevent="updateItem(service.id)" class="btn btn-success mx-2">Edit</button>
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
            v-model="newItem.service" required/>
        </label>
      </div>
      <!-- form field -->
      <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Status</span>
          <span style="color: #ff0000">*</span>
          <input type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="newItem.status" required/>
        </label>
      </div>

      <!-- form field -->
      <div></div>
      <div></div>

      <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Description</span>
          <textarea v-model="newItem.description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="2"></textarea>
        </label>
      </div>
      <div>
        <button class="btn btn-danger mx-2" type="submit">New Service</button>
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
      servicesData: [
        {
          id: 1,
          service: 'Free Dental',
          description: 'Free dental checkup for everyone',
          status: 'active'
        },
        {
          id: 2,
          service: 'Free Checkup',
          description: 'Free general checkup for everyone',
          status: 'active'
        },
        {
          id: 3,
          service: 'Blood Letting',
          description: 'Donate blood and get rewarded',
          status: 'active'
        },
      ],
      newItem: {
        id: '',
        service: '',
        description: '',
        status: ''
      }
    }
  },
  created() {
    axios.get(`${apiURL}/services`).then((res) => {
      this.servicesData = res.data;
    })
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
      const correctForm = this.v$.$validate();

      if (correctForm) {
        this.newItem.id = this.servicesData.length + 1;
        this.servicesData.push(this.newItem);
        this.newItem = {
          service: '',
          description: '',
          status: ''
        }
      }
    },
    updateItem(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
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
</style>