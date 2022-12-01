<template>
  <div>
    <Header/>
    <Banner/>
    <Presentation/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Presentation from '../components/Presentation.vue';
export default {
  name: 'IndexPage',
  components:{
    Header,
    Banner,
    Presentation,
  }
}
</script>
