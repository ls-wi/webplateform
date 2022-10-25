<template>
    <div class="nav">

        <img src="../src/logo.jpg"/>

        <a href="#" class="contact">Contact us</a>
        <a href="#">About us</a>
        <a href="#">Services</a>
        <a href="#">Home</a>
    </div>
</template>

<script>
export default{
    name:'Header'
}
</script>

<style>
.nav{
    background-color:white;
    margin-right: 150px;
}
.nav a{
    float: right;
    padding: 6.5% 2.5%;
    font-size: 18px;
}
.nav img{
    float: left;
    height: 263px;
    width: 305px;
}
.nav .contact{
    background-color: #FBB811;
    color: white;
}
</style>