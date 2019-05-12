
/*Поддержка Chrome*/
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/*Грамматика*/
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'


/*Подключение грамматики к распознаванию речи*/

var recognition = new SpeechRecognition();  /* определить экземпляр распознавания речи для управления распознаванием для нашего приложения*/
var speechRecognitionList = new SpeechGrammarList(); /* создаем новый речевой грамматический список, чтобы содержать нашу грамматику,*/
speechRecognitionList.addFromString(grammar, 1);  /*добавим наш grammar список*/
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US'; /*Устанавливает язык распознавания*/
recognition.interimResults = false; /*Определяет, должна ли система распознавания речи возвращать промежуточные результаты или только конечные результаты*/
recognition.maxAlternatives = 1;  /*Устанавливает количество альтернативных потенциальных совпадений, которые должны быть возвращены за каждый результат. */



/*Запуск распознавания речи*/
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){  /*метод используется для вывода цветных индикаторов, показывающих, какие цвета следует использовать*/
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = colorHTML + '.';





var allLinks = document.getElementsByTagName('a');
// get last word said element
var strongEl = document.getElementById('latest-word');

// new instance of speech recognition
var recognitionMenu = new SpeechRecognition();
// set params
recognitionMenu.continuous = true;
recognitionMenu.interimResults = true;
var speechRecognitionList = new SpeechGrammarList(); /* создаем новый речевой грамматический список, чтобы содержать нашу грамматику,*/
speechRecognitionList.addFromString(grammar, 1);  /*добавим наш grammar список*/
recognitionMenu.grammars = speechRecognitionList;
recognitionMenu.interimResults = false;
recognitionMenu.lang = 'en-US';
recognitionMenu.maxAlternatives = 1;
recognitionMenu.start();


recognitionMenu.onresult = function(event){
  
   var last = event.results.length - 1;  
  var color = event.results[last][0].transcript;  

  diagnostic.textContent = 'The result: ' + color + '.'; 
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
  // delve into words detected results & get the latest
  // total results detected
  var resultsLength = event.results.length -1 ;
  // get length of latest results
  var ArrayLength = event.results[resultsLength].length -1;
  // get last word detected
  var saidWord = event.results[resultsLength][ArrayLength].transcript;
  
  // loop through links and match to word spoken
  for (i=0; i<allLinks.length; i++) {
    
    // get the word associated with the link
    var dataWord = allLinks[i].dataset.word;
    
    // if word matches chenge the colour of the link
    if (saidWord.indexOf(dataWord) != -1) {
      allLinks[i].click();
    }
  }
  
  // append the last word to the bottom sentence
  strongEl.innerHTML = saidWord;
}

// speech error handling
recognitionMenu.onerror = function(event){
  console.log('error?');
  console.log(event);
}

/