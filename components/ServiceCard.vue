<template>
    <div class="grid grid-cols-1">
        <button class="group serviceContainer">
            <h4 class="serviceTitre border-b-4 border-yellow p-1">{{title}}</h4>
            <p class="serviceTexte group-hover:block lg:mx-10 font-sans">{{text}}</p>
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