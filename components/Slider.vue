<template>
    <div class="pb-10">
        <Flicking :options="{ circular: true, easing: x => 1 - Math.pow(1 - x, 3)}" @move-end="onMoveEnd" class="">
            <SiteType></SiteType>
            <SiteVitrine></SiteVitrine>
            <SiteRefonte></SiteRefonte>
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