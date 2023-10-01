<template>
    <div class="ml-10 rounded">
        <div class="grid md:grid-cols-2 lg:max-w-5xl md:max-w-2xl max-w-xs">
            <div class="">
                <div class="">
                  <h4 class="md:text-3xl text-2xl text-white bg-dgrey border-b-4 border-yellow p-5 text-center md:text-left "><span class="bg-yellow text-black px-1">Améliorez</span>
                      votre site web pour exploiter pleinement son
                      <span class="bg-yellow text-black px-1">potentiel</span> et renouveller votre entreprise !
                  </h4>
                </div>
                <p class="p-5 md:text-xl text-lg md:mt-10 md:mr-16 text-justify md:text-left">
                    Web Treasure vous accompagne vers la modernisation de votre site web. Votre site est l'outil qui vous permet d'interagir avec le reste du monde,
                    il est donc nécessaire de le renouveller au fil des années. Restez au gout du jour avec Web Treasure, nous vous garantissons un référencement performant
                    et un design unique et morderne. Le potentiel de votre entreprise ne peut plus être inhibé par votre site !
                </p>
            </div>
            <img src="../src/maintenance.png" class="w-36 md:absolute  self-center justify-self-center">
            <img src="../src/maisouicclair.jpg" class="self-center hidden md:block">
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
