<template>
    <div class="banner border-b-4 border-yellow">
        <TypeEffect class="bannerText" :words="words"/>
    </div>
</template>

<script>

import TypeEffect from './TypingEffect.vue'
export default{
    name:'Banner',
    data() {
      return {
        words:['Développement Web', 'Marketing', 'Stratégie Digitale', "Mettons les voiles !"]
      }
    },
    components:{
        TypeEffect
    }
}
</script>