console.log('browser-sync!');


// Array Declaration
var puzzleMemory = ['A','A','B','B','C','C','D','D','F','F','I','I','J','J','K','K','M','M','Z','Z'];
var comparison_array = [];
var card_serial_id = [];
var tiles_flipped_count = 0;
var moveCounter = 0;

// The Array.prototype property represents the prototype for the Array constructor and allows you to add new properties and methods to all Array objects.
/*
	//  Proof of Concept
		Array.prototype.divyanshu = function () {
				console.log(this);
		}
		puzzleMemory.divyanshu();
*/
// Algorithm for random shuffling of Array. 

Array.prototype.memory_tile_shuffle = function(){

	// console.log(this.length);
    var x = this.length, y;
    while(--x > 0){
        y = Math.floor(Math.random() * (x+1));
        // console.log('shuffling',j);
        swap(this,y,x);
        // console.log(this);
    }
}

function swap(arr,y,x){
		var temp;
	 	temp = arr[y];
        arr[y] = arr[x];
        arr[x] = temp;
}


function create_intial_puzzle(){

	// set_timer();
	tiles_flipped_count = 0;
	var append_html = '';
    puzzleMemory.memory_tile_shuffle();
    // For appending HTML #writing html using js !
	for(var i = 0; i < puzzleMemory.length; i++){
		append_html += '<div class = "col-lg-2 custom_style_div" id="tile_'+i+'" onclick="clicked_card(this,\''+puzzleMemory[i]+'\')"></div>';
	}
	document.getElementById('puzzle').innerHTML = append_html;
}


function clicked_card(card,value){

	if(card.innerHTML == "" && comparison_array.length < 2){

		moveCounter++;
		var y = document.getElementById('counter')
		y.innerHTML = "Move Count: " + moveCounter;


		if (moveCounter > 6) {
			var hide_star_one = document.getElementById('star_one');
			hide_star_one.style.display = 'none';
		}


		if (moveCounter > 10) {
			var hide_star_two = document.getElementById('star_two');
			hide_star_two.style.display = 'none';
		}


		card.style.background = '#FFF';
		
		card.innerHTML = value;
		
		if(comparison_array.length == 0){
		
			comparison_array.push(value);
			card_serial_id.push(card.id);
		
		} else if(comparison_array.length == 1){
		
			comparison_array.push(value);
			card_serial_id.push(card.id);
		
			if(comparison_array[0] == comparison_array[1]){
		
				tiles_flipped_count += 2;
				// Clear both arrays
				comparison_array = [];
            	card_serial_id = [];
				// Check to see if the whole puzzle is cleared
		
				if(tiles_flipped_count == puzzleMemory.length){
					alert("Well Done You Won Generating New Puzzle :)");
					document.getElementById('puzzle').innerHTML = "";
					create_intial_puzzle();
				}
		
			} else {
		
				function revert(){
				    // revert the tiles back over
				    var card_one = document.getElementById(card_serial_id[0]);
				    var card_two = document.getElementById(card_serial_id[1]);

				    card_one.style.background = 'url(../custom_images/icon.jpg) no-repeat';
				 
            	    card_one.innerHTML = "";
				    card_two.style.background = 'url(../custom_images/icon.jpg) no-repeat';
		
            	    card_two.innerHTML = "";
				    // Clear both arrays
				    comparison_array = [];
            	    card_serial_id = [];
				}
				setTimeout(revert, 700);
			}
		}
	}
}

function restart() {

	create_intial_puzzle();
	window.timeStamp = Math.floor(Date.now() / 1000);
	moveCounter = 0;
	var y = document.getElementById('counter')
	y.innerHTML = "Move Count: " + moveCounter;

	var show_star_one = document.getElementById('star_one');
	show_star_one.style.display = 'block';

	var show_star_two = document.getElementById('star_two');
	show_star_two.style.display = 'block';
}

function set_timer(){
	console.log(Math.floor(Date.now() / 1000) - window.timeStamp);
	var x = document.getElementById('timer')
	x.innerHTML = "Time spent : " + (Math.floor(Date.now() / 1000) - window.timeStamp);
}

// function star_generator(){

// 		var x = document.getElementById('stars')
//         // Get the value
//         var val = parseFloat(x.html());
//         // Make sure that the value is in 0 - 5 range, multiply to get width
//         val = Math.round(val * 2) / 2;

//         var size = Math.max(0, (Math.min(5, val))) * 16;
//         // Create stars holder
//         var span = $('<span />').width(size);
//         // Replace the numerical value with stars
//         $(this).html(span);

// }

window.onload = function() {
  create_intial_puzzle();
  window.timeStamp = Math.floor(Date.now() / 1000);
  // window.moveCounter = 0;
  setInterval(set_timer,1000);
};






