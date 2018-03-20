// -------------- VARIABLES --------------------

var start = $(".startbtn");
var images  = $('.dice');
var header = $(".hover-header");
var input = $(".guess");
var container = $('.container');

var randomNumber = function() {
	"use strict";
	return Math.floor(Math.random() * 6) + 1;
};

//**********************************************
// -------------- ROLL THE DICE ----------------
//**********************************************


start.click(function() {
	"use strict";

	var guess = input.val();
	
	if(guess >= 1 && guess <= 36){
		$(".start").fadeOut();
		header.html("Guess the number and roll the dice");
		
		var random1;
		var random2;
		
		var timer = setInterval(function() {
			random1 = randomNumber();
			random2 = randomNumber();
			images[0].src = "img/kocka" + random1 + ".jpg";
			images[1].src = "img/kocka" + random2 + ".jpg";
		}, 150);
		
// ------------- RESULT CALCULATION ------------
// ------------- APPEND RESULT -----------------
		
		setTimeout(function() {
			clearInterval(timer);
			var computer = (randomNumber()) * (randomNumber());
			var result = random1 * random2;
			var $ddv = $('<div class="hover restart flex-col"></div>');
			var $button = $('<span class="restart-btn"><button>Play again</button></span>');
			
			if(Math.abs(result - guess) > Math.abs(result - computer)){
				$ddv.append($('<span class="result center">Defeat</span>'));
			}else if(Math.abs(result - guess) < Math.abs(result - computer)) {
				$ddv.append($('<span class="result center">Victory</span>'));
			}else{
				$ddv.append($('<span class="result center">Draw</span>'));
			}
			
			$ddv.append('<span class="number-preview">Result: ' + result + '<br/>Computer: ' + computer + '<br/>Player: ' + guess + '</span>');
			$ddv.append($button);
			container.append($ddv);
			
			// ------------- RESTART BUTTON --------------------
			
			var restart = $('.restart');
		
			$button.click(function() {
				input.val('');
				restart.fadeOut();
				$('.start').show();
				
				setTimeout(function() {
					restart.remove();
				}, 250);
			});
			
		}, 3000);
		
		
	}else {
		var $wrong = $("<span>Rossz értéket adtál meg, próbáld újra!</span>");
		$wrong.css('color', 'rgb(255,0,0)');
		$(".hover-header").html($wrong);
	}
});