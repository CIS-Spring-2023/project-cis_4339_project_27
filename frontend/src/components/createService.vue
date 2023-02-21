<template>
  <div class="row justify-content-center">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Service</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in queryService" :key="index">
          <td>{{ item.service }}</td>
          <td>{{item.description}}</td>
          <td>
            <button @click.prevent="deleteItem()" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
        <tr>
          <td><button @click="addItem">Add</button></td>
          <td><input type="text" v-model="newItem.service" /></td>
          <td><input type="text" v-model="newItem.description" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      queryService: [],
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
.row.justify-content-center{
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }
</style>