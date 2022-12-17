<template>
    <div class="bg-black p-10 mt-10 lg:w-3/4 m-auto rounded">
        <p class="text-center bg-[#FBB811] w-min m-auto p-1 text-4xl font-zilla">L'équipage</p>
        <p class="text-white text-center text-xl font-zilla mt-5">Une equipe d'experts avec une seule détermination : mener votre projet digital à sa réussite</p>
        <div class=" md:grid md:grid-cols-3 mt-10">
            <StaffCard/>
            <StaffCard/>
            <StaffCard/>
        </div>
    </div>
</template>


<script>
import StaffCard from './StaffCard.vue';
export default{
    name:'Crew',
    components:{
        StaffCard,
    }
}
</script>