<template>
  <div>
    <div class="lg:grid lg:grid-cols-1">
      <Header/>
      <Banner/>
      <Presentation id="pres"/>
    </div>
    <ServicesWeb id="servweb"/>
    <ServicesMarketing/>
    <Crew id="crew"/>
    <Contact id="contact"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './src/components/Header.vue'
import Presentation from './src/components/Presentation.vue';
import Contact from './src/components/Contact.vue';
import Crew from './src/components/Crew.vue';
import Footer from './src/components/Footer.vue';
import ServicesWeb from './src/components/ServicesWeb.vue'
import ServicesMarketing from './src/components/ServicesMarketing.vue';
import Banner from './src/components/Banner.vue';

export default {
  name: 'App',
  components:{
    Header,
    Presentation,
    Contact,
    Crew,
    Footer,
    ServicesMarketing,
    ServicesWeb,
    Banner,
  }
}
</script>
