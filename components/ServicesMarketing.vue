<template>

    <div class="lg:w-3/4 m-auto font-zilla bg-lgrey mt-10 rounded p-10">
        <p class="text-center bg-yellow md:w-2/6 m-auto p-1 text-4xl font-zilla mb-4">Nos services Marketing Digital</p>
        <div class="lg:grid lg:grid-cols-2 text-center m-auto">

            <div class="bg-dgrey text-white md:mx-10 rounded pb-2">
                <p class="text-3xl p-3 mt-3">Design</p>
                <ServiceCard :title="Crea.title" :text="Crea.text"/>
                <ServiceCard :title="Id.title" :text="Id.text"/>
            </div>

            <div class="bg-dgrey text-white md:mx-10 rounded pb-2">
                <p class="text-3xl p-3 mt-3">Stratégie</p>
                <ServiceCard :title="Seo.title" :text="Seo.text"/>
                <ServiceCard :title="Bench.title" :text="Bench.text"/>
            </div>

        </div>
    </div>

</template>


<script>
import ServiceCard from "./ServiceCard.vue"
export default{
    name:'ServicesMarketing',
    components:{
        ServiceCard,
    },
    data(){
        return{
            Seo: {title:"SEO et Réferencement Naturel", text:"Optimisez le référencement de votre site pour le placer parmi les premiers résultats de recherche et générer plus de visites. Le SEO est l'outil qui vous garantira un trafic constant."},
            Bench: {title:"Benchmarking et Analyse Concurrentielle", text:"Soyez les meilleurs de votre niche et utilisez l'engoument autour de vos concurrents pour créer vous même votre propre mouvement. Tirez le plus de leçons possible de votre concurrence."},
            Crea: {title:"Gestion et Creation de contenu", text:"Votre contenu est le corps de votre marketing, il faut donc qu'il se démarque clairement et impressionne le public. Donnez vous la meilleure image possible avec un contenu parfait."},
            Id: {title:"Création d'Identité Visuelle", text:"Démarquez vous avec un look qui transmettera les bons messages à votre public cible. L'identité visuelle est la clé pour obtenir de bonnes premières impressions."},
        }
    }
}
</script>