<template>
    <div class="ml-10 rounded">
        <div class="grid grid-cols-2 max-w-7xl">
            <div class="">
                <h4 class="text-3xl text-white bg-dgrey border-b-4 border-yellow p-3"><span class="bg-yellow text-black px-1">Améliorez</span> 
                    votre site web pour exploiter pleinement son
                    <span class="bg-yellow text-black px-1">potentiel</span> et renouveller votre entreprise !
                </h4>
                <p class="p-3 text-xl text-center my-10">
                    Web Treasure vous accompagne vers la modernisation de votre site web. Votre site est l'outil qui vous permet d'interagir avec le reste du monde,
                    il est donc nécessaire de le renouveller au fil des années. Restez au gout du jour avec Web Treasure, nous vous garantissons un référencement performant
                    et un design unique et morderne. Le potentiel de votre entreprise ne peut plus être inhibé par votre site !
                </p>
            </div>
            <img src="../src/food_delivery.jpg" class="h-full">
        </div>
    </div>
</template>


<script>
export default{
    name:'SiteRefonte',
    props:{
        title:String,
    }
    
}
</script>