
<template>
<!-- Top content -->

  <div class="top-content home">
    <div class="row bg-head">
      <div class="col-sm-2 col-sm-offset-10 text">
        <span class="glyphicon glyphicon-user"><span class="menu">{{ firstName }}</span></span>
        <span class="menu" v-on:click="logout">
          <a href="#"><i class="fa fa-power-off" aria-hidden="true"></i></a>
        </span>
      </div>
    </div>
    <div class="container">
      <div>
        <div><img src="../assets/welcome.jpg"></div>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      firstName: 'User'
    }
  },
  methods: {
    /**
     * To logout the session and remove the token and user data from cookies
     */
    logout: function () {
      this.$cookies.remove('token')
      this.$cookies.remove('userName')
      this.$router.push('/')
    }
  },
  /**
   * Before Mount is used to load the required functions on default page load
   */
  beforeMount: function () {
    let userObj = this.$cookies.get('userName')
    console.log(userObj)
    this.firstName = userObj
    if (this.$cookies.get('token') == null) {
      this.$router.push('/')
    }
  }
}
</script>

