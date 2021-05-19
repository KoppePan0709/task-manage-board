<template>
    <div >
        <v-card class="mt-5 mb-8 mx-auto" max-width="400" v-for="(todo, key) in todos" :key="key">
            <v-container>
                <v-row justify="center">
                    <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="400"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-col cols="10"><v-layout><v-checkbox></v-checkbox><v-card-title class="pa-2" v-bind="attrs" v-on:click="getTaskId($event);" v-on="on"  :_id="todo.id">{{ todo.title }}</v-card-title></v-layout></v-col>
                        <v-col cols="2"><v-card-actions class="pa-2">...</v-card-actions></v-col>
                    </template>
                    <v-card>
                        <v-card-title class="headline">
                            <Textfield :title="title"/>
                            <Textarea :description="description"/>
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
                <!-- <v-row style="height: 70px">
                    <v-col cols="10"><v-layout><v-checkbox></v-checkbox><v-card-title class="pa-2">{{ todo.title }}</v-card-title></v-layout></v-col>
                    <v-col cols="2"><v-card-actions class="pa-2">...</v-card-actions></v-col>
                </v-row> -->
                <v-row>
                    <v-col cols="12"><v-card-subtitle class="pa-2 description">{{ todo.description }}</v-card-subtitle></v-col>
                    
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import Textfield from '@/components/Textfield'
import Textarea from '@/components/Textarea'

export default ({
    data: () => {
        return {
            todos: {
                type: Object
            },
            dialog: false,
            title: '',
            description: '',
        }
    },
    created() {
        const storage = sessionStorage
        if (storage) {
            let todos = []
            for ( let i = 0; i < storage.length; i ++){
                todos.push(JSON.parse(storage[i]))
            }
            this.todos = todos
        }
    },
    components: {
        Textfield,
        Textarea
    },
    methods: {
        getTaskId: function (event) {
            console.log(event.target.innerHTML)
            const id = event.target.getAttribute('_id')
            const title = this.todos[id].title
            const description = this.todos[id].description
            this.title = title
            this.description = description
        }
    }
})
</script>

<style scoped>
.description {
    display: flex;
    align-items: center;
}
</style>
