<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card dark class="bg-grey-10 q-ma-sm" text-color="white" flat square>
      <q-card-section>
        <div class="text-h6">Phone Login</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-xs no-warp" style="max-width: 400px">
    <q-form dark
      @submit="onPhoneSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <div class="row">
      <div class="col-3">
        <q-input dark
          v-model="code"
          label="Country *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'e.g. +91']"
        />
      </div>
      <div class="col-1">
      </div>
      <div class="col-8">
        <q-input dark
          v-model="phone"
          label="Your Phone  *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please enter mobile number e.g. +91xxxxxxxxxx']"
        />
      </div>

    </div>
    <div class="row">
      <div class="col-8">
        <q-btn label="Request OTP" :disable="OTPRecieved" id="recaptchVerifier" size="md" outline :loading="submitting" type="submit" color="secondary" class="q-mb-md" >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
      <div class="col-4">
        <q-btn label="Reset" size="md" type="reset" color="primary" flat class="q-ml-xs" no-caps />
      </div>
    </div>
    </q-form>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input dark
        type="number"
        v-model="otp"
        label="OTP *"
        lazy-rules
        :disable="!OTPRecieved"
        :rules="[
          val => val !== null && val !== '' || 'You need to enter OTP'
        ]"
      />
      <div>
        <q-btn label="Submit" :disable="!OTPRecieved" size="md" type="submit" color="primary"/>
      </div>
    </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { QSpinnerFacebook } from 'quasar'
export default {
  components: {
    QSpinnerFacebook
  },
  data () {
    return {
      code: '+91',
      phone: '9704038269',
      otp: '',
      accept: false,
      submitting: false,
      recaptchaVerifier: null,
      confirmationResultHolder: null,
      OTPRecieved: false
    }
  },

  methods: {
    async onPhoneSubmit () {
      this.submitting = true
      let that = this
      let code = this.code
      let phoneNumber = code + this.phone

      if (code.charAt(0) !== '+' || code.length < 2) {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          message: 'Country Code looks incorrect'
        })
        this.submitting = false
        this.recaptchaVerifier.reset()
        return
      }
      this.$auth.signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier).then((confirmationResult) => {
        this.$q.notify({
          color: 'primary',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'OTP Sent'
        })
        that.confirmationResultHolder = confirmationResult
        that.OTPRecieved = true
        that.submitting = false
      }).catch((error) => {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          message: error.message
        })
        this.submitting = false
        this.recaptchaVerifier.reset()
        this.OTPRecieved = false
        this.otp = null
      })
    },
    onSubmit () {
      let store = this.$store
      let user = {}
      let router = this.$router
      this.confirmationResultHolder.confirm(this.otp).then((result) => {
        if (result.user !== null) {
          user.phoneNumber = result.user.phoneNumber
          this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/').once('value').then(function (snapshot) {
            if (snapshot.val() !== null && snapshot.val().displayName !== 'undefined' && snapshot.val().displayName !== null) {
              user.displayName = snapshot.val().displayName
              router.push('home')
            } else {
              router.push('profile')
            }
            store.dispatch('user/setUser', user)
          })
        }
      }).catch((error) => {
        this.$q.notify({
          message: error.message
        })
        this.recaptchaVerifier.reset()
        this.OTPRecieved = false
        this.otp = null
      })
    },

    onReset () {
      this.phone = null
      this.OTPRecieved = false
    }
  },
  mounted () {
    this.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier('recaptchVerifier', {
      'size': 'invisible',
      'callback': function (response) {
      },
      'expired-callback': function () {
        this.$q.notify({
          message: 'Captcha expired',
          type: 'negative'
        })
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.my-card
  width 100%
</style>
