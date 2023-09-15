<template>
    <div class="pb-10">
        <Flicking :options="{ circular: true, easing: x => 1 - Math.pow(1 - x, 3)}" @move-end="onMoveEnd" :plugins="plugins" class="">
            <SiteType class="mb-16"></SiteType>
            <SiteVitrine class="mb-16"></SiteVitrine>
            <SiteRefonte></SiteRefonte>
           <div slot="viewport" class="flicking-pagination"></div>
        </Flicking>
    </div>
</template>

<script>
import { Flicking } from "@egjs/vue-flicking";

import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";

import SiteType from "./SiteType.vue";
import SiteVitrine from "./SiteVitrine.vue";
import SiteRefonte from "./SiteRefonte.vue";

export default {
    name: 'Slider',
    components: {
    Flicking: Flicking,
    SiteType,
    SiteVitrine,
    SiteRefonte
    },
    data(){
        return {
//            plugins: [new Pagination({ type: 'bullet' })]
        }
    }
}
</script>

<style>
@import url("node_modules/@egjs/vue-flicking/dist/flicking.css");
</style>
