<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card dark class="bg-grey-10 q-ma-sm" text-color="white" flat square style="width: 80%; max-width: 350px;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form dark @submit="onSubmit">
          <q-input dark v-model="form.email" label="Email *" stack-label
            :error="$v.form.email.$error" />
          <!-- <p v-if="$v.form.email.$error">The input is needed!</p> -->
          <q-input dark type="password" label="Password *" stack-label v-model="form.password" class="q-mb-md"
            :error="$v.form.password.$error" />
          <!-- <p v-if="$v.form.password.$error">The input is needed!</p> -->
          <div class="row no-wrap">
            <q-btn no-caps color="grey-9" type="submit" class="q-mr-sm">
              <span v-if="!loading">Sign In</span>
              <q-spinner-dots v-else/>
            </q-btn>
            <q-btn color="grey-8" no-caps outline @click="$router.push('signUp')" >Sign Up</q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { QSpinnerDots } from 'quasar'

export default {
  components: {
    QSpinnerDots
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    async onSubmit () {
      let store = this.$store
      let user = {}
      let router = this.$router
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.loading = true
        // this.$auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
        await this.$auth.signInWithEmailAndPassword(this.form.email, this.form.password)
          .then((result) => {
            if (result.user !== null) {
              this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/').once('value').then(function (snapshot) {
                if (snapshot.val() !== null && snapshot.val().displayName !== 'undefined' && snapshot.val().displayName !== null) {
                  user.displayName = snapshot.val().displayName
                  router.push('home')
                } else {
                  router.push('profile')
                }
                store.dispatch('user/setUser', user)
              })
              this.loading = false
            }
          }).catch((error) => {
            if (error.code === 'auth/network-request-failed') {
              this.$q.notify(error.message)
            } else {
              this.$q.notify({ message: 'Email / password not correct. Please check', color: 'negative' })
            }
          })
        this.loading = false
      }
    }
  }
}

</script>
<style lang="stylus">
#login
  .mid-bg
    background $primary
    height 50vh
    position fixed
    top 0
    left 0
    width 100%

  .login-card
    padding 50px
    width 40%
    margin 0 auto
    position fixed
    top 50%
    transform translate(-50%, -50%)
    left 50%
    @media (max-width: 400px)
      padding 20px
      width 90%
    @media (max-width: 1000px)
      width 80%
    .login-title
      color rgba(0, 0, 0, .5)
      font-weight bold
      text-align center
      padding-bottom 20px
</style>
