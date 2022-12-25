<template>
    <div class="md:w-2/3 w-5/6 m-auto text-center p-5 my-5 rounded bg-black hover:scale-105 duration-1000">
        <p class="md:text-xl text-lg bg-[#FBB811] md:h-16 p-1 m-auto">{{title}}</p>
        <p class="md:px-2 text-center text-white md:p-3 pt-2">blab lbalbal balbalba ablablab baabalb al balablab lbaaba laba albalb alb lbalabla bl balbabalb albal aalb</p>
    </div>
</template>


<script>
export default{
    name:'ServiceCard',
    props:{
        title:String,
        text:String,
    }
    
}
</script>