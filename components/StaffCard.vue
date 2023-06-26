<template>
    <div class="md:grid md:grid-cols-3">
        <div class="lg:w-1/2 text-center bg-lgrey my-3 rounded m-auto hover:scale-105 duration-1000">
            <img class="max-h-64 m-auto rounded-full mt-2 p-2" src="../src/leith.png"/> <!-- :src="img"/>--> 

            <div class="font-zilla mt-5">
                <p class="text-2xl font-bold bg-yellow w-min m-auto p-1">Leith</p>
                <p class="text-lg">Sales Manager</p>
            </div>

        </div>
        <div class="lg:w-1/2 text-center bg-lgrey my-3 rounded m-auto hover:scale-105 duration-1000">
            <img class="max-h-64 m-auto mt-2 p-2 rounded-full" src="../src/sakada.png"/> <!-- :src="img"/>--> 

            <div class="font-zilla mt-5">
                <p class="text-2xl font-bold bg-yellow w-min m-auto p-1">Sakada</p>
                <p class="text-lg">Web Developer</p>
            </div>

        </div>
        <div class="lg:w-1/2 text-center bg-lgrey my-3 rounded m-auto hover:scale-105 duration-1000">
            <img class="max-h-64 m-auto rounded-full mt-2 p-2" src="../src/sana.png"/> <!-- :src="img"/>--> 

            <div class="font-zilla mt-5">
                <p class="text-2xl font-bold bg-yellow w-min m-auto p-1">Sana</p>
                <p class="text-lg">Digital Marketing Expert</p>
            </div>

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