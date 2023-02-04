<template>
  <div>
    <div class="lg:h-screen lg:grid lg:grid-cols-1">
      <Header/>
      <Banner/>
      <Presentation/>
    </div>
    <ServicesWeb/>
    <ServicesMarketing/>
    <Crew/>
    <Contact/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Presentation from '../components/Presentation.vue';
import Contact from '../components/Contact.vue';
import Crew from '../components/Crew.vue';
import Footer from '../components/Footer.vue';
import ServicesMarketing from '../components/ServicesMarketing.vue';
import ServicesWeb from '../components/ServicesWeb.vue'

export default {
  name: 'IndexPage',
  components:{
    Header,
    Banner,
    Presentation,
    Contact,
    Crew,
    Footer,
    ServicesMarketing,
    ServicesWeb,
  }
}
</script>
