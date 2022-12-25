<template>

    <div class="w-3/4 m-auto font-zilla bg-black mt-10 rounded p-10">
        <p class="text-center bg-[#FBB811] md:w-2/6 m-auto p-1 text-4xl font-zilla mb-4">Nos services Marketing Digital</p>
        <div class="lg:grid lg:grid-cols-2 text-center m-auto">

            <div class="bg-[#FBB811] md:mx-10 rounded pb-2">
                <p class="text-3xl p-3 mt-3">Design</p>
                <ServiceCard :title="Crea.title"/>
                <ServiceCard :title="Id.title"/>
            </div>

            <div class="bg-[#FBB811] md:mx-10 rounded pb-2">
                <p class="text-3xl p-3 mt-3">Stratégie</p>
                <ServiceCard :title="Seo.title"/>
                <ServiceCard :title="Bench.title"/>
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
            Seo: {title:"SEO et Réferencement Naturel", text:""},
            Bench: {title:"Benchmarking et Analyse Concurrentielle", text:""},
            Crea: {title:"Gestion et Creation de contenu", text:""},
            Id: {title:"Création d'Identité Visuelle", text:""},
        }
    }
}
</script>