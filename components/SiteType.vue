<template>
    <div class="ml-10 rounded">
        <div class="grid md:grid-cols-2 lg:max-w-5xl md:max-w-2xl max-w-xs">
            <div class="">
                <div class="">
                    <h4 class="md:text-3xl text-2xl text-white bg-dgrey border-b-4 border-yellow p-5 text-center md:text-left ">Créez un site de <span class="bg-yellow text-black px-1">e-commerce</span> 
                        pour vendre et promouvoir vos produits en ligne et développer 
                        <span class="bg-yellow text-black px-1">votre chiffre d'affaires</span> !
                    </h4>
                </div>
                <p class="p-5 md:text-xl text-lg md:mt-10 md:mr-16 text-justify md:text-left">
                    Web Treasure vous accompagnera dans votre projet de création de site de e-commerce quels que soient vos produits ou services. 
                    Notre équipe expérimentée crée des plateformes esthétiques, conviviales et sécurisées, adaptées à vos besoins. 
                    Faites confiance à Web Treasure pour donner vie à votre présence en ligne et transformer votre entreprise en succès commercial.
                </p>
            </div>
            <img src="../src/ecommerce.png" class="w-36 md:absolute  self-center justify-self-center">
            <img src="../src/design123.jpg" class="hidden md:block self-center">
        </div>     
    </div>
</template>


<script>
export default{
    name:'SiteType',
    props:{
        title:String,
    }
    
}
</script>