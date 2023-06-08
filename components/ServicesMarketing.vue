<template>

    <div class="m-auto font-zilla bg-lgrey mt-10 rounded p-10">
        <h2 class="text-center bg-yellow md:w-2/6 m-auto p-1 text-4xl font-zilla mb-4">Nos services Marketing Digital</h2>
        <div class="md:w-3/4 m-auto">

            <div class="">
                <h3 class="categorie">Design</h3>
                <ServiceCard :title="Crea.title" :text="Crea.text"/>
                <ServiceCard :title="Id.title" :text="Id.text"/>
            </div>

            <div class="">
                <h3 class="categorie">Stratégie</h3>
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
            Seo: {title:"SEO et Réferencement Naturel", text:"Le SEO et le référencement naturel sont clés pour être visible sur les moteurs de recherche. En travaillant avec nous, vous pouvez être sûr que nous mettons en place une stratégie de référencement naturel efficace qui vous permettra d'atteindre vos objectifs de visibilité et de génération de leads. "},
            Bench: {title:"Benchmarking et Analyse Concurrentielle", text:"Le benchmarking et l'analyse concurrentielle sont essentiels pour comprendre comment se positionne votre entreprise sur le marché et pour déterminer les actions à mettre en place pour améliorer votre performance. Nous travaillons avec vous pour déterminer vos points forts et vos points à améliorer."},
            Crea: {title:"Gestion et Creation de contenu", text:"Notre agence de marketing digital est experte en création et gestion de contenu. Nous vous accompagnons pour développer une stratégie de contenu efficace et engageante, qui vous permettra de captiver votre audience et de vous démarquer de vos concurrents."},
            Id: {title:"Création d'Identité Visuelle", text:"Nous sommes passionnés par l'aide que nous apportons aux entreprises pour développer leur image de marque. Nous travaillons avec vous pour créer une identité visuelle cohérente et impactante qui reflète votre entreprise de manière professionnelle et attrayante. "},
        }
    }
}
</script>