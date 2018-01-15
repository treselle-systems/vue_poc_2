<template>
  <!-- Top content -->
  <div class="top-content">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2 text">
                <h1><strong>Login to our site</strong></h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3 form-box">
              <div class="form-top">
                <div class="form-top-left">
                  <h3>Enter your email and password:</h3>
                    
                </div>
                <div class="form-top-right">
                  <i class="fa fa-key"></i>
                </div>
                </div>
                <div v-if="errorMsg" class="error-msg ">{{ errorMsg }}</div>
                <div class="form-bottom">
                <div class="form-group " v-bind:class="{'has-error' : (errorMsg != ''), 'has-feedback' : (errorMsg != '')}" >
                  <label class="sr-only" for="form-email">Email</label>
                    <input type="text" name="form-email" placeholder="Email..." class="form-email form-control" v-model="email">
                  </div>
                  <div class="form-group" v-bind:class="{'has-error' : (errorMsg != ''), 'has-feedback' : (errorMsg != '')}">
                    <label class="sr-only" for="form-password">Password</label>
                    <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" v-model="password">
                  </div>
                  <button v-on:click="submit" class="btn"><strong>Log in!</strong></button>
            </div>
            </div>
        </div>
    </div>
  </div>

  
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    /**
     * To validate the inputs and handle login response
     */
    submit: function () {
      var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.email === '') {
        this.errorMsg = 'Enter Email'
        return false
      } else if (this.password === '') {
        this.errorMsg = 'Enter Password'
        return false
      } else if (!emailReg.test(this.email.toLowerCase())) {
        this.errorMsg = 'Enter Valid Email'
        return false
      } else {
        this.errorMsg = ''
      }
      var endpoint = 'login'
      var data = {
        email: this.email,
        password: this.password
      }

      this.$http.post(endpoint, data).then((response) => {
        if (response.body && response.body.status === true) {
          var userData = response.body.userObject
          this.$cookies.set('userName', userData.firstName)
          this.$cookies.set('token', userData.token)
          this.$router.push('/home')
        } else {
          this.errorMsg = response.body.errMsg
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  /**
   * Before Mount is used to load the required functions on default page load
   */
  beforeMount: function () {
    if (this.$cookies.get('token')) {
      this.$router.push('/home')
    }
  }
}
</script>

