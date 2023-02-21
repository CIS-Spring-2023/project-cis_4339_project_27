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
          <th>Service</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
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