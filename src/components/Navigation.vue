<template>
<div>
     <v-list>
      <v-list-item-group
        active-class="teal--text"
        multiple
        v-model="selected"
      >
      <v-list-item disabled>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Your Groups
          </v-list-item-title>
          <v-list-item-subtitle>
            Choose groups to show in board
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
        <template v-for="(group, index) in groups">
          

          
          <v-list-item :key="group.id" @click="activeGroup(group)">
            
            <template v-slot:default="{ active }">
              <v-list-item-action >

                <v-icon
                  v-if="active"
                  color="teal lighten-1"
                >
                  mdi-card
                </v-icon>

                <v-icon
                  v-else
                  color="grey darken-0"
                >
                  mdi-card-off-outline
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                

                <v-list-item-title v-text="group.name"></v-list-item-title>

              </v-list-item-content>

              
            </template>
          </v-list-item>

          <v-divider
            v-if="index < groups.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <addGroupListItem/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import addGroupListItem from '@/components/addGroupListItem.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    addGroupListItem
  },
  computed: {
    ...mapState([
      'groups',
    ]),
    selected () {
      const groups = this.$store.state.groups
      const activeGroupIndex = groups.reduce(function(accumulator, currentValue, index) {
        if (currentValue.active === true) {
          accumulator.push(index + 1);
          }
        return accumulator;
        }, [])
        console.log(activeGroupIndex)
      return activeGroupIndex
    }
  },
  methods: {
    activeGroup (group) {
      group.active = !group.active
      console.log(group.active)
      this.$store.dispatch('updateGroups', group)
    },
    openDialog () {
      this.$refs.openDialog.openDialog()
    },
  }
}
</script>