<template>
  <div class="row justify-content-center">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Service</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in queryService" :key="index">
          <td>{{ item.service }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button @click.prevent="deleteItem()" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row justify-content-center">
    <div>
      <button class="btn btn-danger mx-2" type="button"  @click="addItem">New Service</button>
      <input type="text" v-model="newItem.service" />
      <input type="text" v-model="newItem.description" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      items: [
        { id: 1, service: 'Product 1', description: '' },
        { id: 2, service: 'Product 2', description: '' },
        { id: 3, service: 'Product 3', description: '' },  
        { id: 4, service: 'Product 4', description: ''}
      ],
      newItem: {
        id: null,
        service: '',
        description: ''
      }
    }
  },
  methods: {
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
    },
    getClients() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.queryService = res.data
      })
    }
  }
}
</script>

<style>
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