<template>
    <div class="ml-10 rounded">
        <div class="grid grid-cols-2 max-w-7xl">
            <div class="">
                <h4 class="text-3xl text-white bg-dgrey border-b-4 border-yellow p-3">Créez un <span class="bg-yellow text-black px-1">site vitrine</span> 
                    pour donner une image et une 
                    <span class="bg-yellow text-black px-1">visibilité</span> à votre entreprise !
                </h4>
                <p class="p-3 text-xl my-10 mr-16">
                    Web Treasure est votre partenaire pour la création de votre site vitrine. 
                    Nous vous accompagnons tout au long du processus, de la création des contenus à la mise en page, afin de vous démarquer 
                    dans votre secteur d'activités. Faites-nous confiance pour façonner une image digitale qui vous met en valeur et attire l'attention. 
                    Avec notre expertise et notre engagement, nous vous aiderons à créer une présence en ligne remarquable qui vous démarquera de vos concurrents.
                </p>
            </div>
            <img src="../src/site-vitrine.png" class="w-36 absolute self-center justify-self-center">
            <img src="../src/food_delivery.jpg" class="h-full">
        </div>
    </div>
</template>


<script>
export default{
    name:'SiteVitrine',
    props:{
        title:String,
    }
    
}
</script>