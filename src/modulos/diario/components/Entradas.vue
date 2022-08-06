<template>
    <div  class="entry-container mb-3 pointer p-2"   
         @click="$router.push({name:'Entrada', params: {id: 10}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">Jueves - 15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-ligth">2021</span>

        </div>
        <div class="entry-description">
            Voluptate laborum ex sit labore duis excepteur qui adipisicing. Mollit proident qui anim tempor minim sunt ea sint. Elit enim ad et velit mollit eiusmod nostrud aute tempor nostrud consequat nisi.
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .entry-container {
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all ease-in;
        &:hover{
            background-color: lighten($color: grey, $amount:35 );
            transition: 0.2s all ease-in;
        }
    }
    .entry-description {
        font-size: 12px;
    }

</style>