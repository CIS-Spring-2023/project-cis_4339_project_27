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
        <tr v-for="(item, index) in items" :key="index">
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