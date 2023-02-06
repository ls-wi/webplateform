<template>
    <div class="grid grid-cols-1">
        <button class="group serviceContainer">
            <p class="serviceTitre group-focus:border-b-4 group-focus:border-yellow">{{title}}</p>
            <p class="serviceTexte group-focus:block">{{text}}</p>
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