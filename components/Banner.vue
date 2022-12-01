<template>
    <div class="banner">
        <TypeEffect class="bannerText" :words="words"/>
    </div>
</template>

<script>

import TypeEffect from './TypingEffect.vue'
export default{
    name:'Banner',
    data() {
      return {
        words:['Web Development', 'Digital Marketing', 'Consulting', "Let's sail together!"]
      }
    },
    components:{
        TypeEffect
    }
}
</script>