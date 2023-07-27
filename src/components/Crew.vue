<template>
    <div class="bg-white p-10 lg:w-3/4 m-auto rounded my-24">
        <h2 class="text-center bg-[#FBB811] w-min m-auto p-1 text-4xl font-zilla">L'équipage</h2>
        <p class=" text-center text-xl font-sans mt-5">Une equipe d'experts avec une seule détermination : mener votre projet digital à sa réussite</p>
        <div class="  mt-10 p-3 rounded">
            <StaffCard :name="Leith.name" :prof="Leith.prof" :img="Leith.img"/> 
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