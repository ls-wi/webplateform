<template>
    <div class="ml-10 rounded">
        <div class="grid grid-cols-2 max-w-7xl ">
            <div class="">
                <div class="">
                    <h4 class="text-3xl text-white bg-dgrey border-b-4 border-yellow p-3">Créez un site de <span class="bg-yellow text-black px-1">e-commerce</span> 
                        pour vendre et promouvoir vos produits en ligne et développer 
                        <span class="bg-yellow text-black px-1">votre chiffre d'affaires</span> !
                    </h4>
                </div>
                <p class="p-3 text-xl mt-10 mr-16">
                    Web Treasure vous accompagnera dans votre projet de création de site de e-commerce quels que soient vos produits ou services. 
                    Notre équipe expérimentée crée des plateformes esthétiques, conviviales et sécurisées, adaptées à vos besoins. 
                    Faites confiance à Web Treasure pour donner vie à votre présence en ligne et transformer votre entreprise en succès commercial.
                </p>
            </div>
            <img src="../src/ecommerce.png" class="w-36 absolute self-center justify-self-center">
            <img src="../src/design123.jpg" class="h-full">
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