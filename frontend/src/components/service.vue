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
          <th v-if="user.role === 'editor'">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in servicesData" :key="service.id">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td v-if="user.role === 'editor'">
            <button  @click.prevent="updateItem(service.id)" class="btn btn-success mx-2">Edit</button>
            <button v-if="service.status === 'inactive'" @click.prevent="serviceStatus(service.id)"
              class="btn btn-success mx-2">Activate</button>
            <button v-if="service.status === 'active' " @click.prevent="serviceStatus(service.id)" class="btn btn-danger mx-2">Deactivate</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--Create new service form for front end-->
  <div v-if="user.role === 'editor'" class="row justify-content-center">
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
          <div>
          <input type="radio" id="active" name="status" value="active" v-model="status"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
          <label for="active" class="ml-2">Active</label>
        </div>
        <div>
          <input type="radio" id="inactive" name="status" value="inactive" v-model="status"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
          <label for="active" class="ml-2">Inactive</label>
        </div>
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
        <button class="btn btn-danger mx-2" v-if="user.role === 'editor'" type="submit">Add Service</button>
        <button class="btn btn-success" v-if="user.role === 'editor'" v-on:click="sendUpdatedItem" type="button">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { userLoggedIn } from '@/stores/userLoggedIn'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    const user = userLoggedIn();
    return { 
      v$: useVuelidate({ $autoDirty: true }),
      user
    }
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
    /* Pulls the data from the local storage and stores then in the array so the component can use
    the data to fill the table and show the different services. */
    this.servicesData = JSON.parse(localStorage.getItem('services') || '[]')
    // axios.get(`${apiURL}/services`).then((res) => {
    //   this.servicesData = res.data;
    // })
  },
  methods: {
    /* The function takes the input values from the form and stores it in the servicesData array.
    Then it saves the array inside the local storage of the browser to create persistent data. */
    addItem() {
      this.servicesData.push({ id: this.servicesData.length, name: this.name, status: this.status, description: this.description })
      localStorage.setItem('services', JSON.stringify(this.servicesData))
      this.name = ''
      this.status = ''
      this.description = ''
    },
    /* Pulls the data from the local storage and saves in in the listofServices array. It then parses through the array
    to find that data with the index equal to the value passed to it as a parameter and sends the value of that data to its
    corresponding input box. */
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
    /* Updates the local storage value with the data inside list of services array. */
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
  validations: {
    name: {
      required
    },
    status: {
      required
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

.btn.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn.btn-success:hover {
  opacity: 0.5;
}
</style>