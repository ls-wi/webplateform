<template>
    <div class="ml-10 rounded">
        <div class="grid md:grid-cols-2 lg:max-w-5xl md:max-w-2xl max-w-xs">
            <div class="">
                <h4 class="md:text-3xl text-2xl text-white bg-dgrey border-b-4 border-yellow p-5 text-center md:text-left ">Créez un <span class="bg-yellow text-black px-1">site vitrine</span> 
                    pour donner une image et une 
                    <span class="bg-yellow text-black px-1">visibilité</span> à votre entreprise !
                </h4>
                <p class="p-5 md:text-xl text-lg md:mt-10 md:mr-16 text-justify md:text-left">
                    Web Treasure est votre partenaire pour la création de votre site vitrine. 
                    Nous vous accompagnons tout au long du processus, de la création des contenus à la mise en page, afin de vous démarquer 
                    dans votre secteur d'activités. Faites-nous confiance pour façonner une image digitale qui vous met en valeur et attire l'attention. 
                    Avec notre expertise et notre engagement, nous vous aiderons à créer une présence en ligne remarquable qui vous démarquera de vos concurrents.
                </p>
            </div>
            <img src="../src/site-vitrine.png" class="w-36 md:absolute  self-center justify-self-center">
            <img src="../src/food_delivery.jpg" class="self-center  hidden md:block">
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