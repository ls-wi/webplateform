<template>
  <div>
    <Header/>
    <Banner/>
    <Presentation/>
    <Contact/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Presentation from '../components/Presentation.vue';
import Contact from '../components/Contact.vue';
export default {
  name: 'IndexPage',
  components:{
    Header,
    Banner,
    Presentation,
    Contact,
  }
}
</script>
