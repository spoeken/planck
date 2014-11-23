var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var board = [];

var fenParser = function(fen){

	// console.log('parsing');

	for (var i = fen.length - 1; i >= 0; i--) {
		// console.log(fen[i]);

		if(('rbqknpRBQKNP').indexOf(fen[i]) !== -1){
			console.log('Im in the string');
			board.push(fen[i]);

		} else if(('12345678').indexOf(fen[i]) !== -1){
			for (var a = fen[i] - 1; a >= 0; a--) {
				this.board.push(null);
			};
		} else {
			console.log(fen[i]);
		}

	};
}



$(function(){

	fenParser(fen);
	var pieces = {
		r: "/black/rook.png",
		n: "/black/knight.png",
		b: "/black/bishop.png",
		q: "/black/queen.png",
		k: "/black/king.png",
		p: "/black/pawn.png",
		R: "/white/rook.png",
		N: "/white/knight.png",
		B: "/white/bishop.png",
		Q: "/white/queen.png",
		K: "/white/king.png",
		P: "/white/pawn.png"
	};


	var game = new Sketch.create({


		setup: function() {
			console.log('setup');

		},

		update: function(){
			

		},

		draw: function() {
		    this.fillStyle = 'rgb(' + ~~this.r + ',' + ~~this.g + ',' + ~~this.b + ')';
		    this.fillRect( 0, 0, this.width, this.height );

		    // for (var i = this.board.length - 1; i >= 0; i--) {
		    // 	var key = this.board[i];
		    // 	if(this.pieces[key] !== null){
		    // 		var src = this.pieces[key].color + "/" + this.pieces[key].piece + ".png";
		    // 		// "black/rook.png"
		    // 	}

		    // };
		}



	});


});


