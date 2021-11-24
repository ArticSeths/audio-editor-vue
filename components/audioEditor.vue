<template>
  <div>
    <input id="files" type="file" name="file" style="display: none;">
    <b-button-group>
      <b-button @click="load()">
        Abrir
      </b-button>
      <b-button id="btn_undo" disabled @click="audioLayerControl.undo();audioLayerControl.zoomToFit();">
        Deshacer
      </b-button>
      <b-button id="btn_redo" disabled @click="audioLayerControl.redo();">
        Rehacer
      </b-button>
      <b-button @click="audioLayerControl.crop();audioLayerControl.zoomIntoSelection();audioLayerControl.selectdbl();">
        Recortar selección
      </b-button>
      <b-button @click="audioLayerControl.del();">
        Eliminar
      </b-button>
      <b-button @click="audioLayerControl.reset();">
        Restaurar
      </b-button>
    </b-button-group>
    <b-button-group>
      <b-button @click="audioLayerControl.selectAll();">
        Seleccionar todo
      </b-button>
      <!-- <b-button @click="audioLayerControl.zoomIntoSelection();">
        Ampliar la selección
      </b-button> -->
      <b-button @click="audioLayerControl.zoomToFit();">
        Mostrar todo
      </b-button>
    </b-button-group>
    <div id="audioloader" style="width: 100%; text-align: center;" />
    <div class="si" style="width: 100%;">
      <div class="span12" style="cursor: e-resize;">
        <audiolayercontrol id="audioLayerControl" title="" />
      </div>
    </div>
    <div id="app-progress" class="bar" style="width: 0%;" />
    <b-button-group>
      <b-button @click="saveFile();">
        Guardar
      </b-button>
    </b-button-group>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.config.ignoredElements = ['audiolayercontrol']
export default {
  props: {
    flagLegends: {
      type: Boolean,
      default: true
    },
    filterLegend: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      c3: {},
      data: {},
      infoLegend: {},
      audioLayerControl: null,
      url_src: 'https://media.certifyad.com/audios/kaTE7qLmIIgL6P3r%2B7lMOE4Dy1xT4qNGu4SvlogMKM3O%2BMYlHIONEdwe6r%2BLI0IWHoN4Jzaizv0HdgIxxxYSGwHdxrjFE2Kcgeko29ZzpBs%3D'
    }
  },
  watch: {

  },
  mounted () {
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', '/index_editor.js')
    document.head.appendChild(recaptchaScript)
    this.audioLayerControl = document.getElementById('audioLayerControl')
    this.$nextTick(() => {
      // this.load()
    })
  },
  methods: {
    openFileModal () {
      document.getElementById('files').click()
    },
    load () {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      // const audioContext = new AudioContext()
      this.downloadFile(this.url_src, (blob) => {
        new Promise((resolve, reject) => {
          resolve(blob.arrayBuffer())
        }).then((arrayBuffer) => {
          this.audioLayerControl.loadArrayBuffer(arrayBuffer, true)
        })
      })

      // init audio editor
      // window.onDocumentLoaded()
    },
    downloadFile (src, callback) {
      new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', src)
        xhr.onreadystatechange = () => {
          if (xhr.getAllResponseHeaders().includes('Content-Range')) {
          }
          resolve(xhr.getResponseHeader('Content-Range'))
          xhr.abort()
        }
        xhr.send()
      }).then((size) => {
        size = size.split('/')[1]
        const chunks = 2
        Promise.all(new Array(chunks).fill().map((_, i) => {
          return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()

            xhr.onreadystatechange = () => {
              if (xhr.readyState !== 4) {
                return
              }
              window.URL = window.URL || window.webkitURL

              resolve(xhr.response)
            }

            xhr.open('GET', src)
            xhr.responseType = 'blob'
            const chunkSize = Math.floor(size / chunks)
            const start = i * chunkSize
            const end = i === chunks - 1 ? size - 1 : ((i + 1) * chunkSize - 1)
            xhr.setRequestHeader('Range', `bytes=${start}-${end}`)
            xhr.send(null)
          })
        })).then(function (result) {
          callback(new Blob(result))
        })
      })
    },
    get_wavdata () {
      const acontrol = this.audioLayerControl.audioLayerControl
      const wave = new window.WaveTrack()
      const sequenceList = []
      for (let i = 0; i < acontrol.listOfSequenceEditors.length; ++i) {
        sequenceList.push(acontrol.listOfSequenceEditors[i].audioSequenceReference)
      }
      wave.fromAudioSequences(sequenceList)
      return wave.encodeWaveFile()
    },
    saveFile () {
      if (!this.audioLayerControl.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference) {
        return
      }

      const wavdata = this.get_wavdata()
      const outBitRate = '128k'
      window.audio_convert(
        wavdata,
        outBitRate,
        1,
        'mp3',
        function done (audiodata, outputfile) {
          if (audiodata) {
            const blob = new Blob([audiodata])
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = outputfile
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
          }
        }
      )
    }
  }
}
</script>
<style scoped>

/*-------------styles.css-----------------*/
body{
  padding-top:50px;
  overflow-x:hidden
}
.navbar .navbar-nav{
  display:inline-block;
  float:none;
  vertical-align:top
}
.navbar .navbar-collapse{
  text-align:center
}
.btn-group{
  margin:3px
}
.top-buffer{
  margin-top:20px
}
.jumbotron.intro{
  margin-top:0
}
.jumbotron{
  margin:60px 0;
  padding:0;
  padding-right:0
}
.thumbnail p{
  margin-bottom:0;
  font-size:15px;
  margin-left:80px;
  color:#666
}
.thumbnail div{
  margin:5px;
  height:100%;
  background-size:80px
}
.thumbnail .lead{
  margin-bottom:5px;
  font-size:22px;
  font-weight:200;
  margin-left:80px;
  color:inherit
}
.thumbnail_big div{
  margin:0;
  padding:0
}
.thumbnail_big .lead,.thumbnail_big li,.thumbnail_big p{
  margin:0;
  padding:0
}
.h1,h1{
  font-size:38px
}
.yamm-content a{
  color:inherit;
  text-decoration:none
}
.thumbnail{
  height:130px;
  OVERFLOW:HIDDEN
}
.thumbnail:hover{
  -webkit-filter:hue-rotate(135deg);
  filter:hue-rotate(135deg)
}
.viewr_item{
  height:110px
}
.icon_bear-audio-editor{
  background:url(/img/bear-audio-editor.png) no-repeat;
  padding:5px;
  background-size:200px!important;
  margin-top:40px!important
}
.icon_mp3-to-wav{
  background:url(/img/mp3-to-wav.png) no-repeat
}
.icon_wav-to-mp3{
  background:url(/img/wav-to-mp3.png) no-repeat
}
.icon_midi-to-mp3{
  background:url(/img/midi-to-mp3.png) no-repeat
}
.icon_mp3-to-midi{
  background:url(/img/mp3-to-midi.png) no-repeat
}
.icon_mp4-to-mp3{
  background:url(/img/mp4-to-mp3.png) no-repeat
}
.icon_video-to-mp3{
  background:url(/img/video-to-mp3.png) no-repeat
}
.icon_flv-to-mp3{
  background:url(/img/flv-to-mp3.png) no-repeat
}
.icon_mov-to-mp3{
  background:url(/img/mov-to-mp3.png) no-repeat
}
.icon_3gp-to-mp3{
  background:url(/img/3gp-to-mp3.png) no-repeat
}
.icon_music-converter{
  background:url(/img/music-converter.png) no-repeat
}
.logo{
  padding-top:5px;
  margin-right:5px;
  display:inline-block;
  background:url(/img/logo.png) no-repeat center;
  width:20px;
  height:20px
}
.thumbnail p{
  text-align:left
}
.top-buffer{
  margin-top:20px
}
.upload_border{
  padding:15px;
  background-color:#e8e8e8
}
.ajax-upload-dragdrop{
  vertical-align:middle!important;
  height:105px;
  width:100%!important;
  background-color:#fff;
  text-align:center!important
}
#fileuploader{
  height:105px;
  width:100%!important;
  background-color:#fff
}
.ajax-file-upload-statusbar{
  width:100%!important;
  text-align:center!important
}
.datagrid table{
  border-collapse:collapse;
  text-align:left;
  width:100%
}
.datagrid{
  font:normal 12px/150% Arial,Helvetica,sans-serif;
  background:#fff;
  overflow:hidden
}
.datagrid table td,.datagrid table th{
  padding:3px 4px
}
.datagrid table thead th{
  background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#8c8c8c),color-stop(1,#7d7d7d));
  background:-moz-linear-gradient(center top,#8c8c8c 5%,#7d7d7d 100%);
  background-color:#8c8c8c;
  color:#fff;
  font-size:15px;
  font-weight:700;
  border-left:1px solid #a3a3a3
}
.datagrid table thead th:first-child{
  border:none
}
.datagrid table tbody td{
  color:#7d7d7d;
  border-left:1px solid #dbdbdb;
  font-size:12px;
  border-bottom:1px solid #e1eef4;
  font-weight:400
}
.datagrid table tbody td:first-child{
  border-left:none
}
.datagrid table tbody tr:last-child td{
  border-bottom:none
}
.div_center{
  display:block;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  -webkit-transform:translate(-50%,-50%);
  -moz-transform:translate(-50%,-50%);
  -ms-transform:translate(-50%,-50%);
  -o-transform:translate(-50%,-50%)
}
.div_center2{
  width:100%;
  text-align:center
}
.clear_row{
  float:none;
  clear:both
}
.feature_zone{
  border:1px dashed #5f69a3;
  -moz-border-radius:5px;
  -webkit-border-radius:5px;
  border-radius:5px;
  padding:25px;
  margin:8px 10px;
  font-family:inherit;
  font-size:inherit;
  font-style:inherit;
  font-weight:inherit;
  color:#333;
  background-color:#fff;
  margin-bottom:25px
}
.feature_zone p{
  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size:14px;
  line-height:1.42857143
}
.page-header{
  font-weight:300!important;
  font-size:32px;
  font-family:'Open Sans',sans-serif;
  text-transform:uppercase;
  padding-bottom:5px;
  padding-top:25px;
  margin-top:0;
  margin-bottom:0!important
}
.header-desc{
  font-size:15px!important;
  font-family:'Open Sans',sans-serif;
  color:#666;
  font-weight:0!important
}
.blackheader{
  background-color:#000;
  background-color:rgba(0,0,0,.65)
}
.headercolor{
  color:#fff
}
.navbar-brand{
  padding:8px 15px
}
.jumbotron{
  -webkit-background-size:cover;
  -moz-background-size:cover;
  -o-background-size:cover;
  background-size:cover;
  margin-bottom:0
}
#interget{
  background-color:#dedede;
  padding:5px
}
#interget p{
  font-size:.8em;
  color:#6d6d6d
}
#interget td{
  font-size:.8em;
  color:#6d6d6d
}
.tab-body{
  background-color:rgba(255,255,255,.8);
  padding:15px
}
.top-suffer{
  margin-top:5px
}
.ctitle{
  font-size:1.2em;
  color:#666;
  font-weight:700
}
.csubtitle{
  font-size:1em;
  color:#666;
  text-align:left;
  font-style:italic
}
.nav-tabs>li{
  position:relative
}
.nav-tabs>li>a{
  display:inline-block
}
.nav-tabs>li>span{
  display:none;
  cursor:pointer;
  position:absolute;
  right:6px;
  top:8px;
  color:red
}
.nav-tabs>li:hover>span{
  display:inline-block
}
.spinner input{
  text-align:right
}
.input-group-btn-vertical{
  position:relative;
  white-space:nowrap;
  width:1%;
  vertical-align:middle;
  display:table-cell
}
.input-group-btn-vertical>.btn{
  display:block;
  float:none;
  width:100%;
  max-width:100%;
  padding:8px;
  margin-left:-1px;
  position:relative;
  border-radius:0
}
.input-group-btn-vertical>.btn:first-child{
  border-top-right-radius:4px
}
.input-group-btn-vertical>.btn:last-child{
  margin-top:-2px;
  border-bottom-right-radius:4px
}
.input-group-btn-vertical i{
  position:absolute;
  top:0;
  left:4px
}
.converter-body{
  background-color:#fff;
  background-color:rgba(255,255,255,.9);
  padding-top:10px;
  padding-left:25px;
  padding-right:25px;
  margin:25px
}
.datagrid table{
  border-collapse:collapse;
  text-align:left;
  width:100%
}
.datagrid{
  font:normal 12px/150% Arial,Helvetica,sans-serif;
  background:#fff;
  overflow:hidden
}
.datagrid table td,.datagrid table th{
  padding:3px 4px
}
.datagrid table thead th{
  background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#8c8c8c),color-stop(1,#7d7d7d));
  background:-moz-linear-gradient(center top,#8c8c8c 5%,#7d7d7d 100%);
  background-color:#8c8c8c;
  color:#fff;
  font-size:15px;
  font-weight:700;
  border-left:1px solid #a3a3a3
}
.datagrid table thead th:first-child{
  border:none
}
.datagrid table tbody td{
  color:#7d7d7d;
  border-left:1px solid #dbdbdb;
  font-size:12px;
  border-bottom:1px solid #e1eef4;
  font-weight:400
}
.datagrid table tbody td:first-child{
  border-left:none
}
.datagrid table tbody tr:last-child td{
  border-bottom:none
}
.div_center{
  display:block;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  -webkit-transform:translate(-50%,-50%);
  -moz-transform:translate(-50%,-50%);
  -ms-transform:translate(-50%,-50%);
  -o-transform:translate(-50%,-50%)
}
.div_center2{
  width:100%;
  text-align:center
}
.thumbnail_big{
  height:280px;
  OVERFLOW:HIDDEN
}
.well{
  margin-top:5px;
  margin-bottom:5px
}
#pluswrap{
  position:fixed;
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  background:rgba(0,0,0,0);
  top:0
}
.plus{
  display:flex;
  margin:0 auto
}
.fa-check{
  color:green
}
#helpmenu{
  height:450px
}
#helpmenu ul{
  list-style-type:decimal;
  height:400px;
  overflow-y:scroll
}
#helpmenu li{
  font-size:16px;
  margin-bottom:5px;
  border-bottom:solid 1px #ccc;
  margin-left:-15px
}
.modal-les{
  overflow:hidden
}
.modal-dialog-les{
  margin-right:0;
  margin-left:0
}
.modeless-les{
  top:10%;
  left:50%;
  bottom:auto;
  right:auto;
  margin-left:-300px
}
#helpcontent{
  height:450px
}
.vertical-center-outer{
  display:table;
  position:absolute;
  height:100%;
  width:100%
}
.vertical-center-middle{
  display:table-cell;
  vertical-align:middle
}
.vertical-center-inner{
  margin-left:auto;
  margin-right:auto;
  width:100%
}
.newsign{
  position:absolute;
  z-index:99;
  background:url(/img/newsign.png);
  background-repeat:no-repeat;
  width:25px;
  height:26px;
  right:0
}
.ibutton{
  cursor:pointer;
  color:#337ab7
}
.pageNum{
  font-size:20px;
  color:#337ab7!important;
  text-decoration:underline!important
}
.hkey{
  font-size:16px;
  color:#337ab7!important;
  text-decoration:underline!important;
  cursor:pointer
}
.table-head th{
  text-align:center;
  background-color:rgba(155,155,155,.4)
}
.exAd div {
   text-align:center;
}
.exAd i {
   color: #337ab7;
}
.exDesc i {
   margin-left: 5px;
   margin-right: 5px;
   color: #337ab7;
}
/*------------------------------*/
</style>
