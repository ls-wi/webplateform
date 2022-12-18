<template>
  <div>
    <Header/>
    <Banner/>
    <Presentation/>
    <Crew/>
    <Contact/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Presentation from '../components/Presentation.vue';
import Contact from '../components/Contact.vue';
import Crew from '../components/Crew.vue';
export default {
  name: 'IndexPage',
  components:{
    Header,
    Banner,
    Presentation,
    Contact,
    Crew,
  }
}
</script>
