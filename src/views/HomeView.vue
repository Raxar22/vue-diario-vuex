<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> Hola mundo </h1>
    <button @click="irAlDiario" class="btn btn-primary"> Primero </button>
    <button @click="irAlDiario" class="btn btn-secondary"> Segundo </button>
    <button @click="irAlDiario" class="btn btn-success"> Exito </button>
  </div>
</template>

<script>
export default {
  methods:{
    irAlDiario(){
        this.$router.push({name:'NoEntradas'})
    }
  }
}
</script>

