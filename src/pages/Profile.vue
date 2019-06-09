<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card dark class="bg-grey-10 q-ma-sm" text-color="white" flat square>
      <q-card-section>
        <div class="text-h6">Profile Name</div>
      </q-card-section>
      <q-card-section>
        <q-form dark
          @submit="submit"
          class="q-gutter-xs"
        >
            <q-input
              dark
              v-model="profile.displayName"
              lazy-rules
              :rules="[
                  val => val !== null && val !== '' || 'You need to enter OTP'
              ]"
            />
          <q-btn color="primary" type="submit" no-caps>
            <span v-if="!loading">Set Profile</span>
            <q-spinner-dots v-else/>
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { QSpinnerDots } from 'quasar'

export default {
  components: {
    QSpinnerDots
  },
  data () {
    return {
      profile: {
        keyRef: null,
        displayName: ''
      },
      loading: false
    }
  },
  validations: {
    profile: {
      displayName: { required }
    }
  },
  methods: {
    async submit () {
      this.loading = true
      this.$v.profile.$touch()
      if (this.$v.profile.$error) {
        this.$q.notify('Please provide the required input.')
      } else {
        let errorInUpdate
        await this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/').update(this.profile, function (error) {
          errorInUpdate = error
        })
        if (errorInUpdate != null) {
          this.$q.notify({
            message: 'Error occured',
            type: 'negative'
          })
        } else {
          this.$v.$reset()
          this.$q.notify({
            message: 'Profile Updated',
            color: 'primary',
            textColor: 'white'
          })
          this.$router.push('home')
        }
      }
      this.loading = false
    }
  },
  mounted () {
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'Profile', slogan: '' })
  }
}
</script>

<style>
</style>
