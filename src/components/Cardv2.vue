<template>
  <v-col  cols="12">
    <v-card color="#385F73" dark>
      <v-container class="pt-0">
        <v-row no-gutters>
          <v-layout wrap>
          <v-col cols="1" >
            <v-checkbox
              :input-value="task.finished"
              @click.stop
              @change="updateCheckbox"
              class="pt-pb-1"
            ></v-checkbox>
          </v-col>
          <v-col cols="9"><v-card-title class="pt-pb-1">{{ task.title }}</v-card-title></v-col>
          <v-col cols="2" align-self="center"><CardMenu/></v-col>
          </v-layout >
          <v-col cols="12" @click.stop="">
            <v-card-text
              class="pa-2 markdown"
              v-html="description"
              v-clipboard:copy="codes"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"></v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <pre v-highlightjs="sourcecode"><code class="javascript"></code></pre>
    </v-card>
  </v-col>
</template>

<script>
import CardMenu from '@/components/CardMenu'
import marked from 'marked'
// import hljs from 'highlightjs'


export default ({
  props: {
    task: Object
  },
  data () {
    return {
      message: 'TEST',
      sourcecode: 'const s = new Date().toString()'
    }
  },
  components: {
    CardMenu,
  },
  methods: {
    updateCheckbox () {
      this.$emit('updateCheckbox', this.task)
    },
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function () {
      alert('Failed to copy texts')
    }
  },
  computed: {
    description: function() {
      return marked(this.task.description)
    },
    codes: function() {
      let string = marked(this.task.description)
      // while (string.length > 0) {
      //   const html = string.match(/(.*)(?=<code)/)
      // }
      const codes = string.match(/<code.+?<\/code>/gi);
      console.log(codes)
      if (!codes) {
        return ''
      }
      return codes.join(',')
    }
  },
})
</script>
<style scoped>
/*=======
   Gist関連
  =======*/

/* 奇数行と偶数行の背景色を濃いグレーで統一する */
.gist table tr {
background-color: rgba(220,220,220,0.2) !important;
}

/* 行番号を非表示にする */
.blob-num {
  display: none;
}

/* ソースコード下部のボックスを非表示にする */
.gist-meta {
  display: none;
}

.gist-file {
  border-bottom: none !important;
}

/* 文字大きくしてフォント変更する */
table.highlight tr td,table.highlight tr td span {
	font-size: 15px !important;
	font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace !important;
}

/* 上部の余白を開ける */
.gist tr:first-child td {
  padding-top: 12px !important;
}

/* 下部の余白を開ける */
.gist tr:last-child td {
  padding-bottom: 12px !important;
}

</style>
