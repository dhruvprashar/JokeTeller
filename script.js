const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

//API key work

const _0x47ad18=_0x5b0a;function _0x5b0a(_0x15a7cf,_0x3ad20f){const _0x4e6aa6=_0x4e6a();return _0x5b0a=function(_0x5b0aa,_0xd5b1f){_0x5b0aa=_0x5b0aa-0x143;let _0x54e15b=_0x4e6aa6[_0x5b0aa];return _0x54e15b;},_0x5b0a(_0x15a7cf,_0x3ad20f);}(function(_0x3521ce,_0x253441){const _0x2afe01=_0x5b0a,_0x3794c6=_0x3521ce();while(!![]){try{const _0x190dc6=-parseInt(_0x2afe01(0x14d))/0x1+-parseInt(_0x2afe01(0x147))/0x2+parseInt(_0x2afe01(0x14a))/0x3*(parseInt(_0x2afe01(0x146))/0x4)+-parseInt(_0x2afe01(0x14c))/0x5*(-parseInt(_0x2afe01(0x149))/0x6)+parseInt(_0x2afe01(0x145))/0x7+parseInt(_0x2afe01(0x14b))/0x8*(parseInt(_0x2afe01(0x148))/0x9)+-parseInt(_0x2afe01(0x144))/0xa;if(_0x190dc6===_0x253441)break;else _0x3794c6['push'](_0x3794c6['shift']());}catch(_0x21cb47){_0x3794c6['push'](_0x3794c6['shift']());}}}(_0x4e6a,0x928bd));function _0x4e6a(){const _0x1cdb4d=['2220568cazTYm','4ijnZaK','126210RrQaxR','16839DSBweU','36504CumiXG','1322694IYmSvz','1184XaIXdv','920jdGMuI','748541xyxErK','9726b9fd830841dfaea136e0b0147fa5','7425870yNEYSA'];_0x4e6a=function(){return _0x1cdb4d;};return _0x4e6a();}const apiKey=_0x47ad18(0x143);


//Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

// function test(){
    // VoiceRSS.speech({
    //     key: apiKey,
    //     src: 'Hello, world!',
    //     hl: 'en-us',
    //     v: 'Linda',
    //     r: 0, 
    //     c: 'mp3',
    //     f: '44khz_16bit_stereo',
    //     ssml: false
    // });
// }

// test();

//Passing Joke to VoiceRSS API
function tellMe(joke){
    // console.log('tell me :',joke);

    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke api
async function getJokes(){
    let joke='';
    const apiUrl='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try{
        const response= await fetch(apiUrl);
        const data= await response.json();
        if(data.setup) {
            joke = `${data.setup}... ${data.delivery}`;
        }else{
            joke=data.joke;
        }
        // console.log(joke);
        tellMe(joke);
        //disable button
        toggleButton();
    } catch(error){
        //Catch errors
        console.log("whoops: ", error);
    }

}

// getJokes();
//Event Listeners
button.addEventListener('click',getJokes);

audioElement.addEventListener('ended', toggleButton);