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
        <tr v-for="item in items" :key="item._id">
          <td>{{ item.service }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.status }}</td>
          <td>
            <router-link :to="{service: 'update', params :{id: item._id}}" class="btn btn-green mx-2">Update</router-link>
            <button @click.prevent="deleteItem()" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row justify-content-center">
        <div>
          <button @click.prevent ="$event => addItem()" class="btn btn-danger mx-2">Add Service</button>
          <input type="text" v-model="newItem.service" placeholder="Service name" />
          <input type="text" v-model="newItem.description" placeholder="Service Description " />
          <input type="text" v-model="newItem.status" placeholder="Service status"/>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [
        { id: 1, service: 'Product 1', description: '', status: 'active' },
        { id: 2, service: 'Product 2', description: '', status: 'active' },
        { id: 3, service: 'Product 3', description: '', status: 'active' },
        { id: 4, service: 'Product 4', description: '', status: 'active' }
      ],
      newItem: {
        id: null,
        service: '',
        description: '',
        status:''
      }
    }
  },
  methods: {
    deleteItem(id) {
      let apiURL = 'http://localhost:5173/createService/$(id)}';
      let indexOfArrayItem = this.items.findIndex(i => i._id=== id );
      if (window.confirm("Do you really want to delete?")) {
        //call to backend
          axios.delete(apiURL).then(() => {
          //remove one element from Students array object to update data
            this.items.splice(indexOfArrayItem, 1);
            }).catch(error => {
                console.log(error)
             });
            }
    },

    addItem() {
      let apiURL = 'http://localhost:5173/createService';

      axios.post(apiURL, this.item).then(() => {
      this.$router.push('/components');
      this.newItem = {
        service: '',
        description: '',
        status:''
      }
      }).catch(error => {
          console.log(error)
      });
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

.btn.btn-green.mx-2{
  background-color: green;
  color: white;
}

.btn.btn-green.mx-2:hover{
  opacity: 0.5;
}
</style>
