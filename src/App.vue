<template>
  <div id="app">
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-md-4">
          <div v-if="!update.edit" class="card bg-dark text-white">
            <div class="card-header border-white">
              <h4 class="text-center mb-0">Create Task</h4>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <input
                v-model="task.title"
                  type="text"
                  placeholder="Task title"
                  class="form-control rounded-0"
                />
              </div>
              <div class="mb-3">
                <textarea
                v-model="task.description"
                  class="form-control"
                  placeholder="Task Description"
                ></textarea>
              </div>
              <div class="w-100 d-flex">
                <button @click="addTask" class="btn btn-success w-100 mx-auto">Save</button>
              </div>
            </div>
          </div>

           <div v-else class="card bg-dark text-white">
            <div class="card-header border-white">
              <h4 class="text-center mb-0">Upate Task</h4>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <input
                v-model="taskUpdate.title"
                  type="text"
                  placeholder="Task title"
                  class="form-control rounded-0"
                />
              </div>
              <div class="mb-3">
                <textarea
                v-model="taskUpdate.description"
                  class="form-control"
                  placeholder="Task Description"
                ></textarea>
              </div>
              <div class="w-100 d-flex">
                <button @click="updateTask" class="btn btn-primary w-100 mx-auto">Actualizar</button>
              </div>
            </div>
          </div>

        </div>
        <div class="col-md-8">
          <table class="table table-striped table-bordered">
<thead class="bg-dark text-white">
  <tr>
    <th>Titulo</th>
    <th>Descripcion</th>
    <th>Opciones</th>
  </tr>
</thead>
<tbody>
  <tr v-for="item of dbTasks" v-bind:key="item['.key']">
    <td>
      {{item.title}}
    </td>
    <td>
      {{item.description}}
    </td>
    <td>
      <div class="w-100 d-flex">
        <button @click="setEditTask(item['.key'], true, item.title, item.description)" class="btn btn-warning ms-auto rounded-0">edit</button>
        <button @click="deleteTask(item['.key'])" class="btn btn-danger me-auto rounded-0">delete</button>
      </div>
    </td>
  </tr>
</tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseConfig from '../src/config/config.js'
const db = firebase.initializeApp(firebaseConfig).database();

let _task = db.ref('tasks')

export default {
  name: "App",
  firebase: {
    dbTasks: _task
  },
  data(){
    return{
      task: {
        title: '',
        description: ''
      },
      taskUpdate: {
        title: '',
        description: ''
      },
      update: {
        idTask: '',
        edit: false
      },
      dbTasks: []
    }
  },
  methods: {
    addTask: async function(){
      await _task.push(this.task)
      this.task = {
        title: '',
        description: '',
        edit: false
      }
    },
    deleteTask: async function(idTask){
      await _task.child(idTask).remove();
    },
    setEditTask:async function(idTask, value, title, description){
      this.taskUpdate.title = title;
      this.taskUpdate.description = description;
      this.update.idTask = idTask;
      this.update.edit = value;
    },
    updateTask: function(){
      _task.child(this.update.idTask).update(this.taskUpdate);
       this.update.edit = false;
    }
  },
};
</script>
