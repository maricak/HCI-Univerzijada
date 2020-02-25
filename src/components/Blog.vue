<template>
  <div id="blog">
    <h3 class="my-3">{{blog.title}}</h3>
    <p>{{blog.desc}}</p>
    <div class="card-columns">
      <div class="card" v-for="i in blog.numImages" :key="i" :data-remote="require('../assets/' + blog.image + i + '.jpg')">
        <a :href="require('../assets/' + blog.image + i + '.jpg')" data-toggle="lightbox" data-gallery="example-gallery">
          <img :src="require('../assets/' + blog.image + i + '.jpg')" class="img-fluid ">
        </a>
      </div>
    </div>
  </div>
</template>
 <script>

export default {
  name: "Blog",
  data() {
    return {
      blog: {},
    }
  },
  created() {
    var id = Number(this.$route.params.id);
    var blog = this.$parent.blogs.find(blog => blog.id == id)
    this.blog = blog;
  },
  methods: {
  }
};
 </script>

<style lang="scss">
</style>


