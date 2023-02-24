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
        <tr v-for="(service, index) in servicesData" :key="id">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button @click.prevent="updateItem(service.id)" class="btn btn-secondary mx-2">Edit</button>
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
      servicesData: [
        {
          id: 1,
          name: 'Free Dental',
          description: 'Free dental checkup for everyone',
          status: 'active'
        },
        {
          id: 2,
          name: 'Free Checkup',
          description: 'Free general checkup for everyone',
          status: 'active'
        },
        {
          id: 3,
          name: 'Blood Letting',
          description: 'Donate blood and get rewarded',
          status: 'active'
        },
      ],
      newItem: {
        id: null,
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
    updateItem(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
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