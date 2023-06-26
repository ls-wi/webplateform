<template>
    <div class="py-10 m-auto my-10 font-zilla">
        <h2 class="text-center bg-yellow w-min m-auto p-1 text-4xl mb-10">Développement Web</h2>

        <div class="">

            <div class="bg-lgrey rounded px-10">
                <div class="md:w-3/4 m-auto">
                    <h3 class="categorie">Création de Sites Web</h3>
                    <p class="text-lg text-center p-5 font-sans">Avec notre équipe expérimentée de développeurs et de designers, nous créons des <span class="bg-yellow p-1">sites web professionnels, attractifs et adaptés à vos objectifs commerciaux</span>. Chaque entreprise est unique, c'est pourquoi nous offrons des solutions sur mesure pour répondre à vos besoins spécifiques. Faites confiance à Web Treasure pour créer un site web efficace qui vous permettra de <span class="bg-yellow p-1">développer votre activité en ligne</span>. Contactez-nous dès maintenant pour en savoir plus sur nos services et pour discuter de votre projet.</p>
                </div>
            </div>

            <div class="mt-5 bg-white rounded px-10">
                <div class="md:w-3/4 m-auto">
                    <h3 class="categorie">Les étapes</h3>

                    <div class="w-9/12 m-auto">
                        <img src="../src/etapes.png" alt="">
                    </div>


                </div>
            </div>

            <div class="mt-5 bg-lgrey rounded px-10">
                <div class=" m-auto">
                    <h3 class="categorie md:w-3/4 m-auto">Les types de sites</h3>
                    <Slider></Slider>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Slider from './Slider.vue';
export default{
    name: "ServicesWeb",
    components: { Slider }
}
</script>