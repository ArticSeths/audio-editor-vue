(function () {
	'use strict';
	if( 'undefined' === typeof window){
       importScripts('/audiotool/audioeditor/encode/lame.all.js');
    }
	//debugger;
	var mp3data = [];
	var data_length = 0;
	var data_pos = 0;
	var sampleBlockSize = 1152;
	var mp3encoder;
	var channels;
	
	function get_int16array_from_unit8array(unit8array)
	{
		var signedBorders = [0, 0xFF - 0x80, 0xFFFF - 0x8000, 0xFFFFFFFFF - 0x80000000];
		var waveBitsPerSample = 16;
		var signBorderId = waveBitsPerSample / 8;
		var signedBorder = signedBorders[signBorderId];
		
		var newarray = new Int16Array(unit8array.length);
		
		for(var i = 0; i < unit8array.length; ++i)
		{
			newarray[i] = ((waveBitsPerSample == 8)?(unit8array[i] + 1.0) * signedBorder : unit8array[i] * signedBorder); 
			//convertFloatToInt(unit8array[i], waveBitsPerSample, signedBorder);   
		}
		
		return newarray;
	}	
	
	function mp3_encode_chunk(in_left,in_right)
	{
		var left = get_int16array_from_unit8array(in_left);
		var right = in_right? get_int16array_from_unit8array(in_right):null;
		//debugger;
		for (var i = 0; i < left.length; i += sampleBlockSize) {
			data_pos += sampleBlockSize;
			var mp3buf;
			var leftChunk = left.subarray(i, i + sampleBlockSize);
			if ( channels == 1 )
			{
				mp3buf = mp3encoder.encodeBuffer(leftChunk);
			}
			else if ( channels == 2 )
			{
				if ( right )
				{
					var rightChunk = right.subarray(i, i + sampleBlockSize);
					mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
				}
				else
				{
					mp3buf = mp3encoder.encodeBuffer(leftChunk,leftChunk);
				}
			}
			if (mp3buf.length > 0) {
				mp3data.push(mp3buf);
			}
			self.postMessage({
				cmd: 'progress',
				proc: (data_pos * 100 / data_length).toFixed(2)
			});
		}
		
		if ( data_pos >= data_length )
		{
			var mp3buf = mp3encoder.flush();  
			if (mp3buf.length > 0) {
				mp3data.push(mp3buf);
			}

			//finish
			self.postMessage({
				cmd: 'done',
				mp3data: mp3data
			});
		}
		else
		{
			//request chunk
			self.postMessage({
				cmd: 'rq_chunk',
				i: data_pos
			});
		}
	}
	
	function mp3_encode_do( in_samplerate, in_length, out_samplerate, out_channels, out_bitrate )
	{
		mp3data = [];
		data_length = in_length;
		data_pos = 0;
		channels = out_channels;
		mp3encoder = new lamejs.Mp3Encoder(out_channels, out_samplerate, out_bitrate);
		self.postMessage({
			cmd: 'rq_chunk',
			i: 0
		});
	}
	self.onmessage = function (e) {
		switch (e.data.cmd) {
			case 'convert':
				mp3_encode_do( e.data.in_samplerate, e.data.in_length, e.data.out_samplerate, e.data.out_channels, e.data.out_bitrate );
				break;
			case 'chunk':
				mp3_encode_chunk( e.data.left, e.data.right );
				break;
				
    }
  };
})();