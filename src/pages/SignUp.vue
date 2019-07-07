<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card dark class="bg-grey-10 q-ma-sm" text-color="white" flat square style="width: 80%; max-width: 350px;">
      <q-card-section>
        <div class="text-h6">Sign Up</div>
      </q-card-section>
      <q-card-section>
        <q-form dark @submit="onSubmit">
            <q-input dark v-model="form.email" label="Email *" stack-label :error="$v.form.email.$error"  />
            <q-input dark type="password" v-model="form.password" label="Password *" stack-label :error="$v.form.password.$error" />
            <q-input dark type="password" v-model="form.password_again" label="Retype Password *" stack-label :error="$v.form.password_again.$error" />
          <div class="row no-wrap">
            <q-btn color="grey-9" type="submit" class="q-mr-sm">
              <span v-if="!loading">Sign Up</span>
              <q-spinner-dots v-else/>
            </q-btn>
            <q-btn color="grey-8" no-caps outline @click="$router.push('login')" >Log In</q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { QSpinnerDots } from 'quasar'

export default {
  components: {
    QSpinnerDots
  },
  data () {
    return {
      form: {
        email: '',
        passwprd: '',
        password_again: ''
      },
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
      password_again: { sameAsPassword: sameAs('password') }
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
        await this.$auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((result) => {
            if (result.user !== null) {
              this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/').once('value').then(function (snapshot) {
                console.log(snapshot.val())
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
            this.$q.notify({ message: error.message, color: 'negative' })
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
