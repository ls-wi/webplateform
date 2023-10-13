
<template>
    <div class="pb-10">
          <SiteVitrine class=" border-dgrey border-2 "></SiteVitrine>
    </div>
</template>

<script>

import SiteType from "./SiteType.vue";
import SiteVitrine from "./SiteVitrine.vue";
import SiteRefonte from "./SiteRefonte.vue";

export default {
    name: 'Slider',
    components: {
    SiteType,
    SiteVitrine,
    SiteRefonte
    },
}
</script>
