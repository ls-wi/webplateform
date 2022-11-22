<template>
    <div class="bg-black h-auto hover:bg-[#FBB811] group duration-1000">
        <!--
        <h1 class="text-white group-hover:bg-[#FBB811] group-hover:text-black duration-1000 text-9xl overflow-auto pb-16 pt-12 text-center font-mono ">
            {Slogan génial}</h1> -->
        <TypeEffect class="text-white group-hover:text-black duration-1000 text-9xl overflow-auto pb-16 pt-12 text-center font-mono m-auto"/>
    </div>
</template>

<script>

import TypeEffect from './TypingEffect.vue'
export default{
    name:'Banner',
    components:{
        TypeEffect
    }
}
</script>