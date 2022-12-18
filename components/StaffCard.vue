<template>
    <div class="text-center bg-[#FBB811] rounded m-auto hover:scale-105 duration-1000">
        <img class="max-h-64 m-auto rounded mt-2 p-2" :src="img"/>

        <div class="font-zilla ">
            <p class="text-2xl font-bold">{{name}}</p>
            <p class="text-lg">{{prof}}</p>
        </div>

    </div>
</template>


<script>
export default{
    name:'Staff',
    props:{
        name: String,
        prof: String,
        img: String,
    }
}
</script>