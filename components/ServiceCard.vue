<template>
    <div class="grid grid-cols-1">
        <button class="group serviceContainer">
            <p class="serviceTitre group-focus:border-b-4 group-focus:border-yellow p-1">{{title}}</p>
            <p class="serviceTexte group-focus:block lg:mx-10">{{text}}</p>
        </button>
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