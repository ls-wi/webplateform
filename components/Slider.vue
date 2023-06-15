<template>
    <div class="pb-10">
        <Flicking :options="{ circular: true, easing: x => 1 - Math.pow(1 - x, 3)}" @move-end="onMoveEnd" class="">
            <SiteType></SiteType>
            <SiteType></SiteType>
            <SiteType></SiteType>
        </Flicking>
    </div>
</template>
  
<script>
import { Flicking } from "@egjs/vue-flicking";
import SiteType from "./SiteType.vue";

export default {
    name: 'Slider',
    components: {
    Flicking: Flicking,
    SiteType
},
}
</script>

<style>
@import url("node_modules/@egjs/vue-flicking/dist/flicking.css");
</style>