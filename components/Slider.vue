<template>
    <div class="pb-10">
        <Flicking :options="{ circular: true, easing: x => 1 - Math.pow(1 - x, 3)}" @move-end="onMoveEnd" class="">
            <SiteType></SiteType>
            <img src="../src/site-vitrine.png" class="w-1/12 h-max ml-10 ">
            <SiteVitrine></SiteVitrine>
            <img src="../src/maintenance.png" class="w-1/12 h-max ml-10">
            <SiteRefonte></SiteRefonte>
            <img src="../src/ecommerce.png" class="w-1/12 h-max ml-10">
        </Flicking>
    </div>
</template>
  
<script>
import { Flicking } from "@egjs/vue-flicking";
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
}
</script>

<style>
@import url("node_modules/@egjs/vue-flicking/dist/flicking.css");
</style>