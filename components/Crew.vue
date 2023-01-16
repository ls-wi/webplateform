<template>
    <div class="bg-white p-10 lg:w-3/4 m-auto rounded my-24">
        <p class="text-center bg-[#FBB811] w-min m-auto p-1 text-4xl font-zilla">L'équipage</p>
        <p class=" text-center text-xl font-zilla mt-5">Une equipe d'experts avec une seule détermination : mener votre projet digital à sa réussite</p>
        <div class=" md:grid md:grid-cols-3 mt-10 bg-lgrey p-3 rounded">
            <StaffCard :name="Leith.name" :prof="Leith.prof" :img="Leith.img"/>
            <StaffCard :name="Sakada.name" :prof="Sakada.prof" :img="Sakada.img"/>
            <StaffCard :name="Sana.name" :prof="Sana.prof" :img="Sana.img"/>
        </div>
    </div>
</template>


<script>
import StaffCard from './StaffCard.vue';
export default{
    name:'Crew',
    components:{
        StaffCard,
    },
    data() {
        return {
            Leith : {name:"Leith", prof:"Sales Manager", img:"../src/barack.jpg"},
            Sakada : {name:"Sakada", prof:"Web Developer", img:"_nuxt/src/barack.jpg"},
            Sana : {name:"Sana", prof:"Digital Marketing Expert", img:"_nuxt/src/barack.jpg"},
        }
    }
}
</script>