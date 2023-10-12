
<template>
    <div class="pb-10">
        <Flicking :options="{ circular: true}" :plugins="plugins ">
            <SiteVitrine class="mb-16 border-dgrey border-2"></SiteVitrine>
            <SiteType class="mb-16 border-dgrey border-2"></SiteType>
        </Flicking>
    </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";

import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/vue3-flicking/dist/flicking.css";


import SiteType from "./SiteType.vue";
import SiteVitrine from "./SiteVitrine.vue";
import SiteRefonte from "./SiteRefonte.vue";

export default {
    name: 'Slider',
    components: {
    Flicking,
    SiteType,
    SiteVitrine,
    SiteRefonte
    },
}
</script>
