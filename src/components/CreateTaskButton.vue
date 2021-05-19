<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark color="primary" v-bind="attrs" v-on="on">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
            <Textfield/>
            <Textarea/>
          
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script scoped>
import Textfield from '@/components/Textfield'
import Textarea from '@/components/Textarea'
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    components: {
        Textfield,
        Textarea
    }
  }
</script>