/* eslint-disable */
var str_drag = "Arrastra y suelta los archivos aquí";
var str_leftc = "";
var str_rightc = "";
var str_position = "Iniciar:";
var str_selection = "Selección:";

onDocumentLoaded()
function handleFileSelect2 (evt) {
  evt.stopPropagation()
  evt.preventDefault()
  const files = evt.target.files
  document.getElementById('audioLayerControl').loadfile(files, true)
  this.value = null
}
document.getElementById('files').addEventListener('change', handleFileSelect2, false)
document.getElementById('audioLayerControl').setStartAndEndFun(function st () {
  // loader
}, function ed (ret) {
  // ret = ok o error
}, function error (info) {
  // error
}, function lockscreen (lock) {
  // lock
})
document.getElementById('audioLayerControl').setUpdateUndoUIFun(function setUpdateUnDoUI (hisLen, curPos) {
  if (hisLen <= 0 || curPos > hisLen - 1) {
    document.getElementById('btn_undo').classList.add('disabled')
    document.getElementById('btn_undo').setAttribute("disabled", "disabled")
    document.getElementById('btn_redo').classList.add('disabled')
    document.getElementById('btn_redo').setAttribute("disabled", "disabled")
    return
  }
  if (curPos <= -1) {
    document.getElementById('btn_undo').classList.add('disabled')
    document.getElementById('btn_undo').setAttribute("disabled", "disabled")
  } else {
    document.getElementById('btn_undo').classList.remove('disabled')
    document.getElementById('btn_undo').removeAttribute("disabled")
  }
  if (curPos === hisLen - 1) {
    document.getElementById('btn_redo').classList.add('disabled')
    document.getElementById('btn_redo').setAttribute("disabled", "disabled")
  } else {
    document.getElementById('btn_redo').classList.remove('disabled')
    document.getElementById('btn_redo').removeAttribute("disabled")
  }
})
/* -------------output.min.js----------------- */
function AudioPlayback () {
  this.onAudioUpdate = function (e) {
    var t = this.eventHost
      , i = t.audioBufferSize
      , o = i / t.sampleRate;
    if (!1 !== t.isPlaying) {
        var n = t.audioDataRef
          , s = e.outputBuffer.getChannelData(0)
          , a = e.outputBuffer.getChannelData(1);
        1 == n.length ? (t.copyChannelDataToBuffer(s, n[0], t.currentPlayPosition, i, t.playStart, t.playEnd, t.isLooped),
        t.currentPlayPosition = t.copyChannelDataToBuffer(a, n[0], t.currentPlayPosition, i, t.playStart, t.playEnd, t.isLooped)) : 2 == n.length && (t.copyChannelDataToBuffer(s, n[0], t.currentPlayPosition, i, t.playStart, t.playEnd, t.isLooped),
        t.currentPlayPosition = t.copyChannelDataToBuffer(a, n[1], t.currentPlayPosition, i, t.playStart, t.playEnd, t.isLooped)),
        void 0 === t.currentPlayPosition ? t.stop() : (t.lastPlaybackUpdate -= o,
        t.lastPlaybackUpdate < 0 && (t.lastPlaybackUpdate = t.playbackUpdateInterval,
        t.notifyUpdateListener()))
    }
  }

  this.copyChannelDataToBuffer = function (e, t, i, o, n, s, a) {
    var r = i
      , h = i + o > t.length ? t.length : i + o > s ? s : i + o
      , l = h - r
      , c = l < e.length ? a ? n : 0 : void 0
      , u = void 0 !== c ? e.length - l + c : void 0;
    e.length;
    return void 0 === c ? (this.copyIntoBuffer(e, 0, t, r, h),
    h) : (this.copyIntoBuffer(e, 0, t, r, h),
    a ? (this.copyIntoBuffer(e, l, t, c, u),
    u) : void 0)
  }

  this.copyIntoBuffer = function (e, t, i, o, n) {
    e.set(i.slice(o, n), t)
  }
  
  this.init = function () {
    return this.audioBufferSize = 1024,
    this.sampleRate = 0,
    window.AudioContext = window.AudioContext || window.webkitAudioContext,
    this.audioContext = new AudioContext,
    this.analyserNode = this.audioContext.createAnalyser(),
    this.analyserNode.minDecibels = -100,
    this.analyserNode.maxDecibels = 0,
    this.analyserNode.smoothingTimeConstant = 0,
    this.analyserNode.connect(this.audioContext.destination),
    this.audioDataRef = void 0,
    this.playStart = 0,
    this.playEnd = 0,
    this.isLooped = !1,
    this.currentPlayPosition = 0,
    this.isPlaying = !1,
    this.updateListener = [],
    this.playbackUpdateInterval = 0,
    this.lastPlaybackUpdate = 0,
    this.updateListener.push(this.updateCallback),
    this.audioContext
  }

  this.selectdbl = function () {
    this.eventHost.selectionStart != this.eventHost.selectionEnd ? (this.eventHost.selectionStart = 0,
    this.eventHost.selectionEnd = 0) : (this.eventHost.selectionStart = 0,
    this.eventHost.selectionEnd = this.eventHost.getPixelToAbsolute(this.eventHost.canvasReference.width)),
    this.eventHost.mouseDown = !1,
    this.eventHost.mouseSelectionOfStart = !1,
    this.eventHost.mouseSelectionOfEnd = !1,
    this.eventHost.mouseInsideOfSelection = !1,
    focusOnAudioLayerSequenceEditor = void 0,
    this.eventHost.repaint(!0),
    this.eventHost.updateSelectionForLinkedEditors(!0)
  }
  
  this.play = function (e, t, i, o, n) {
    this.isPlaying || void 0 === e || e.length < 1 || e[0].length < 1 || void 0 === t || t <= 0 || (this.audioContext = this.audioContext || this.init(),
    this.javaScriptNode || (this.javaScriptNode = this.audioContext.createScriptProcessor(this.audioBufferSize, 1, 2),
    this.javaScriptNode.onaudioprocess = this.onAudioUpdate,
    this.javaScriptNode.eventHost = this),
    this.audioDataRef = e,
    this.sampleRate = t,
    this.isLooped = void 0 !== i && i,
    this.playStart = void 0 === o || o < 0 || o >= e[0].length ? 0 : o,
    this.playEnd = void 0 === n || n - this.audioBufferSize < o || n >= e[0].length ? e[0].length : n,
    this.currentPlayPosition = this.playStart,
    this.isPlaying = !0,
    this.javaScriptNode.connect(this.analyserNode),
    this.notifyUpdateListener())
  }
  
  this.stop = function () {
    !1 !== this.isPlaying && (this.isPlaying = !1,
    this.javaScriptNode.disconnect(this.analyserNode),
    this.playStart = 0,
    this.playEnd = 0,
    this.isLooped = !1,
    this.currentPlayPosition = 0,
    this.lastPlaybackUpdate = 0,
    this.audioDataRef = void 0,
    this.sampleRate = 0,
    this.javaScriptNode = void 0,
    this.notifyUpdateListener())
  }
  
  this.pause = function () {
    !1 !== this.isPlaying && (this.isPlaying = !1,
    this.lastPlaybackUpdate = 0,
    this.javaScriptNode.disconnect(this.analyserNode),
    this.notifyUpdateListener())
  }
  
  this.resume = function () {
    this.isPlaying || void 0 === this.audioDataRef || this.audioDataRef.length < 1 || (this.isPlaying = !0,
    this.javaScriptNode.connect(this.analyserNode),
    this.notifyUpdateListener())
  }
  
  this.addUpdateListener = function (e) {
    this.updateCallback = e
  }
  
  this.notifyUpdateListener = function () {
    for (let e = 0; e < this.updateListener.length; ++e) {
      this.updateListener[e].audioPlaybackUpdate()
    }
  }
}

function IsPowerOfTwo (e) {
  return !(e < 2) && !(e & e - 1)
}

function NumberOfBitsNeeded (e) {
  var t;
  e < 2 && (console.error("Error: FFT called with size %d\n", e),
  exit(1));
  for (var t = 0; ; t++)
    if (e & 1 << t)
      return t
}

function ReverseBits (e, t) {
  for (var i, o, i = o = 0; i < t; i++)
    o = o << 1 | 1 & e,
    e >>= 1;
  return o
}

function ACInitFFT () {
  gFFTBitTable = [];
  for (var e = 2, t = 1; t <= MaxFastBits; t++) {
    gFFTBitTable[t - 1] = new Int32Array(e);
    for (var i = 0; i < e; i++)
      gFFTBitTable[t - 1][i] = ReverseBits(i, t);
    e <<= 1
  }
}

function DeinitFFT () {
  if (gFFTBitTable) {
    for (var e = 1; e <= MaxFastBits; e++)
      gFFTBitTable[e - 1] = void 0;
    gFFTBitTable = void 0
  }
}

function FastReverseBits (e, t) {
  return t <= MaxFastBits ? gFFTBitTable[t - 1][e] : ReverseBits(e, t)
}

function ACFFT (e, t, i, o, n, s) {
  var a, r, h, l, c, u, d, f, v, p = 2 * Math.PI;
  if (!IsPowerOfTwo(e))
    return console.log(e + " is not a power of two"),
    1;
  gFFTBitTable || ACInitFFT(),
  t || (p = -p),
  a = NumberOfBitsNeeded(e);
  for (var r = 0; r < e; r++)
    h = FastReverseBits(r, a),
    n[h] = i[r],
    s[h] = void 0 === o ? 0 : o[r];
  for (d = 1,
  u = 2; u <= e; u <<= 1) {
    for (var m, g, S, y, w, E, q = p / u, R = Math.sin(-2 * q), C = Math.sin(-q), L = Math.cos(-2 * q), A = Math.cos(-q), T = 2 * A, r = 0; r < e; r += u) {
      S = L,
      g = A,
      E = R,
      w = C;
      for (var h = r, c = 0; c < d; h++,
      c++)
        m = T * g - S,
        S = g,
        g = m,
        y = T * w - E,
        E = w,
        w = y,
        l = h + d,
        f = m * n[l] - y * s[l],
        v = m * s[l] + y * n[l],
        n[l] = n[h] - f,
        s[l] = s[h] - v,
        n[h] += f,
        s[h] += v
    }
    d = u
  }
  if (t)
    for (var b = e, r = 0; r < e; r++)
      n[r] /= b,
      s[r] /= b
}

function RealFFT (e, t, i, o) {
  for (var n, s = e / 2, a = Math.PI / s, r = new Float32Array(s), h = new Float32Array(s), n = 0; n < s; n++)
    r[n] = t[2 * n],
    h[n] = t[2 * n + 1];
  ACFFT(s, 0, r, h, i, o);
  for (var l, c, u, d, f, v = Math.sin(.5 * a), p = -2 * v * v, m = -1 * Math.sin(a), g = 1 + p, S = m, n = 1; n < s / 2; n++)
    l = s - n,
    c = .5 * (i[n] + i[l]),
    u = .5 * (o[n] - o[l]),
    d = .5 * (o[n] + o[l]),
    f = -.5 * (i[n] - i[l]),
    i[n] = c + g * d - S * f,
    o[n] = u + g * f + S * d,
    i[l] = c - g * d + S * f,
    o[l] = g * f - u + S * d,
    g = (v = g) * p - S * m + g,
    S = S * p + v * m + S;
  i[0] = (c = i[0]) + o[0],
  o[0] = c - o[0]
}

function PowerSpectrum (e, t, i) {
  for (var o, n = e / 2, s = Math.PI / n, a = new Float32Array(n), r = new Float32Array(n), h = new Float32Array(n), l = new Float32Array(n), o = 0; o < n; o++)
    a[o] = t[2 * o],
    r[o] = t[2 * o + 1];
  ACFFT(n, 0, a, r, h, l);
  for (var c, u, d, f, v, p, m, g = Math.sin(.5 * s), S = -2 * g * g, y = -1 * Math.sin(s), w = 1 + S, E = y, o = 1; o < n / 2; o++)
    c = n - o,
    u = .5 * (h[o] + h[c]),
    d = .5 * (l[o] - l[c]),
    f = .5 * (l[o] + l[c]),
    v = -.5 * (h[o] - h[c]),
    p = u + w * f - E * v,
    m = d + w * v + E * f,
    i[o] = p * p + m * m,
    p = u - w * f + E * v,
    m = w * v - d + E * f,
    i[c] = p * p + m * m,
    w = (g = w) * S - E * y + w,
    E = E * S + g * y + E;
  p = (u = h[0]) + l[0],
  m = u - l[0],
  i[0] = p * p + m * m,
  p = h[n / 2],
  m = l[n / 2],
  i[n / 2] = p * p + m * m
}

function NumWindowFuncs () {
  return 10
}

function WindowFuncName (e) {
  switch (e) {
    default:
    case 0:
      return 'Rectangular'
    case 1:
      return 'Bartlett'
    case 2:
      return 'Hamming'
    case 3:
      return 'Hanning'
    case 4:
      return 'Blackman'
    case 5:
      return 'Blackman-Harris'
    case 6:
      return 'Welch'
    case 7:
      return 'Gaussian(a=2.5)'
    case 8:
      return 'Gaussian(a=3.5)'
    case 9:
      return 'Gaussian(a=4.5)'
  }
}

function WindowFunc (e, t, i) {
  var o, n
  switch (e) {
    case 1:
      for (var o = 0; o < t / 2; o++) { i[o] *= o / t / 2, i[o + t / 2] *= 1 - o / t / 2 }
      break
    case 2:
      for (var o = 0; o < t; o++) { i[o] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * o / (t - 1)) }
      break
    case 3:
      for (var o = 0; o < t; o++) { i[o] *= 0.5 - 0.5 * Math.cos(2 * Math.PI * o / (t - 1)) }
      break
    case 4:
      for (var o = 0; o < t; o++) { i[o] *= 0.42 - 0.5 * Math.cos(2 * Math.PI * o / (t - 1)) + 0.08 * Math.cos(4 * Math.PI * o / (t - 1)) }
      break
    case 5:
      for (var o = 0; o < t; o++) { i[o] *= 0.35875 - 0.48829 * Math.cos(2 * Math.PI * o / (t - 1)) + 0.14128 * Math.cos(4 * Math.PI * o / (t - 1)) - 0.01168 * Math.cos(6 * Math.PI * o / (t - 1)) }
      break
    case 6:
      for (var o = 0; o < t; o++) { i[o] *= 4 * o / t * (1 - o / t) }
      break
    case 7:
      n = -12.5
      for (var o = 0; o < t; o++) { i[o] *= Math.exp(n * (0.25 + o / t * (o / t) - o / t)) }
      break
    case 8:
      n = -24.5
      for (var o = 0; o < t; o++) { i[o] *= Math.exp(n * (0.25 + o / t * (o / t) - o / t)) }
      break
    case 9:
      n = -40.5
      for (var o = 0; o < t; o++) { i[o] *= Math.exp(n * (0.25 + o / t * (o / t) - o / t)) }
  }
}

function ComputeSpectrum (e, t, i, o, n, s, a) {
  if (t < i) { return !1 }
  if (!e || !n) { return !0 }
  for (var r, h = new Float32Array(i), r = 0; r < i; r++) { h[r] = 0 }
  for (var l = i / 2, c = new Float32Array(i), u = new Float32Array(i), d = new Float32Array(i), f = 0, v = 0; f + i <= t;) {
    for (var r = 0; r < i; r++) { c[r] = e[f + r] }
    if (WindowFunc(a, i, c), s) {
      ACFFT(i, !1, c, void 0, u, d)
      for (var r = 0; r < i; r++) { c[r] = u[r] * u[r] + d[r] * d[r] }
      for (var r = 0; r < i; r++) { c[r] = (c[r]) ** (1 / 3) }
      ACFFT(i, !1, c, void 0, u, d)
    } else { PowerSpectrum(i, c, u) }
    for (var r = 0; r < l; r++) { h[r] += u[r] }
    f += l, v++
  }
  if (s) {
    for (var r = 0; r < l; r++) { h[r] < 0 && (h[r] = 0), u[r] = h[r], h[r] -= r % 2 == 0 ? u[r / 2] : (u[r / 2] + u[r / 2 + 1]) / 2, h[r] < 0 && (h[r] = 0) }
    for (var r = 0; r < l; r++) { c[r] = h[r] / (i / 4) }
    for (var r = 0; r < l; r++) { h[l - 1 - r] = c[r] }
  } else {
    for (var r = 0; r < l; r++) {
      const p = h[r] / i / v
      h[r] = p > 0 ? 10 * Math.log(p) / Math.LN10 : 0
    }
  }
  for (var r = 0; r < l; r++) { n[r] = h[r] }
  return !0
}

function HistoryDo () {
  this.dotype = '', this.dataAdd = [], this.addPos = 0, this.addLen = 0, this.dataDel = [], this.delPos = 0, this.delLen = 0, this.samplerate = 48e3, this.gain = 0, this.selectStart = 0, this.selectEnd = 0, this.setDataAdd = function (e, t, i) {
    e != null && (this.dataAdd = [], this.dataAdd = this.dataAdd.concat(e), this.addPos = t, this.addLen = i)
  }, this.setDataDel = function (e, t, i) {
    e != null && (this.dataDel = [], this.dataDel = this.dataDel.concat(e), this.delPos = t, this.delLen = i)
  }
}

function BinaryReader (e) {
  this.data = new Uint8Array(e), this.pos = 0, this.signMasks = [0, 128, 32768, 8388608, 2147483648], this.masks = [0, 256, 65536, 16777216, 4294967296], this.gotoString = function (e) {
    for (let t = this.pos; t < this.data.length; ++t) {
      if (e[0] == String.fromCharCode(this.data[t])) {
        for (var i = !0, o = t; o < e.length + t; ++o) {
          if (e[o - t] != String.fromCharCode(this.data[o])) {
            i = !1
            break
          }
        } if (i == 1) {
          this.pos = t
          break
        }
      }
    }
  }, this.readUInt8 = function (e) {
    return this.readInteger(1, !1, e)
  }, this.readInt8 = function (e) {
    return this.readInteger(1, !0, e)
  }, this.readUInt16 = function (e) {
    return this.readInteger(2, !1, e)
  }, this.readInt16 = function (e) {
    return this.readInteger(2, !0, e)
  }, this.readUInt32 = function (e) {
    return this.readInteger(4, !1, e)
  }, this.readInt32 = function (e) {
    return this.readInteger(4, !0, e)
  }, this.readString = function (e) {
    let t = ''
    let i = 0
    for (i = 0; i < e; ++i) { t += String.fromCharCode(this.data[this.pos++]) }
    return t
  }, this.readInteger = function (e, t, i) {
    if (this.pos + (e - 1) >= this.data.length) { throw 'Buffer overflow during reading.' }
    let o = 0
    let n = 0
    for (o = 0; o < e; ++o) { !0 === i ? n = this.data[this.pos++] + (n << 8 * o) : n += this.data[this.pos++] << 8 * o }
    return t && n & this.signMasks[e] && (n -= this.masks[e]), n
  }, this.eof = function () {
    return this.data.length >= this.pos
  }
}

function BinaryWriter (e) {
  this.estimatedSize = e, this.pos = 0, this.data = new Uint8Array(e), this.masks = [0, 256, 65536, 16777216, 4294967296], this.writeUInt8 = function (e, t) {
    return this.writeInteger(e, 1, t)
  }, this.writeInt8 = function (e, t) {
    return this.writeInteger(e, 1, t)
  }, this.writeUInt16 = function (e, t) {
    return this.writeInteger(e, 2, t)
  }, this.writeInt16 = function (e, t) {
    return this.writeInteger(e, 2, t)
  }, this.writeUInt32 = function (e, t) {
    return this.writeInteger(e, 4, t)
  }, this.writeInt32 = function (e, t) {
    return this.writeInteger(e, 4, t)
  }, this.writeString = function (e) {
    let t = 0
    for (t = 0; t < e.length; ++t) { this.data[this.pos++] = e.charCodeAt(t) }
  }, this.writeInteger = function (e, t, i) {
    let o = e
    let n = 0
    for (e < 0 && (o += this.masks[t]), n = 0; n < t; ++n) { this.data[this.pos++] = !0 === i ? o >> 8 * (t - n - 1) & 255 : o >> 8 * n & 255 }
  }
}

function onDocumentLoaded () {
  ACInitFFT(), initializeAudioLayerControls()
  const e = document.querySelector('#audioLayerControl')
  e.removeAllSequenceEditors()
  e.createSequenceEditor('Left Channel'), e.createSequenceEditor('Right Channel')
  e.setLinkMode(!0)
}

function load_url_to_array (e, t, i) {
  const o = new XMLHttpRequest()
  const n = new FileReader()
  o.open('GET', e, !0), o.responseType = 'blob', o.addEventListener('load', function () {
    o.status === 200 ? (n.onload = function (e) {
      t && t(e.target.result)
    }, n.readAsArrayBuffer(o.response)) : i && i('load file error!')
  }, !1), o.send()
}

function get_int16array_from_unit8array (e) {
  for (var t = [0, 127, 32767, 66571993087], i = t[2], o = new Int16Array(e.length), n = 0; n < e.length; ++n) { o[n] = e[n] * i }
  return o
}

function mp3_encode (e, t, i, o, n, s, a, r) {
  const h = new Worker('/mp3_worker_v2.js')
  h.left = t, h.right = i, h.blocksize = 57600, h.onmessage = function (e) {
    if (e.data.cmd == 'done') { r(e.data.mp3data) } else if (e.data.cmd == 'progress') { a(e.data.proc) } else if (e.data.cmd == 'rq_chunk') {
      const t = e.data.i + this.blocksize > this.left.length ? this.left.length : e.data.i + this.blocksize
      this.postMessage({
        cmd: 'chunk',
        left: this.left.slice(e.data.i, t),
        right: this.right ? this.right.slice(e.data.i, t) : null
      })
    } else { e.data.cmd == 'error' && console.log('convert to Mp3 error') }
  }, h.postMessage({
    cmd: 'convert',
    in_samplerate: e,
    in_length: t.length,
    out_samplerate: o,
    out_channels: n,
    out_bitrate: s
  })
}

function timeToSeconds(e) {
  var t = e.split(":");
  return 60 * parseFloat(t[0]) * 60 + 60 * parseFloat(t[1]) + parseFloat(t[2]) + parseFloat("0." + t[3])
}

function audio_convert(e, t, i, o, s) {
  var a, r = /Duration: (.*?), /,
      h = /time=(.*?) /,
      l = new Worker("/audio_worker.js");
  l.onmessage = function(e) {
      var t = e.data;
      if ("ready" === t.type && window.File && window.FileList && window.FileReader);
      else if ("stdout" == t.type) console.log(t.data);
      else if ("stderr" == t.type) {
          if (console.log(t.data), r.exec(t.data) && (a = timeToSeconds(r.exec(t.data)[1])), h.exec(t.data)) {
              var i = timeToSeconds(h.exec(t.data)[1]);
              a
          }
      } else if ("done" == t.type) {
          var o = t.data.code,
              l = Object.keys(t.data.outputFiles);
          if (0 == o && l.length) {
              var c = l[0],
                  u = t.data.outputFiles[c];
              s(u, c)
          } else s(null)
      }
  };
  var arguments = [];
  switch (arguments.push("-i"), arguments.push("input.wav"), arguments.push("-b:a"), arguments.push(t),arguments.push("-ar"), arguments.push("44100"), arguments.push("-ac") , arguments.push(i), o.toLowerCase()) {
      case "mp3":
          arguments.push("-acodec"), arguments.push("libmp3lame"), arguments.push("export_ofoct.com.mp3");
          break;
      case "ogg":
          arguments.push("-acodec"), arguments.push("libvorbis"), arguments.push("export_ofoct.com.ogg");
          break;
      case "aac":
          arguments.push("-acodec"), arguments.push("libfdk_aac"), arguments.push("export_ofoct.com.mp4");
          break;
      case "wma":
          arguments.push("-acodec"), arguments.push("wmav1"), arguments.push("export_ofoct.com.asf")
  }
  console.log(arguments);
  console.log(e);
  l.postMessage({
      type: "command",
      arguments: arguments,
      files: [{
          name: "input.wav",
          buffer: e
      }]
  })
}

function output_throw (e) {
  console.log(e)
}

function audioLayerControl (e) {
  this.elementContext = e
  this.elementContext.audioLayerControl = this
  this.title = 'untitled', this.label = void 0
  this.audioPlayer = void 0
  this.listOfSequenceEditors = []
  this.linkMode = !1
  this.audioSequenceLength = 0
  this.playLoop = !1
  this.audioPlayback = new AudioPlayback()
  this.audioPlayback.addUpdateListener(this)
  this.spectrum = null
  this.spectrumWorker = new SpectrumWorker()
  this.audioPlaybackUpdate = function () {
    for (let e = 0; e < this.listOfSequenceEditors.length; ++e) { this.listOfSequenceEditors[e].playbackPos = this.audioPlayback.currentPlayPosition, this.elementContext.setStatu == 'start' && this.audioPlayback.isPlaying && (this.listOfSequenceEditors[e].selectionEnd = this.audioPlayback.currentPlayPosition), this.listOfSequenceEditors[e].repaint(!0) }
    const t = new Float32Array(this.audioPlayback.analyserNode.frequencyBinCount)
    this.audioPlayback.analyserNode.getFloatFrequencyData(t), this.audioPlayback.isPlaying || (this.elementContext.my_stop())
  }
  this.audioSequenceSelectionUpdate = function () {
    const e = this.listOfSequenceEditors[0].audioSequenceReference.data.length
    let t = this.listOfSequenceEditors[0].selectionStart
    t = t < 0 ? 0 : t > this.listOfSequenceEditors[0].audioSequenceReference.data.length - 1024 ? this.listOfSequenceEditors[0].audioSequenceReference.data.length - 1024 : t
    const i = (this.listOfSequenceEditors[0].selectionEnd > e ? e : this.listOfSequenceEditors[0].selectionEnd) - t
    const o = this.spectrumWorker.toAmplitudeSpectrumFromAudioSequence(this.listOfSequenceEditors[0].audioSequenceReference, t, i)
  }
  this.setTitle = function (e) {
    this.title = e
  }
  this.containsAudioLayerSequenceEditor = function (e) {
    for (let t = 0; t < this.listOfSequenceEditors.length; ++t) {
      if (this.listOfSequenceEditors[t].title == e) { return !0 }
    }
    return !1
  }
  this.addAudioLayerSequenceEditor = function (e) {
    for (let t = 0; t < this.listOfSequenceEditors.length; ++t) {
      if (this.listOfSequenceEditors[t].title === e.title) { return }
    }
    this.listOfSequenceEditors.push(e), this.updateLinkMode(this.linkMode)
  }
  this.removeAudioLayerSequenceEditor = function (e) {
    for (let t = 0; t < this.listOfSequenceEditors.length; ++t) {
      this.listOfSequenceEditors[t].title === e.title && this.listOfSequenceEditors.splice(t, 1)
    }
    this.updateLinkMode(this.linkMode)
  }
  this.updateLinkMode = function (e) {
    if (this.linkMode = e, this.linkMode) {
      for (let t = 0; t < this.listOfSequenceEditors.length - 1; ++t) {
        for (let i = t + 1; i < this.listOfSequenceEditors.length; ++i) {
          this.listOfSequenceEditors[t].link(this.listOfSequenceEditors[i])
        }
      }
    }
  }
  this.createVisualElements = function () {}
  this.createVisualElements(), void 0 !== typeof e.attributes.title && e.attributes.title !== null && this.setTitle(e.attributes.title.value)
  this.createSequenceEditor = function (e) {
    if (!0 !== this.audioLayerControl.containsAudioLayerSequenceEditor(e)) {
      const t = document.createElement('audioLayerSequenceEditor')
      t.title = e, this.appendChild(t)
      const i = new AudioLayerSequenceEditor(t)
      return this.audioLayerControl.addAudioLayerSequenceEditor(i), i
    }
  }, this.removeAllSequenceEditors = function () {
    for (let e = 0; e < this.children.length; ++e) { this.children[e].nodeName.toLowerCase() == 'audiolayersequenceeditor' && (this.audioLayerControl.removeAudioLayerSequenceEditor(this.children[e].audioLayerSequenceEditor), this.removeChild(this.children[e]), --e) }
  }, this.setLinkMode = function (e) {
    this.audioLayerControl.updateLinkMode(e)
  }, this.zoomIntoSelection = function () {
    if (this.audioLayerControl.listOfSequenceEditors.length > 0 && this.linkMode) { this.audioLayerControl.listOfSequenceEditors[0].zoomIntoSelection() } else { for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].zoomIntoSelection() } }
  }, this.zoomToFit = function () {
    if (this.audioLayerControl.listOfSequenceEditors.length > 0 && this.linkMode) { this.audioLayerControl.istOfSequenceEditors[0].zoomIntoSelection() } else { for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].zoomToFit() } }
  }, this.selectAll = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].selectAll() }
  }, this.selectFromS = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].selectFromS() }
  }, this.selectToE = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].selectToE() }
  }, this.goto_head = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].goto_head() }
  }, this.filterNormalize = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].filterNormalize() }
    this.reupdateUndoUI()
  }, this.filterFadeIn = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].filterFade(!0) }
    this.reupdateUndoUI()
  }, this.filterFadeOut = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].filterFade(!1) }
    this.reupdateUndoUI()
  }, this.filterGain = function (e) {
    for (let t = 0; t < this.audioLayerControl.listOfSequenceEditors.length; ++t) { this.audioLayerControl.listOfSequenceEditors[t].filterGain(e) }
    this.reupdateUndoUI()
  }, this.filterSilence = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].filterSilence() }
    this.reupdateUndoUI()
  }, this.copy = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].copy(!1) }
  }, this.paste = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].paste(!1) }
    this.reupdateUndoUI()
  }, this.cut = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].cut(!1) }
    this.reupdateUndoUI()
  }, this.crop = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].crop(!1) }
    this.reupdateUndoUI()
  }, this.del = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].del(!1) }
    this.reupdateUndoUI()
  }, this.toWave = function () {
    for (var e = new WaveTrack(), t = [], i = 0; i < this.audioLayerControl.listOfSequenceEditors.length; ++i) { t.push(this.audioLayerControl.listOfSequenceEditors[i].audioSequenceReference) }
    return e.fromAudioSequences(t), e
  }, this.playToggle = function () {
    this.audioLayerControl.audioPlayback.isPlaying ? this.stop() : this.play()

  }, this.selectdbl = function () {
    this.audioLayerControl.listOfSequenceEditors[0].selectionStart != this.audioLayerControl.listOfSequenceEditors[0].selectionEnd ? (this.audioLayerControl.listOfSequenceEditors[0].selectionStart = 0,
    this.audioLayerControl.listOfSequenceEditors[0].selectionEnd = 0) : (this.audioLayerControl.listOfSequenceEditors[0].selectionStart = 0,
    this.audioLayerControl.listOfSequenceEditors[0].selectionEnd = this.audioLayerControl.listOfSequenceEditors[0].getPixelToAbsolute(this.audioLayerControl.listOfSequenceEditors[0].canvasReference.width)),
    this.audioLayerControl.listOfSequenceEditors[0].mouseDown = !1,
    this.audioLayerControl.listOfSequenceEditors[0].mouseSelectionOfStart = !1,
    this.audioLayerControl.listOfSequenceEditors[0].mouseSelectionOfEnd = !1,
    this.audioLayerControl.listOfSequenceEditors[0].mouseInsideOfSelection = !1,
    focusOnAudioLayerSequenceEditor = void 0,
    this.audioLayerControl.listOfSequenceEditors[0].repaint(!0),
    this.audioLayerControl.listOfSequenceEditors[0].updateSelectionForLinkedEditors(!0)
  }, this.play = function () {
    for (var e = [], t = 0; t < this.audioLayerControl.listOfSequenceEditors.length; ++t) { e.push(this.audioLayerControl.listOfSequenceEditors[t].audioSequenceReference.data) }
    const i = this.audioLayerControl.listOfSequenceEditors[0].selectionStart
    const o = this.audioLayerControl.listOfSequenceEditors[0].selectionEnd
    i != o ? this.audioLayerControl.audioPlayback.play(e, this.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference.sampleRate, this.playLoop, i, o) : this.audioLayerControl.audioPlayback.play(e, this.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference.sampleRate, this.playLoop, i)
  }, this.stop = function () {
    this.audioLayerControl.audioPlayback.stop()
  }, this.my_stop = function () {
    this.playStatu != 'stop' && (this.audioLayerControl.audioPlayback.stop(), this.playStatu = 'stop')
  }, this.my_status = function () {
    return this.playStatu
  }, this.my_play = function () {
    this.playStatu == 'stop' ? (this.play(), this.playStatu = 'play') : this.playStatu == 'pause' && (this.audioLayerControl.audioPlayback.resume(), this.playStatu = 'play')
  }, this.my_pause = function () {
    this.playStatu == 'play' && (this.audioLayerControl.audioPlayback.pause(), this.playStatu = 'pause')
  }, this.elementContext.my_setupdateui = function (e) {
    this.update_playstatus = e
  }, this.set_start_sel = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].set_start_sel() }
    this.setStatu = 'start'
  }, this.set_end_sel = function () {
    this.setStatu = 'end'
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].set_end_sel() }
  }, this.elementContext.my_pause = this.my_pause, this.elementContext.my_play = this.my_play, this.elementContext.my_status = this.my_status, this.elementContext.my_stop = this.my_stop, this.elementContext.set_start_sel = this.set_start_sel, this.elementContext.set_end_sel = this.set_end_sel, this.elementContext.playStatu = 'stop', this.elementContext.setStatu = 'none', this.toggleLoop = function () {
    this.playLoop = !this.playLoop
  }, this.save = function (e) {
    const t = this.toWave()
      .toBlobUrlAsync('application/octet-stream')
    e.href = t
  }, this.elementContext.loadfile = function (e, t) {
    e.length <= 0 || (this.add = t, this.masterObj.handleFiles(e, this.masterObj))
  }, this.elementContext.loadArrayBuffer = function (e, t) {
    this.add = t, this.masterObj.handleArrayBuffer(e, this.masterObj)
  }, this.elementContext.reset = function () {
    this.add = !1, this.masterObj.reset(this.masterObj)
  }, this.elementContext.setStartAndEndFun = function (e, t, i, o) {
    this.fileload_start = e, this.fileload_end = t, this.error_callback = i, this.lockscreen = o
  }, this.elementContext.setUpdateUndoUIFun = function (e) {
    this.updateUndoUI = e
  }, this.elementContext.reupdateUndoUI = function () {
    this.updateUndoUI && this.audioLayerControl.listOfSequenceEditors.length > 0 && this.updateUndoUI(this.audioLayerControl.listOfSequenceEditors[0].listOfHistoryDo.length, this.audioLayerControl.listOfSequenceEditors[0].curHistoryDoPos)
  }, this.elementContext.undo = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].undo() }
    this.reupdateUndoUI()
  }, this.elementContext.redo = function () {
    for (let e = 0; e < this.audioLayerControl.listOfSequenceEditors.length; ++e) { this.audioLayerControl.listOfSequenceEditors[e].redo() }
    this.reupdateUndoUI()
  }, this.testFilter = function () {
    for (var e = [], t = 0; t < this.audioLayerControl.listOfSequenceEditors.length; ++t) { e.push(this.audioLayerControl.listOfSequenceEditors[t].audioSequenceReference.data) }
    for (var t = 0; t < e.length; ++t) { this.audioLayerControl.listOfSequenceEditors[t].audioSequenceReference.data = this.audioLayerControl.spectrumWorker.testFilter(e[t]) }
    this.zoomToFit()
  }, this.createTestSignal = function () {
    this.removeAllSequenceEditors()
    for (let e = 0; e < 2; ++e) {
      const t = this.createSequenceEditor('Test Channel ' + e)
      const i = CreateNewAudioSequence(44100)
      i.createTestTone(430.6640625, 441e3), t.setAudioSequence(i), t.zoomToFit()
    }
  }, this.elementContext.createSequenceEditor = this.createSequenceEditor, this.elementContext.removeAllSequenceEditors = this.removeAllSequenceEditors, this.elementContext.setLinkMode = this.setLinkMode, this.elementContext.zoomIntoSelection = this.zoomIntoSelection, this.elementContext.zoomToFit = this.zoomToFit, this.elementContext.selectAll = this.selectAll, this.elementContext.selectFromS = this.selectFromS, this.elementContext.selectToE = this.selectToE, this.elementContext.goto_head = this.goto_head, this.elementContext.filterNormalize = this.filterNormalize, this.elementContext.filterFadeIn = this.filterFadeIn, this.elementContext.filterFadeOut = this.filterFadeOut, this.elementContext.filterGain = this.filterGain, this.elementContext.filterSilence = this.filterSilence, this.elementContext.toWave = this.toWave, this.elementContext.playToggle = this.playToggle, this.elementContext.play = this.play, this.elementContext.selectdbl = this.selectdbl, this.elementContext.stop = this.stop, this.elementContext.toggleLoop = this.toggleLoop, this.elementContext.save = this.save, this.elementContext.testFilter = this.testFilter, this.elementContext.createTestSignal = this.createTestSignal, this.elementContext.copy = this.copy, this.elementContext.paste = this.paste, this.elementContext.cut = this.cut, this.elementContext.crop = this.crop, this.elementContext.del = this.del, this.filedb = void 0, this.createDropHandler = function () {
    const e = new FileDropbox()
    e.defineDropHandler(this.elementContext), e.eventHost = this, e.onFinish = function () {
      document.getElementById('app-progress').style.width = '50%', activeAudioLayerControl = this.eventHost.elementContext, this.eventHost.audioPlayback.audioContext = this.eventHost.audioPlayback.audioContext || this.eventHost.audioPlayback.init(), this.eventHost.audioPlayback.audioContext.decodeAudioData(this.resultArrayBuffer, this.eventHost.decodeAudioFinished, this.eventHost.decodeAudioFailed)
    }, e.onFail = function (e) {
      let t = ''
      switch (e.target.error.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          t = 'QUOTA_EXCEEDED_ERR'
          break
        case FileError.NOT_FOUND_ERR:
          t = 'NOT_FOUND_ERR'
          break
        case FileError.SECURITY_ERR:
          t = 'SECURITY_ERR'
          break
        case FileError.INVALID_MODIFICATION_ERR:
          t = 'INVALID_MODIFICATION_ERR'
          break
        case FileError.INVALID_STATE_ERR:
          t = 'INVALID_STATE_ERR'
          break
        default:
          t = 'Unknown Error ' + e.code
      }
      console.log('Error: ' + t)
    }
  }, this.decodeAudioFailed = function () {
    activeAudioLayerControl.fileload_end && activeAudioLayerControl.fileload_end('error'), activeAudioLayerControl.updateUndoUI && activeAudioLayerControl.updateUndoUI(0, 0)
  }, this.decodeAudioFinished = function (e) {
    if (activeAudioLayerControl.add && activeAudioLayerControl.audioLayerControl.listOfSequenceEditors.length > 0 && activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference && activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference.data && activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference.data.length > 0) {
      if (e.sampleRate != activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference.sampleRate) { return void (activeAudioLayerControl.error_callback && activeAudioLayerControl.error_callback('Samplerate does not match. This audio samplerate is ' + e.sampleRate + ', Please change the samplerate to ' + activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[0].audioSequenceReference.sampleRate + ' use below music converter, then try to add again.')) }
      for (var t = e.sampleRate, i = (e.length, e.duration, e.numberOfChannels), o = 0; o < activeAudioLayerControl.audioLayerControl.listOfSequenceEditors.length; ++o) { o > i - 1 ? activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[o].addsequence(t, e.getChannelData(i - 1)) : activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[o].addsequence(t, e.getChannelData(o)) }
      for (var o = 0; o < activeAudioLayerControl.audioLayerControl.listOfSequenceEditors.length; ++o) { activeAudioLayerControl.audioLayerControl.listOfSequenceEditors[o].zoomToFit() }
      activeAudioLayerControl.fileload_end && activeAudioLayerControl.fileload_end('ok'), activeAudioLayerControl.reupdateUndoUI()
    } else {
      document.getElementById('app-progress').style.width = '90%', activeAudioLayerControl.removeAllSequenceEditors()
      for (var t = e.sampleRate, i = (e.length, e.duration, e.numberOfChannels), n = [str_leftc, str_rightc], o = 0; o < i; ++o) {
        const s = activeAudioLayerControl.createSequenceEditor(n[o])
        const a = CreateNewAudioSequence(t, e.getChannelData(o))
        s.setAudioSequence(a), s.zoomToFit()
      }
      document.getElementById('app-progress').style.width = '100%', setTimeout(function () {
        document.getElementById('app-progress').style.width = '0%'
      }, 1e3), activeAudioLayerControl.fileload_end && activeAudioLayerControl.fileload_end('ok'), activeAudioLayerControl.updateUndoUI && activeAudioLayerControl.updateUndoUI(0, 0)
    }
  }, this.processLock = function () {
    activeAudioLayerControl.lockscreen(!0)
  }, this.processUnlock = function () {
    activeAudioLayerControl.lockscreen(!1), activeAudioLayerControl.reupdateUndoUI()
  }, this.createDropHandler(), this.elementContext.onselectstart = function () {
    return !1
  }
}

function initializeAudioLayerControls () {
  new audioLayerControl(document.getElementsByTagName('audiolayercontrol')[0])
}

function AudioLayerSequenceEditor (e) {
  function t(e, t) {
    return ("" + e).length < t ? (new Array(t + 1).join("0") + e).slice(-t) : "" + e
  }
  function i(e) {
    var i = (Math.floor(e / 3600),
    Math.floor(e % 3600 / 60))
      , o = Math.floor(e) % 3600 % 60
      , n = (e % 1).toString().substring(1, 4);
    return t(i, 2).toString() + ":" + t(o, 2).toString() + n
  }
  this.elementContext = e
  this.elementContext.audioLayerSequenceEditor = this
  this.audioLayerControl = void 0
  this.canvasReference = void 0
  this.audioSequenceReference = void 0
  this.canvasTimer = void 0
  this.canvasZoomBar = void 0
  this.canvasHeight = 100
  this.canvasWidth = e.parentNode.parentNode.clientWidth - 50
  this.name = name
  this.mouseInside = !1
  this.mouseDown = !1
  this.mouseInsideOfSelection = !1
  this.mouseSelectionOfStart = !1
  this.mouseSelectionOfEnd = !1
  this.mouseX = 0
  this.mouseY = 0
  this.previousMouseX = 0
  this.previousMouseY = 0
  this.selectionStart = 0
  this.selectionEnd = 0
  this.colorInactiveTop = "#eee"
  this.colorInactiveBottom = "#eee"
  this.colorActiveTop = "#eee"
  this.colorActiveBottom = "#eee"
  this.colorMouseDownTop = "#eee"
  this.colorMouseDownBottom = "#eee"
  this.colorSelectionStroke = "rgba(14,56,67,0.5)"
  this.colorSelectionFill = "rgba(14,56,67,0.2)"
  this.visualizationData = []
  this.visualizationDataAll = []
  this.hasFocus = !0
  this.linkedEditors = []
  this.movePos = 0
  this.movementActive = !1
  this.viewResolution = 10
  this.viewPos = 0
  this.playbackPos = 0
  this.listOfHistoryDo = []
  this.maxUnDos = 50
  this.curHistoryDoPos = -1
  this.storeTmpData = []
  this.storeTmpPos = 0
  this.storeTmpLen = 0
  this.undoit = function (e) {
    e && (e.dataAdd.length > 0 && this.audioSequenceReference.trim(e.addPos, e.addLen),
    e.dataDel.length > 0 && this.audioSequenceReference.insert(e.delPos, e.delLen, e.dataDel),
    this.selectionStart = e.selectStart,
    this.selectionEnd = e.selectEnd,
    this.updateVisualizationData())
  }
  
  this.redoit = function (e) {
    e && (e.dataDel.length > 0 && this.audioSequenceReference.trim(e.delPos, e.delLen),
    e.dataAdd.length > 0 && this.audioSequenceReference.insert(e.addPos, e.addLen, e.dataAdd),
    this.selectionStart = e.selectStart,
    this.selectionEnd = e.selectEnd,
    this.updateVisualizationData())
  }
  
  this.undo = function () {
    if (!(this.curHistoryDoPos < 0 || 0 == this.listOfHistoryDo.length)) {
      var e = this.listOfHistoryDo[this.curHistoryDoPos];
      this.undoit(e),
      this.curHistoryDoPos--,
      this.curHistoryDoPos < -1 && (this.curHistoryDoPos = -1)
    }
  }
  
  this.redo = function () {
    if (!(this.curHistoryDoPos > this.listOfHistoryDo.length - 2)) {
      var e = this.listOfHistoryDo[this.curHistoryDoPos + 1];
      this.redoit(e),
      this.curHistoryDoPos++,
      this.curHistoryDoPos > this.listOfHistoryDo.length - 1 && (this.curHistoryDoPos = this.listOfHistoryDo.length - 1)
    }
  }
  
  this.historyDoit = function (e, t, i, o, n, s, a, r, h) {
    var l = new HistoryDo;
    this.curHistoryDoPos != this.listOfHistoryDo.length - 1 && this.listOfHistoryDo.splice(this.curHistoryDoPos + 1, this.listOfHistoryDo.length - this.curHistoryDoPos - 1),
    l.dotype = e,
    l.setDataDel(t, i, o),
    l.setDataAdd(n, s, a),
    l.samplerate = this.audioSequenceReference.sampleRate,
    l.gain = this.audioSequenceReference.gain,
    l.selectStart = r,
    l.selectEnd = h,
    this.listOfHistoryDo.push(l),
    this.curHistoryDoPos = this.listOfHistoryDo.length - 1
  }
  
  this.getSelect = function () {
    return {
      start: this.selectionStart < 0 ? 0 : this.selectionStart >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionStart,
      end: this.selectionEnd < 0 ? 0 : this.selectionEnd >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionEnd
    }
  }
  
  this.saveTmpData = function (e, t) {
    this.storeTmpData = this.audioSequenceReference.data.slice(e, t), this.storeTmpPos = e, this.storeTmpLen = t - e
  }
  
  this.storeHistoryDo = function (e, t, i) {
    let o = []
    let n = 0
    let s = 0
    const a = this.selectionStart
    const r = this.selectionEnd
    o = this.audioSequenceReference.data.slice(t, i), n = t, s = i - t, this.historyDoit(e, this.storeTmpData, this.storeTmpPos, this.storeTmpLen, o, n, s, a, r)
  }
  
  this.link = function (e) {
    for (var t = 0; t < this.linkedEditors.length; ++t)
      if (this.linkedEditors[t] === e)
        return;
    this.linkedEditors.push(e),
    e.link(this)
  }
  
  this.updateSelectionForLinkedEditors = function (e) {
    for (var t = 0; t < this.linkedEditors.length; ++t)
      this.linkedEditors[t].selectionStart = this.selectionStart,
      this.linkedEditors[t].selectionEnd = this.selectionEnd,
      this.linkedEditors[t].viewPos == this.viewPos && this.linkedEditors[t].viewResolution == this.linkedEditors[t].viewResolution || (this.linkedEditors[t].viewPos = this.viewPos,
      this.linkedEditors[t].viewResolution = this.viewResolution,
      this.linkedEditors[t].updateVisualizationData()),
      this.linkedEditors[t].repaint(e)
  }
  
  this.createEditor = function () {
    this.channelIndex = this.audioLayerControl.listOfSequenceEditors.length - 1,
    this.audioLayerControl && 1 == this.audioLayerControl.listOfSequenceEditors.length && (this.canvasTimer = document.createElement("canvas"),
    this.canvasTimer.width = this.canvasWidth,
    this.canvasTimer.height = 20,
    this.canvasTimer.style.display = "none",
    this.elementContext.appendChild(this.canvasTimer)),
    this.canvasReference = document.createElement("canvas"),
    this.canvasReference.setAttribute("class", "audioLayerEditor"),
    this.canvasReference.width = this.canvasWidth,
    this.canvasReference.height = this.canvasHeight,
    this.canvasReference.style.border = "1px solid #0E3843",
    this.elementContext.appendChild(this.canvasReference),
    this.canvasZoomBar = document.createElement("canvas"),
    this.canvasZoomBar.width = this.canvasWidth,
    this.canvasZoomBar.height = 20,
    this.canvasZoomBar.style.border = "1px solid #a0a0a0",
    this.canvasZoomBar.style.display = "none",
    this.elementContext.appendChild(this.canvasZoomBar),
    this.addEventlistener(),
    this.repaint()
  }
  
  this.setAudioSequence = function (e) {
    this.audioSequenceReference = e, this.updateVisualizationData()
  }
  
  this.updateVisualizationData = function (e) {
    e || this.getAllData(), this.getDataInResolution(this.viewResolution, this.viewPos), this.repaint(e)
  }
  
  this.getAllData = function () {
    const e = this.getAbsoluteToSeconds(this.audioSequenceReference.data.length)
    this.visualizationDataAll = []
    const t = this.audioSequenceReference.data
    const i = 0 * this.audioSequenceReference.sampleRate
    const o = Math.round(0 * this.audioSequenceReference.sampleRate)
    const n = Math.round(e * this.audioSequenceReference.sampleRate)
    if (n > this.canvasReference.width) {
      for (var s = n / this.canvasReference.width, a = 0; a < this.canvasReference.width; ++a) {
        const r = a * s + i
        const h = (a + 1) * s + i + 1
        if (r >= 0 && r < t.length && h >= 0 && h < t.length) {
          const l = this.getPeakInFrame(r, h, t)
          this.visualizationDataAll.push(l)
        } else {
          this.visualizationDataAll.push({
            min: 0,
            max: 0
          })
        }
      }
      this.visualizationDataAll.plotTechnique = 1
    } else {
      for (var c = this.canvasReference.width / n, u = 0, a = o; a <= o + n; ++a) {
        a < 0 || a >= t.length ? this.visualizationDataAll.push({
          y: 0,
          x: u
        }) : this.visualizationDataAll.push({
          y: t[a],
          x: u
        }), u += c
      }
      this.visualizationDataAll.plotTechnique = 2
    }
  }
  
  this.getDataInResolution = function (e, t) {
    this.visualizationData = []
    const i = this.audioSequenceReference.data
    const o = this.audioSequenceReference.sampleRate * t
    const n = Math.round(t * this.audioSequenceReference.sampleRate)
    const s = Math.round(e * this.audioSequenceReference.sampleRate)
    if (s > this.canvasReference.width) {
      for (var a = s / this.canvasReference.width, r = 0; r < this.canvasReference.width; ++r) {
        const h = r * a + o
        const l = (r + 1) * a + o + 1
        if (h >= 0 && h < i.length && l >= 0 && l < i.length) {
          const c = this.getPeakInFrame(h, l, i)
          this.visualizationData.push(c)
        } else {
          this.visualizationData.push({
            min: 0,
            max: 0
          })
        }
      }
      this.visualizationData.plotTechnique = 1
    } else {
      for (var u = this.canvasReference.width / s, d = 0, r = n; r <= n + s; ++r) {
        r < 0 || r >= i.length ? this.visualizationData.push({
          y: 0,
          x: d
        }) : this.visualizationData.push({
          y: i[r],
          x: d
        }), d += u
      }
      this.visualizationData.plotTechnique = 2
    }
  }
  
  this.addEventlistener = function () {
    this.canvasReference.eventHost = this,
    this.canvasReference.addEventListener("mouseover", function() {
      this.eventHost.mouseInside = !0,
      this.eventHost.repaint(!0)
    }, !0)

    this.canvasReference.onmouseout = function() {
      if (this.eventHost.selectionStart > this.eventHost.selectionEnd) {
        var e = this.eventHost.selectionStart;
        this.eventHost.selectionStart = this.eventHost.selectionEnd,
        this.eventHost.selectionEnd = e
      }
      this.eventHost.trimselection(),
      this.eventHost.mouseInsideOfSelection = !1,
      this.eventHost.mouseSelectionOfStart = !1,
      this.eventHost.mouseSelectionOfEnd = !1,
      this.eventHost.mouseDown = !1,
      this.eventHost.mouseInside = !1,
      this.eventHost.repaint(!0),
      this.eventHost.updateSelectionForLinkedEditors(!0)
    }

    this.canvasReference.onscroll = function(e) {}

    this.canvasReference.onmousemove = function(e) {
      this.eventHost.previousMouseX = this.eventHost.mouseX,
      this.eventHost.previousMouseY = this.eventHost.mouseY,
      this.eventHost.mouseX = e.clientX - this.offsetLeft,
      this.eventHost.mouseY = e.clientY - this.offsetTop;
      var t = this.eventHost.mouseX - this.eventHost.previousMouseX;
      if (this.eventHost.mouseDown && 0 == this.eventHost.movementActive)
        if (this.eventHost.mouseInsideOfSelection) {
          var i = this.eventHost.getPixelToAbsolute(this.eventHost.mouseX) - this.eventHost.getPixelToAbsolute(this.eventHost.previousMouseX);
          this.eventHost.selectionStart += i,
          this.eventHost.selectionEnd += i,
          this.eventHost.audioLayerControl.audioSequenceSelectionUpdate()
        } else
          this.eventHost.mouseSelectionOfStart ? this.eventHost.selectionStart = this.eventHost.getPixelToAbsolute(this.eventHost.mouseX) : (this.eventHost.selectionEnd = this.eventHost.getPixelToAbsolute(this.eventHost.mouseX),
          this.eventHost.selectionEnd < 0 && (this.eventHost.selectionEnd = this.eventHost.getPixelToAbsolute(this.eventHost.mouseX)));
      if (this.eventHost.mouseDown && this.eventHost.movementActive) {
        var o = this.eventHost.viewResolution / this.eventHost.canvasReference.width;
        this.eventHost.viewPos -= t * o,
        this.selectionStart -= t * o,
        this.selectionEnd -= t * o,
        this.eventHost.updateVisualizationData(!0)
      }
      this.eventHost.trimselection(),
      this.eventHost.repaint(!0),
      this.eventHost.updateSelectionForLinkedEditors(!0)
    }

    this.canvasReference.onmousedown = function(e) {
      if (this.eventHost.mouseDown = !0,
      0 == this.eventHost.movementActive) {
        var t = this.eventHost.getAbsoluteToPixel(this.eventHost.selectionStart)
          , i = this.eventHost.getAbsoluteToPixel(this.eventHost.selectionEnd);
        this.eventHost.mouseX - 5 > t && this.eventHost.mouseX + 5 < i ? this.eventHost.mouseInsideOfSelection = !0 : this.eventHost.mouseX - 5 < t && this.eventHost.mouseX + 5 > t ? this.eventHost.mouseSelectionOfStart = !0 : this.eventHost.mouseX - 5 < i && this.eventHost.mouseX + 5 > i ? this.eventHost.mouseSelectionOfEnd = !0 : (this.eventHost.selectionStart = this.eventHost.getPixelToAbsolute(this.eventHost.mouseX),
        this.eventHost.selectionEnd = this.eventHost.selectionStart,
        console.log("Set " + this.eventHost.selectionStart))
      }
      this.eventHost.trimselection(),
      focusOnAudioLayerSequenceEditor = this.eventHost,
      this.eventHost.repaint(!0),
      this.eventHost.updateSelectionForLinkedEditors(!0)
    }

    this.canvasReference.onmouseup = function() {
      if (this.eventHost.selectionStart > this.eventHost.selectionEnd) {
        var e = this.eventHost.selectionStart;
        this.eventHost.selectionStart = this.eventHost.selectionEnd,
        this.eventHost.selectionEnd = e
      }
      this.eventHost.trimselection(),
      this.eventHost.mouseInsideOfSelection = !1,
      this.eventHost.mouseSelectionOfStart = !1,
      this.eventHost.mouseSelectionOfEnd = !1,
      this.eventHost.mouseDown = !1,
      this.eventHost.repaint(!0),
      this.eventHost.updateSelectionForLinkedEditors(!0)
    }

    this.canvasReference.ondblclick = function() {
      this.eventHost.selectionStart != this.eventHost.selectionEnd ? (this.eventHost.selectionStart = 0,
      this.eventHost.selectionEnd = 0) : (this.eventHost.selectionStart = 0,
      this.eventHost.selectionEnd = this.eventHost.getPixelToAbsolute(this.eventHost.canvasReference.width)),
      this.eventHost.mouseDown = !1,
      this.eventHost.mouseSelectionOfStart = !1,
      this.eventHost.mouseSelectionOfEnd = !1,
      this.eventHost.mouseInsideOfSelection = !1,
      focusOnAudioLayerSequenceEditor = void 0,
      this.eventHost.repaint(!0),
      this.eventHost.updateSelectionForLinkedEditors(!0)
    }
  }
  
  this.trimselection = function () {
    this.selectionStart = Math.max(0, this.selectionStart)
  }
  this.repaint = function (e) {
    if (void 0 !== this.canvasReference) {
      const t = this.canvasReference.getContext('2d')
      if (this.clearCanvas(t), this.paintBackground(t), this.canvasTimer && !e && this.clearCanvas(this.canvasTimer.getContext('2d')), void 0 === this.audioSequenceReference) { this.paintEmpty(t) } else {
        this.paintWaveform(t), this.paintSelector(t), this.paintTextInfo(t), this.canvasTimer && !e && this.paintTimer(this.canvasTimer.getContext('2d'))
        const i = this.canvasZoomBar.getContext('2d')
        this.canvasZoomBar.style.display = 'none', this.viewResolution < this.getAbsoluteToSeconds(this.audioSequenceReference.data.length) && this.channelIndex == this.audioLayerControl.listOfSequenceEditors.length - 1 && (this.canvasZoomBar.style.display = 'inline', e || (this.paintZoomBar(i, this)))
      }
    }
  }
  
  this.clearCanvas = function (e) {
    e.clearRect(0, 0, this.canvasReference.width, this.canvasReference.height)
  }
  
  this.paintEmpty = function (e) {
    var t = e.font;
    e.textAlign,
    e.textBaseline;
    e.font = "italic 40px Calibri",
    e.textAlign = "center",
    e.textBaseline = "middle",
    this.paintTextWithShadow(str_drag, e.canvas.clientWidth / 2, e.canvas.clientHeight / 2, "rgba(0,0,0,0.5)", e),
    e.font = t,
    e.textAlign = "left",
    e.textBaseline = "top"
  }
  
  this.paintBackground = function (e) {
    var t = e.createLinearGradient(0, 0, 0, this.canvasReference.height);
    t.addColorStop(0, this.mouseInside ? this.mouseDown ? this.colorMouseDownTop : this.colorActiveTop : this.colorInactiveTop),
    t.addColorStop(1, this.mouseInside ? this.mouseDown ? this.colorMouseDownBottom : this.colorActiveBottom : this.colorInactiveBottom),
    e.fillStyle = t,
    e.fillRect(0, 0, this.canvasReference.width, this.canvasReference.height)
  }
  
  this.paintTimerBackground = function (e) {
    var t = this.canvasTimer.width
      , i = this.canvasTimer.height
      , o = Math.ceil(this.canvasTimer.height / 2);
    e.strokeStyle = "rgba(6, 6, 6,0.5)",
    e.lineWidth = 1,
    e.beginPath(),
    e.moveTo(0, 0),
    e.lineTo(0, i),
    e.moveTo(t, 0),
    e.lineTo(t, i),
    e.moveTo(0, o),
    e.lineTo(t, o),
    e.stroke()
  }
  
  this.paintZoomAllData = function (e) {
    var t = this.audioSequenceReference
      , i = this.canvasZoomBar.height / 2
      , o = t.gain < 1 ? 1 : 1 / t.gain;
    t.data;
    if (e.strokeStyle = "rgba(80,80,80,0.4)",
    e.beginPath(),
    e.moveTo(0, i),
    1 == this.visualizationDataAll.plotTechnique)
      for (var n = 0; n < this.canvasReference.width; ++n) {
        var s = this.visualizationDataAll[n];
        e.moveTo(n + .5, i + s.min * o * -i),
        e.lineTo(n + .5, i + s.max * o * -i + 1)
      }
    else if (2 == this.visualizationDataAll.plotTechnique)
      for (var n = 0; n < this.visualizationDataAll.length; ++n) {
        var a = this.visualizationDataAll[n].x
          , r = i + this.visualizationDataAll[n].y * o * -i;
        e.lineTo(a, r),
        e.moveTo(a + 1, r - 1),
        e.lineTo(a + 1, r + 1),
        e.moveTo(a - 1, r - 1),
        e.lineTo(a - 1, r + 1),
        e.moveTo(a - 1, r + 1),
        e.lineTo(a + 1, r + 1),
        e.moveTo(a - 1, r - 1),
        e.lineTo(a + 1, r - 1),
        e.moveTo(a, r)
      }
    e.stroke(),
    e.strokeStyle = "rgba(0, 0, 0,0.5)",
    e.beginPath(),
    e.moveTo(0, i),
    e.lineTo(this.canvasReference.width, i),
    e.stroke()
  }
  
  this.paintZoomBar = function (e, t) {
    // var i = "/wp-content/themes/certifyad/librerias/pl/audiotool/getparam.php?name=zoom&viR=" + this.viewResolution + "&viP=" + this.viewPos + "&sam=" + this.audioSequenceReference.sampleRate + "&d1=" + this.audioSequenceReference.data.length + "&v1=" + this.canvasReference.width + "&vh=" + this.canvasZoomBar.height;
    var o = this.canvasReference.width
    var n = this.canvasZoomBar.height
    var s = this.viewPos * this.canvasReference.width / (this.audioSequenceReference.data.length / this.audioSequenceReference.sampleRate)
    var a = (this.viewPos + this.viewResolution) * this.canvasReference.width / (this.audioSequenceReference.data.length / this.audioSequenceReference.sampleRate);
    e.clearRect(0, 0, o, n),
    t.paintZoomAllData(e),
    e.fillStyle = "rgba(0,0,0,0.3)",
    s > 0 && e.fillRect(0, 0, s, n),
    o > a && e.fillRect(a, 0, o - a, n)
  }
  
  this.paintWaveform = function (e) {
    var t = this.audioSequenceReference
      , i = this.canvasReference.height / 2
      , o = t.gain < 1 ? 1 : 1 / t.gain;
    t.data;
    if (e.strokeStyle = "rgba(0, 0,0,0.5)",
    e.beginPath(),
    e.moveTo(0, i),
    1 == this.visualizationData.plotTechnique)
      for (var n = 0; n < this.canvasReference.width; ++n) {
        var s = this.visualizationData[n];
        e.moveTo(n + .5, i + s.min * o * -i),
        e.lineTo(n + .5, i + s.max * o * -i + 1)
      }
    else if (2 == this.visualizationData.plotTechnique)
      for (var n = 0; n < this.visualizationData.length; ++n) {
        var a = this.visualizationData[n].x
          , r = i + this.visualizationData[n].y * o * -i;
        e.lineTo(a, r),
        e.moveTo(a + 1, r - 1),
        e.lineTo(a + 1, r + 1),
        e.moveTo(a - 1, r - 1),
        e.lineTo(a - 1, r + 1),
        e.moveTo(a - 1, r + 1),
        e.lineTo(a + 1, r + 1),
        e.moveTo(a - 1, r - 1),
        e.lineTo(a + 1, r - 1),
        e.moveTo(a, r)
      }
    e.stroke(),
    e.strokeStyle = "rgba(0, 0, 0,0.5)",
    e.beginPath(),
    e.moveTo(0, i),
    e.lineTo(this.canvasReference.width, i),
    e.stroke()
  }
  
  this.paintTimer = function (e) {
    this.canvasTimer.style.display = ''
    //  var t = "/wp-content/themes/certifyad/librerias/pl/audiotool/getparam.php?name=timer&w1=" + this.canvasTimer.width + "&h1=" + this.canvasTimer.height + "&st1=" + this.viewPos + "&ed1=" + this.viewResolution;
    const tpaint = {
      'w': this.canvasTimer.width,
      'h': this.canvasTimer.height,
      'st': this.viewPos,
      'ed': this.viewResolution
    }
    // window.top.cargarHoraRecorte(this.viewResolution);
    const i = tpaint.w
    const o = tpaint.h
    const n = tpaint.ch
    const s = tpaint.st
    const a = tpaint.len
    const r = tpaint.unit
    e.clearRect(0, 0, i, o), e.strokeStyle = 'rgba(14,56,67, 0.5)', e.lineWidth = 1, e.beginPath(), e.moveTo(0, 0), e.lineTo(0, o), e.moveTo(i, 0), e.lineTo(i, o), e.moveTo(0, n), e.lineTo(i, n), e.fillText(s.toFixed(2) + 's', 2, n - 2)
    for (let h = 0; h < a;) {
      h += r
      const l = Math.ceil(h * i / a)
      e.moveTo(l, 5), e.lineTo(l, n), e.fillText(h, l - 5, o)
    }
    const c = (s + a)
      .toFixed(2) + 's'
    e.fillText(c, i - (e.measureText(c)
      .width + 1), n - 2), e.stroke()
  }
  
  this.paintSelector = function (e) {
    var t = this.getAbsoluteToPixel(this.selectionStart)
      , o = this.getAbsoluteToPixel(this.selectionEnd);
    if (this.selectionStart !== this.selectionEnd) {
      var n = t < o ? t : o
        , s = t < o ? o - t : t - o;
      e.fillStyle = this.colorSelectionFill,
      e.fillRect(n, 0, s, this.canvasReference.height),
      e.strokeStyle = this.colorSelectionStroke,
      e.strokeRect(n, 0, s, this.canvasReference.height)
    } else
      e.strokeStyle = this.colorSelectionStroke,
      e.beginPath(),
      e.moveTo(t, 0),
      e.lineTo(t, this.canvasReference.height),
      e.stroke();
    var a = this.getAbsoluteToPixel(this.playbackPos);
    a > 0 && a < this.canvasReference.width && (e.strokeStyle = this.colorSelectionStroke,
    e.beginPath(),
    e.moveTo(a, 0),
    e.lineTo(a, this.canvasReference.height),
    e.stroke(),
    this.paintTextWithShadow(i(this.getAbsoluteToSeconds(this.playbackPos)), a + 5, 70, "rgb(14,56,67)", e))
  }
  
  this.getPeakInFrame = function (e, t, i) {
    const o = Math.round(e)
    const n = Math.round(t)
    let s = 1
    let a = -1
    o < 0 || i.length
    for (let r = o; r < n; ++r) {
      const h = i[r]
      a = h > a ? h : a, s = h < s ? h : s
    }
    return {
      min: s,
      max: a
    }
  }
  
  this.paintTextInfo = function (e) {
    const t = i(this.getAbsoluteToSeconds(this.selectionStart))
    const o = i(this.getAbsoluteToSeconds(this.selectionEnd))
    const n = i(this.getAbsoluteToSeconds(this.selectionEnd - this.selectionStart))
    this.paintTextWithShadow(str_selection + t + ' - ' + o + ' (' + n + ')', 1, 5, 'rgb(14,56,67)', e)
    this.paintTextWithShadow(str_position + i(this.viewPos), 1, 90, 'rgb(0,0,0)', e)
    this.paintTextWithShadow(this.title, 1, 40, 'rgba(0,0,0,1)', e)
  }
  
  this.paintTextWithShadow = function (e, t, i, o, n) {
    n.fillStyle = "rgba(0,0,0,0.25)",
    n.fillText(e, t + 1, i + 1),
    n.fillStyle = o,
    n.fillText(e, t, i)
  }
  
  this.getSelectionInDataRange = function () {
    return {
      start: Math.round(this.audioSequenceReference.data.length / this.canvasReference.width * this.selectionStart),
      end: Math.round(this.audioSequenceReference.data.length / this.canvasReference.width * this.selectionEnd)
    }
  }
  
  this.selectDataInRange = function (e, t) {
    this.selectionStart = Math.round(this.canvasReference.width / this.audioSequenceReference.data.length * e),
    this.selectionEnd = Math.round(this.canvasReference.width / this.audioSequenceReference.data.length * t)
  }
  
  this.getPixelToAbsolute = function (e) {
    if (void 0 === this.audioSequenceReference) { return 0 }
    const t = this.viewResolution * this.audioSequenceReference.sampleRate
    const i = this.viewPos * this.audioSequenceReference.sampleRate
    return Math.round(t / this.canvasReference.width * e + i)
  }

  this.getAbsoluteToPixel = function (e) {
    if (void 0 === this.audioSequenceReference) { return 0 }
    const t = this.viewResolution * this.audioSequenceReference.sampleRate
    return (e - this.viewPos * this.audioSequenceReference.sampleRate) / t * this.canvasReference.width
  }

  this.getAbsoluteToSeconds = function (e) {
    return void 0 === this.audioSequenceReference ? 0 : e / this.audioSequenceReference.sampleRate
  }

  this.getSecondsToAbsolute = function (e) {
    return void 0 === this.audioSequenceReference ? 0 : e * this.audioSequenceReference.sampleRate
  }
  
  this.zoomIntoSelection = function () {
    this.selectionStart != this.selectionEnd && (this.viewResolution = this.getAbsoluteToSeconds(this.selectionEnd - this.selectionStart), this.viewPos = this.getAbsoluteToSeconds(this.selectionStart), this.updateVisualizationData(), this.updateSelectionForLinkedEditors())
  }
  
  this.zoomToFit = function () {
    this.viewPos = 0, this.viewResolution = this.getAbsoluteToSeconds(this.audioSequenceReference.data.length), this.updateVisualizationData(), this.updateSelectionForLinkedEditors()
  }
  
  this.filterNormalize = function () {
    const e = this.selectionStart < 0 ? 0 : this.selectionStart >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionStart
    const t = this.selectionEnd < 0 ? 0 : this.selectionEnd >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionEnd
    e == t ? (this.saveTmpData(0, this.audioSequenceReference.data.length), this.audioSequenceReference.filterNormalize(), this.storeHistoryDo('filterNormalize', 0, this.audioSequenceReference.data.length)) : (this.saveTmpData(e, t), this.audioSequenceReference.filterNormalize(e, t - e), this.storeHistoryDo('filterNormalize', e, t)), this.updateVisualizationData()
  }
  
  this.filterFade = function (e) {
    const t = this.selectionStart < 0 ? 0 : this.selectionStart >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionStart
    const i = this.selectionEnd < 0 ? 0 : this.selectionEnd >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionEnd
    t == i ? (this.saveTmpData(0, this.audioSequenceReference.data.length), this.audioSequenceReference.filterLinearFade(!0 === e ? 0 : 1, !0 === e ? 1 : 0), this.storeHistoryDo('filterFade', 0, this.audioSequenceReference.data.length)) : (this.saveTmpData(t, i), this.audioSequenceReference.filterLinearFade(!0 === e ? 0 : 1, !0 === e ? 1 : 0, t, i - t), this.storeHistoryDo('filterFade', t, i)), this.updateVisualizationData()
  }
  
  this.filterGain = function (e) {
    const t = this.selectionStart < 0 ? 0 : this.selectionStart >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionStart
    const i = this.selectionEnd < 0 ? 0 : this.selectionEnd >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionEnd
    t == i ? (this.saveTmpData(0, this.audioSequenceReference.data.length), this.audioSequenceReference.filterGain(this.getQuantity(e)), this.storeHistoryDo('filterGain', 0, this.audioSequenceReference.data.length)) : (this.saveTmpData(t, i), this.audioSequenceReference.filterGain(this.getQuantity(e), t, i - t), this.storeHistoryDo('filterGain', t, i)), this.updateVisualizationData()
  }
  
  this.filterSilence = function () {
    const e = this.selectionStart < 0 ? 0 : this.selectionStart >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionStart
    const t = this.selectionEnd < 0 ? 0 : this.selectionEnd >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionEnd
    e == t ? (this.saveTmpData(0, this.audioSequenceReference.data.length), this.audioSequenceReference.filterSilence(), this.storeHistoryDo('filterSilence', 0, this.audioSequenceReference.data.length)) : (this.saveTmpData(e, t), this.audioSequenceReference.filterSilence(e, t - e), this.storeHistoryDo('filterSilence', e, t)), this.updateVisualizationData()
  }
  
  this.getDecibel = function (e, t) {
    return 20 * Math.log(e / t) / Math.LN10
  }
  
  this.getQuantity = function (e) {
    return Math.exp(e * Math.LN10 / 20)
  }
  this.clipboardAudioSequence = void 0
  
  this.selectAll = function (e) {
    this.selectionStart = 0,
    this.selectionEnd = this.audioSequenceReference.data.length,
    this.repaint()
  }
  this.selectFromS = function (e) {
    this.selectionStart != 0 && (this.selectionEnd = Math.min(this.selectionStart, this.selectionEnd),
    this.selectionStart = 0,
    this.repaint())
  }
  
  this.selectToE = function (e) {
    this.selectionEnd != this.audioSequenceReference.data.length && (this.selectionStart = Math.max(this.selectionStart, this.selectionEnd),
    this.selectionEnd = this.audioSequenceReference.data.length,
    this.repaint())
  }
  
  this.goto_head = function (e) {
    this.selectionStart = 0,
    this.selectionEnd = 0,
    this.repaint()
  }
  
  this.set_start_sel = function (e) {
    this.selectionStart = this.playbackPos,
    this.selectionEnd = this.playbackPos,
    this.repaint()
  }
  
  this.set_end_sel = function (e) {
    this.selectionEnd = this.playbackPos,
    this.repaint()
  }
  
  this.copy = function (e) {
    const t = this.selectionStart < 0 ? 0 : this.selectionStart >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionStart
    const i = this.selectionEnd < 0 ? 0 : this.selectionEnd >= this.audioSequenceReference.data.length ? this.audioSequenceReference.data.length - 1 : this.selectionEnd
    if (this.clipboardAudioSequence = this.audioSequenceReference.clone(t, i - t), void 0 !== e && !0 === e) {
      for (let o = 0; o < this.linkedEditors.length; ++o) {
        this.linkedEditors[o].copy(!1)
      }
    }
  }
  
  this.crop = function (e) {
    var t = this.selectionStart < 0 ? 0 : this.selectionStart
    var i = this.selectionEnd < 0 ? 0 : this.selectionEnd;
    if (t != i && !(t > this.audioSequenceReference.data.length)) {
      var o = []
      var n = 0
      var s = 0
      var a = []
      var r = 0
      var h = 0
      var l = this.selectionStart
      var c = this.selectionEnd;
      o = o.concat(this.audioSequenceReference.data),
      n = 0,
      s = this.audioSequenceReference.data.length,
      r = 0,
      h = i - t + 1,
      a = a.concat(this.audioSequenceReference.data.slice(t, t + h)),
      this.audioSequenceReference.data = this.audioSequenceReference.data.slice(t, t + h),
      this.selectionStart = 0,
      this.selectionEnd = this.audioSequenceReference.data.length,
      this.updateVisualizationData(),
      this.historyDoit("crop", o, n, s, a, r, h, l, c)
    }
  }
  
  this.addsequence = function (e, t) {
    var i = []
    var o = []
    var n = 0
    var s = 0
    var a = this.selectionStart
    var r = this.selectionEnd;
    n = this.audioSequenceReference.data.length + e,
    s = t.length,
    this.audioSequenceReference.createZeroData(e);
    var h = CreateNewAudioSequence(e, t);
    this.audioSequenceReference.merge(h),
    o = this.audioSequenceReference.data.slice(n, n + s + 1),
    this.selectionStart = n,
    this.selectionEnd = n + s,
    this.updateVisualizationData(),
    this.historyDoit("addsequence", i, 0, 0, o, n, s, a, r)
  }
  
  this.pasteDo = function (e, t, i, o, n, s) {
    let a = []
    let r = 0
    let h = 0
    let l = []
    let c = 0
    let u = 0
    const d = this.selectionStart
    const f = this.selectionEnd
    if (t != i && t < this.audioSequenceReference.data.length && (n - o > 0 && (a = a.concat(this.audioSequenceReference.data.slice(o, n)), r = o, h = n - o), this.audioSequenceReference.trim(o, s - o)), t > this.audioSequenceReference.data.length ? (c = this.audioSequenceReference.data.length, u = t - this.audioSequenceReference.data.length + this.clipboardAudioSequence.data.length, this.audioSequenceReference.createZeroData(t - this.audioSequenceReference.data.length), this.audioSequenceReference.merge(this.clipboardAudioSequence), this.selectionEnd = t + this.clipboardAudioSequence.data.length, l = l.concat(this.audioSequenceReference.data.slice(c, c + u))) : (c = t, u = this.clipboardAudioSequence.data.length, this.audioSequenceReference.merge(this.clipboardAudioSequence, t), this.selectionStart = t, this.selectionEnd = t + this.clipboardAudioSequence.data.length, l = l.concat(this.clipboardAudioSequence.data)), this.updateVisualizationData(), void 0 !== e && !0 === e) { for (let v = 0; v < this.linkedEditors.length; ++v) { this.linkedEditors[v].paste(!1) } }
    this.historyDoit('paste', a, r, h, l, c, u, d, f)
  }
  
  this.paste = function (e) {
    if (void 0 !== this.clipboardAudioSequence) {
      var t = this;
      this.audioLayerControl.processLock();
      // var i = "/getparam.php?name=paste&selectionStart=" + this.selectionStart + "&selectionEnd=" + this.selectionEnd + "&adlength=" + this.audioSequenceReference.data.length;
      var i = {start: this.selectionStart, end: this.selectionEnd, seltrimstart: this.selectionStart, seltrimend: this.selectionEnd, trimend: this.selectionEnd}
    
      var o = i.start
      var n = i.end
      var s = i.seltrimstart
      var a = i.seltrimend
      var r = i.trimend;
      t.pasteDo(e, o, n, s, a, r),
      t.audioLayerControl.processUnlock()
    }
  }
  
  this.cutDo = function (e, t, i) {
    let o = []
    let n = 0
    let s = 0
    const a = []
    const r = this.selectionStart
    const h = this.selectionEnd
    if (this.clipboardAudioSequence = this.audioSequenceReference.clone(t, i - t), i - t > 0 && (o = o.concat(this.audioSequenceReference.data.slice(t, i)), n = t, s = i - t, this.historyDoit('cut', o, n, s, a, 0, 0, r, h)), this.audioSequenceReference.trim(t, i - t), this.selectionEnd = this.selectionStart, this.updateVisualizationData(), void 0 !== e && !0 === e) { for (let l = 0; l < this.linkedEditors.length; ++l) { this.linkedEditors[l].cut(!1) } }
  }
  
  this.cut = function (e) {
    const t = this
    this.audioLayerControl.processLock()
    cutdata = {
      'start': this.selectionStart,
      'end': this.selectionEnd
    }
    const o = cutdata.start
    const n = cutdata.end
    if (o == n) { return void t.audioLayerControl.processUnlock() }
    t.cutDo(e, o, n), t.audioLayerControl.processUnlock()
  }
  
  this.delDo = function (e, t, i) {
    let o = []
    let n = 0
    let s = 0
    const a = []
    const r = this.selectionStart
    const h = this.selectionEnd
    if (i - t > 0 && (o = o.concat(this.audioSequenceReference.data.slice(t, i)), n = t, s = i - t, this.historyDoit('del', o, n, s, a, 0, 0, r, h)), this.audioSequenceReference.trim(t, i - t), this.selectionEnd = this.selectionStart, this.updateVisualizationData(), void 0 !== e && !0 === e) { for (let l = 0; l < this.linkedEditors.length; ++l) { this.linkedEditors[l].del(!1) } }
  }
  
  this.del = function (e) {
    const t = this
    this.audioLayerControl.processLock()
    var deldata = {
      'start': this.selectionStart,
      'end': this.selectionEnd
    }
    const o = deldata.start
    const n = deldata.end
    if (o == n) { return void t.audioLayerControl.processUnlock() }
    t.delDo(e, o, n), t.audioLayerControl.processUnlock()
  }
  void 0 !== typeof this.elementContext.attributes.title && null !== this.elementContext.attributes.title && (this.title = this.elementContext.attributes.title.value),
  "audiolayercontrol" === this.elementContext.parentNode.nodeName.toLowerCase() && (this.audioLayerControl = this.elementContext.parentNode.audioLayerControl,
  this.audioLayerControl.addAudioLayerSequenceEditor(this),
  this.createEditor())
}

function AudioSequence () {
  this.name = 'unnamed', this.sampleRate = 0, this.data = [], this.gain = 0, this.merge = function (e, t) {
    void 0 === t && (t = this.data.length), e.sampleRate !== this.sampleRate && output_throw('Samplerate does not match.'), (t < 0 || t > this.data.length) && output_throw('Merge position is invalid!')
    let i = []
    i = i.concat(this.data.slice(0, t)), i = i.concat(e.data), t < this.data.length && (i = i.concat(this.data.slice(t, this.data.length))), this.data = i, this.gain = this.getGain()
  }, this.trim = function (e, t) {
    void 0 === t && (t = this.data.length - e), e >= this.data.length || e < 0 || t < 0 || (this.data.splice(e, t), this.gain = this.getGain())
  }, this.insert = function (e, t, i) {
    if (!(e > this.data.length || e < 0)) {
      let o = []
      o = o.concat(this.data.slice(0, e)), o = o.concat(i), e < this.data.length && (o = o.concat(this.data.slice(e, this.data.length))), this.data = o, this.gain = this.getGain()
    }
  }, this.clone = function (e, t) {
    void 0 === e && (e = 0), void 0 === t && (t = this.data.length - e), (e < 0 || e > this.data.length) && output_throw('Invalid start parameter.'), (t < 0 || t + e > this.data.length) && output_throw('Invalid len parameter.')
    for (var i = CreateNewAudioSequence(this.sampleRate), o = e; o < e + t; ++o) { i.data.push(this.data[o]) }
    return i.gain = i.getGain(), i
  }, this.createZeroData = function (e, t) {
    for (var i = [], o = e + 1; --o;) { i.push(0) }
    const n = CreateNewAudioSequence(this.sampleRate, i)
    this.merge(n, t), this.gain = this.getGain()
  }, this.toComplexSequence = function (e, t) {
    void 0 === e && (e = 0), void 0 === t && (t = this.data.length - e), (e < 0 || e > this.data.length) && output_throw('start parameter is invalid.'), (t < 0 || t + e > this.data.length) && output_throw('end parameter is invalid.')
    for (var i = [], o = e; o < e + t; ++o) { i.push(this.data[o]), i.push(0) }
    return i
  }, this.fromComplexSequence = function (e, t, i) {
    void 0 === t && (t = 0), void 0 === i && (i = this.data.length - t), e.length / 2 !== i && output_throw('length of complex array does not match'), e.length % 2 != 0 && output_throw('the length of the complex array is totally wrong'), (t < 0 || t > this.data.length) && output_throw('start parameter is invalid.'), (i < 0 || i + t > this.data.length) && output_throw('end parameter is invalid.')
    for (let o = 0, n = t; n < t + i; ++n) { this.data[n] = e[o], o += 2 }
    this.gain = this.getGain()
  }, this.getGain = function (e, t) {
    void 0 === e && (e = 0), void 0 === t && (t = this.data.length - e), (e < 0 || e > this.data.length) && output_throw('start parameter is invalid.'), (t < 0 || t + e > this.data.length) && output_throw('end parameter is invalid.')
    for (var i = 0, o = e; o < e + t; ++o) {
      const n = Math.abs(this.data[o])
      i = Math.max(i, n)
    }
    return i
  }, this.getLengthInSeconds = function () {
    return this.data.length / this.sampleRate
  }, this.filterNormalize = function (e, t) {
    void 0 === e && (e = 0), void 0 === t && (t = this.data.length - e), (e < 0 || e > this.data.length) && output_throw('start parameter is invalid.'), (t < 0 || t + e > this.data.length) && output_throw('end parameter is invalid.')
    for (let i = this.getGain(e, t), o = 1 / i, n = e; n < e + t; ++n) { this.data[n] = this.data[n] * o }
    this.gain = this.getGain()
  }, this.filterGain = function (e, t, i) {
    void 0 === t && (t = 0), void 0 === i && (i = this.data.length - t), (t < 0 || t > this.data.length) && output_throw('start parameter is invalid.'), (i < 0 || i + t > this.data.length) && output_throw('end parameter is invalid.')
    for (let o = t; o < t + i; ++o) { this.data[o] = this.data[o] * e }
    this.gain = this.getGain()
  }, this.filterSilence = function (e, t) {
    this.filterGain(0, e, t)
  }, this.filterLinearFade = function (e, t, i, o) {
    void 0 === i && (i = 0), void 0 === o && (o = this.data.length - i), (i < 0 || i > this.data.length) && output_throw('start parameter is invalid.'), (o < 0 || o + i > this.data.length) && output_throw('end parameter is invalid.')
    for (let n = 0, s = 0, a = i; a < i + o; ++a) { s = (a - i) / o, n = MathEx.lerp(e, t, s), this.data[a] = this.data[a] * n }
    this.gain = this.getGain()
  }, this.filterReverse = function () {
    this.data.reverse()
  }, this.createTestTone = function (e, t) {
    for (var i = [], o = e / this.sampleRate, n = 0; n < t; ++n) { i.push((Math.cos(2 * Math.PI * n * o) + Math.cos(2 * Math.PI * n * o * 1)) / 2) }
    this.data = i
  }
}

function CreateNewAudioSequence (e, t) {
  const i = new AudioSequence()
  if (i.sampleRate = e, i.data = [], void 0 !== t) {
    i.data = []
    for (let o = 0; o < t.length; ++o) { i.data.push(t[o]) }
  }
  return i
}

function WaveTrack () {
  function e (e, t, i) {
    return t == 8 ? e == 0 ? -1 : e / i - 1 : e == 0 ? 0 : e / i
  }

  function t (e, t, i) {
    return t == 8 ? (e + 1) * i : e * i
  }
  this.sampleRate = 0, this.audioSequences = []
  const i = [0, 127, 32767, 66571993087]
  this.fromAudioSequences = function (e) {
    if (e.length !== 0) {
      for (var t = e[0].sampleRate, i = e[0].data.length, o = 1; o < e.length; ++o) { if (e[o].sampleRate != t || e[o].data.length != i) { throw 'The input sequences must have the same length and samplerate' } }
      this.sampleRate = t, this.audioSequences = e
    }
  }, this.toBlobUrlAsync = function (e, t, i) {
    const o = this.encodeWaveFile()
    const n = new Blob([o], {
      type: e
    })
    if (void 0 === t) { return window.URL.createObjectURL(n) }
    const s = new FileReader()
    s.onloadend = function (e) {
      t(s.result, i)
    }, s.readAsDataURL(n)
  }, this.decodeWaveFile = function (t) {
    const o = new BinaryReader(t)
    o.readString(4), o.readUInt32(), o.readString(4)
    o.gotoString('fmt ')
    const n = (o.readString(4), o.readUInt32(), o.readUInt16(), this.channels = o.readUInt16())
    const s = (this.sampleRate = o.readUInt32(), o.readUInt32(), o.readUInt16())
    const a = o.readUInt16()
    o.gotoString('data')
    for (var r = (o.readString(4), o.readUInt32()), h = this.samplesPerChannel = r / s, l = ['Left Channel', 'Right Channel'], c = 0; c < n; ++c) { this.audioSequences.push(new CreateNewAudioSequence(this.sampleRate)), this.audioSequences[c].name = l[c] }
    const u = a / 8
    const d = i[u]
    this.gain = 0
    for (var c = 0; c < h; ++c) {
      for (var f = 0; f < n; ++f) {
        let v = a == 8 ? o.readUInt8() : a == 16 ? o.readInt16() : o.readInt32()
        v = Math.min(1, Math.max(-1, v))
        const p = e(v, a, d)
        this.audioSequences[f].data.push(p)
      }
    }
    for (var f = 0; f < n; ++f) { this.audioSequences[f].gain = this.audioSequences[f].getGain() }
  }, this.encodeWaveFile = function () {
    const e = this.audioSequences.length
    const o = this.sampleRate
    var n = 16
    const s = o * e * n / 8
    const a = e * n / 8
    var n = 16
    const r = this.audioSequences[0].data.length
    const h = r * a
    const l = h + 36
    const c = l + 8
    const u = new BinaryWriter(c)
    u.writeString('RIFF'), u.writeUInt32(l), u.writeString('WAVE'), u.writeString('fmt '), u.writeUInt32(16), u.writeUInt16(1), u.writeUInt16(e), u.writeUInt32(o), u.writeUInt32(s), u.writeUInt16(a), u.writeUInt16(n), u.writeString('data'), u.writeUInt32(h)
    for (let d = n / 8, f = i[d], v = 0; v < r; ++v) { for (let p = 0; p < e; ++p) { u.writeInt16(t(this.audioSequences[p].data[v], n, f)) } }
    return u.data
  }
}

function Complex (e, t) {
  this.real = e, this.img = t, this.plus = function (e) {
    return new Complex(this.real + e.real, this.img + e.img)
  }, this.minus = function (e) {
    return new Complex(this.real - e.real, this.img - e.img)
  }, this.times = function (e) {
    return new Complex(this.real * e.real - this.img * e.img, this.real * e.img + this.img * e.real)
  }, this.timesScalar = function (e) {
    return new Complex(this.real * e, this.img * e)
  }, this.conjugate = function () {
    return new Complex(this.real, -this.img)
  }, this.print = function () {
    return r = this.real, r + ' ' + this.img
  }
}

function FileDropbox () {
  function e (e, t) {
    t.control.fileload_start && t.control.fileload_start()
    const i = e[0]
    const o = new FileReader()
    o.onload = function (e) {
      const i = e.target.result
      t.resultArrayBuffer = i, t.resultArrayBuffer_bk = i.slice(0), t.result = new Uint8Array(i), t.onFinish !== null && t.onFinish()
    }, o.onerror = t.onFail, o.readAsArrayBuffer(i)
  }
  this.result = null, this.resultArrayBuffer = null, this.onFinish = null, this.onFail = null, this.defineDropHandler = function (e) {
    e.addEventListener('dragenter', this.skipEventHandler, !1), e.addEventListener('dragexit', this.skipEventHandler, !1), e.addEventListener('dragover', this.skipEventHandler, !1), e.addEventListener('drop', this.dropHandler, !1), e.masterObj = this, e.masterObj.control = e
  }, this.skipEventHandler = function (e) {
    e.stopPropagation(), e.preventDefault()
  }, this.dropHandler = function (t) {
    t.stopPropagation(), t.preventDefault()
    const i = t.dataTransfer.files
    i.length > 0 && (e(i, t.currentTarget.masterObj), t.currentTarget.cur_load_files = i)
  }, this.handleArrayBuffer = function (e, t) {
    t.control.fileload_start && t.control.fileload_start(), t.resultArrayBuffer = e, t.result = new Uint8Array(e), t.onFinish !== null && t.onFinish()
  }, this.reset = function (e) {
    e.resultArrayBuffer_bk && (e.control.fileload_start && e.control.fileload_start(), e.resultArrayBuffer = e.resultArrayBuffer_bk.slice(0), e.result = new Uint8Array(e.resultArrayBuffer), e.result && e.onFinish !== null && e.onFinish())
  }, this.store_bk = function (e) {
    e.resultArrayBuffer_bk = e.resultArrayBuffer_last.slice(0)
  }, this.handleFiles = e
}

function SpectrumWorker () {
  this.toFrequencyDomain = function (e, t, i, o, n, s) {
    if (void 0 === i && (i = 0), void 0 === o && (o = e.length), !0 !== IsPowerOfTwo(o)) { throw 'The length of the timeDomain has to be power of two!' }
    const a = e.slice(i, i + o)
    const r = void 0 === t ? void 0 : t.slice(i, i + o)
    ACFFT(a.length, !1, a, r, n, s)
  }, this.fromFrequencyDomain = function (e, t, i, o) {
    if (e.length !== t) { throw 'The real and imaginary arrays have a different size' }
    ACFFT(e.length, !0, e, t, i, o)
  }, this.toAmplitudeSpectrum = function (e, t, i, o, n, s) {
    if (void 0 === i && (i = 0), void 0 === o && (o = e.length), void 0 === n && (n = 1024), void 0 === s && (s = 4), void 0 === t && (t = 44100), e.length < n || o < n) { throw 'Length of the timeDomainData is to small (minimum is the windowSize: ' + n + ')' }
    if (i < 0 || i >= e.length) { throw 'Start is out of range' }
    if (i + o > e.length) { throw 'Length is out of range' }
    const a = e.slice(i, i + o)
    const r = []
    return ComputeSpectrum(a, a.length, n, t, r, !1, s), r
  }, this.toAmplitudeSpectrumFromAudioSequence = function (e, t, i, o, n) {
    return this.toAmplitudeSpectrum(e.data, e.sampleRate, t, i, o, n)
  }
}

function init (e) {
  sampleRate = e.sampleRate
}

function record (e) {
  recBuffersL.push(e[0]), recBuffersR.push(e[1]), recLength += e[0].length
}

function exportWAV (e) {
  const t = mergeBuffers(recBuffersL, recLength)
  const i = mergeBuffers(recBuffersR, recLength)
  const o = interleave(t, i)
  const n = encodeWAV(o)
  const s = new Blob([n], {
    type: e
  })
  this.postMessage(s)
}

function getBuffer () {
  const e = []
  e.push(mergeBuffers(recBuffersL, recLength)), e.push(mergeBuffers(recBuffersR, recLength)), this.postMessage(e)
}

function clear () {
  recLength = 0, recBuffersL = [], recBuffersR = []
}

function mergeBuffers (e, t) {
  for (var i = new Float32Array(t), o = 0, n = 0; n < e.length; n++) { i.set(e[n], o), o += e[n].length }
  return i
}

function interleave (e, t) {
  for (var i = e.length + t.length, o = new Float32Array(i), n = 0, s = 0; n < i;) { o[n++] = e[s], o[n++] = t[s], s++ }
  return o
}

function floatTo16BitPCM (e, t, i) {
  for (let o = 0; o < i.length; o++, t += 2) {
    const n = Math.max(-1, Math.min(1, i[o]))
    e.setInt16(t, n < 0 ? 32768 * n : 32767 * n, !0)
  }
}

function writeString (e, t, i) {
  for (let o = 0; o < i.length; o++) { e.setUint8(t + o, i.charCodeAt(o)) }
}

function encodeWAV (e) {
  const t = new ArrayBuffer(44 + 2 * e.length)
  const i = new DataView(t)
  return writeString(i, 0, 'RIFF'), i.setUint32(4, 32 + 2 * e.length, !0), writeString(i, 8, 'WAVE'), writeString(i, 12, 'fmt '), i.setUint32(16, 16, !0), i.setUint16(20, 1, !0), i.setUint16(22, 2, !0), i.setUint32(24, sampleRate, !0), i.setUint32(28, 4 * sampleRate, !0), i.setUint16(32, 4, !0), i.setUint16(34, 16, !0), writeString(i, 36, 'data'), i.setUint32(40, 2 * e.length, !0), floatTo16BitPCM(i, 44, e), i
}

function successfulFileSystemCreated (e) {
  fileSystemEntry = e, void 0 !== callback_requestSuccess && callback_requestSuccess(e)
}

function failedFileSystemCreation (e) {
  void 0 !== callback_requestFailed && callback_requestFailed(e)
}
const FFT = (function () {
  function e (e, t, i, o) {
    const r = (o ? a : -a) * t / i
    e[0] = s(r), e[1] = n(r)
  }

  function t (t, i, o, n) {
    let s; let a; let r; let h; let l; let c; let u; let d; let f; let v; const p = 0.5 * t.length
    let m = 0
    let g = 0
    const S = p / 2
    const y = p / n
    const w = n / 2
    const E = 1 * w
    const q = new Float32Array(2)
    for (s = 0; s < y; s++, g += E) { for (e(q, s, 2 * y, o), a = 0; a < w; a++, m++, g++) { r = t[2 * m], h = t[2 * m + 1], l = t[2 * (m + S)], c = t[2 * (m + S) + 1], u = r + l, d = h + c, f = r - l, v = h - c, i[2 * g] = u, i[2 * g + 1] = d, i[2 * (g + w)] = q[0] * f - q[1] * v, i[2 * (g + w) + 1] = q[0] * v + q[1] * f } }
  }

  function i (e, i, o, n) {
    let s; let a; let r; let h; let l = 1
    let c = 0
    const u = 0.5 * e.length
    const d = o.length
    for (h = 0; h < d; h++) { r = o[h], l *= r, c === 0 ? (s = e, a = i, c = 1) : (s = i, a = e, c = 0), r === 2 && t(s, a, n, l) }
    if (n) {
      if (c === 1) { for (h = 0; h < u; h++) { e[2 * h] = i[2 * h], e[2 * h + 1] = i[2 * h + 1] } }
    } else if (c === 1) { for (h = 0; h < u; h++) { e[2 * h] = i[2 * h] / u, e[2 * h + 1] = i[2 * h + 1] / u } } else { for (h = 0; h < u; h++) { e[2 * h] = e[2 * h] / u, e[2 * h + 1] = e[2 * h + 1] / u } }
  }

  function o () {
    this.reset.apply(this, arguments)
  }
  var n = Math.sin
  var s = Math.cos
  var a = 2 * Math.PI
  return o.prototype = {
    factors: null,
    scratch: null,
    bufferSize: 256,
    reset (e) {
      this.bufferSize = isNaN(e) ? this.bufferSize : e, this.factors = []
      for (let t = this.getExp(this.bufferSize) - 1, i = 0; i < t; ++i) { this.factors.push(2) }
      this.scratch = new Float32Array(this.bufferSize)
    },
    getExp (e) {
      for (var t = e, i = 0; ;) {
        if ((t >>= 1) == 0) { break }
        ++i
      }
      return i
    },
    forward (e) {
      i(e, this.scratch, this.factors, !0)
    },
    backward (e) {
      i(e, this.scratch, this.factors, !1)
    }
  }, o
}())
!(function (e) {
  const t = function (e, t) {
    const i = t || {}
    const o = i.bufferLen || 4096
    this.context = e.context, this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode)
      .call(this.context, o, 2, 2)
    const n = new Worker(i.workerPath || 'recorderWorker.js')
    n.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    })
    let s; let a = !1
    this.node.onaudioprocess = function (e) {
      a && n.postMessage({
        command: 'record',
        buffer: [e.inputBuffer.getChannelData(0), e.inputBuffer.getChannelData(1)]
      })
    }, this.configure = function (e) {
      for (const t in e) { e.hasOwnProperty(t) && (i[t] = e[t]) }
    }, this.record = function () {
      a = !0
    }, this.stop = function () {
      a = !1
    }, this.clear = function () {
      n.postMessage({
        command: 'clear'
      })
    }, this.getBuffer = function (e) {
      s = e || i.callback, n.postMessage({
        command: 'getBuffer'
      })
    }, this.exportWAV = function (e, t) {
      if (s = e || i.callback, t = t || i.type || 'audio/wav', !s) { throw new Error('Callback not set') }
      n.postMessage({
        command: 'exportWAV',
        type: t
      })
    }, n.onmessage = function (e) {
      const t = e.data
      s(t)
    }, e.connect(this.node), this.node.connect(this.context.destination)
  }
  t.forceDownload = function (t, i) {
    const o = (e.URL || e.webkitURL)
      .createObjectURL(t)
    const n = e.document.createElement('a')
    n.href = o, n.download = i || 'output.wav'
    const s = document.createEvent('Event')
    s.initEvent('click', !0, !0), n.dispatchEvent(s)
  }, e.Recorder = t
}(window))
var gFFTBitTable = void 0
var MaxFastBits = 16
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem, window.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder, window.URL = window.URL || window.webkitURL
let record_audio_context; let record_recorder; let record_node; let record_spectrum; let record_analyserNode; const recording = !1
let record_result_blob; var activeAudioLayerControl = void 0
var focusOnAudioLayerSequenceEditor = void 0
const clipboardAudioSequence = void 0
window.addEventListener('copy', function (e, t) {
  void 0 !== focusOnAudioLayerSequenceEditor && focusOnAudioLayerSequenceEditor.copy(!0)
}, !0)
window.addEventListener('paste', function (e, t) {
  void 0 !== focusOnAudioLayerSequenceEditor && focusOnAudioLayerSequenceEditor.paste(!0)
}, !0)
window.addEventListener('cut', function (e, t) {
  void 0 !== focusOnAudioLayerSequenceEditor && focusOnAudioLayerSequenceEditor.cut(!0)
}, !0)
window.addEventListener('crop', function (e, t) {
  void 0 !== focusOnAudioLayerSequenceEditor && focusOnAudioLayerSequenceEditor.crop(!0)
}, !0)
window.addEventListener('scroll', function (e) {}, !0)
window.addEventListener('keydown', function (e) {
  void 0 !== focusOnAudioLayerSequenceEditor && (e.keyCode == 46 && focusOnAudioLayerSequenceEditor.del(!0), e.keyCode == 81 && (focusOnAudioLayerSequenceEditor.movementActive = !0), e.keyCode == 32 && (document.querySelector('#audioLayerControl')
    .playToggle(), e.cancelBubble = !0, e.returnValue = !1))
}, !0)
window.addEventListener('keyup', function (e) {
  void 0 !== focusOnAudioLayerSequenceEditor && e.keyCode == 81 && (focusOnAudioLayerSequenceEditor.movementActive = !1)
}, !0)
var MathEx = new function () {
  this.lerp = function (e, t, i) {
    return e < t ? e + (t - e) * i : t + (e - t) * (1 - i)
  }
}()
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem, window.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder, window.URL = window.URL || window.webkitURL
var recLength = 0
var recBuffersL = []
var recBuffersR = []
let sampleRate
this.onmessage = function (e) {
  switch (e.data.command) {
    case 'init':
      init(e.data.config)
      break
    case 'record':
      record(e.data.buffer)
      break
    case 'exportWAV':
      exportWAV(e.data.type)
      break
    case 'getBuffer':
      getBuffer()
      break
    case 'clear':
      clear()
  }
}, window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
var callback_requestSuccess = void 0
var callback_requestFailed = void 0
var fileSystemEntry = void 0
/* ------------------------------ */
