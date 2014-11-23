var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var board = [];

var fenParser = function(fen) {

  // console.log('parsing');

  for (var i = fen.length - 1; i >= 0; i--) {
    // console.log(fen[i]);

    if (('rbqknpRBQKNP').indexOf(fen[i]) !== -1) {
      console.log('Im in the string');
      board.push(fen[i]);

    } else if (('12345678').indexOf(fen[i]) !== -1) {
      for (var a = fen[i] - 1; a >= 0; a--) {
        this.board.push(null);
      };
    } else {
      console.log(fen[i]);
    }

  };
};




$(function() {

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
  // Turn each value into an image
  for (key in pieces) {
    var image = new Image();
    image.src = '/images/' + pieces[key];
    pieces[key] = image;
  }



  var game = new Sketch.create({


    setup: function() {
      console.log('setup');

      this.squareSize = this.width/8;

    },

    update: function() {


    },


    draw: function() {
      

      

      for (var i = board.length - 1; i >= 0; i--) {
        if(i % 2 && !(Math.floor(i/8) % 2)){
          this.fillStyle = '#333';
        } else if (!(i % 2) && Math.floor(i/8) % 2){
          this.fillStyle = '#333';
        } else {
          this.fillStyle = '#aaa';
        }
        
        this.fillRect( (i % 8) * this.squareSize,  Math.floor(i/8) * this.squareSize, this.squareSize, this.squareSize);

        var key = board[i];
        if(key !== null){
          // console.log('im not null');
          var src = pieces[key];
          this.drawImage(src, (i % 8) * this.squareSize, Math.floor(i/8) * this.squareSize, this.squareSize /1.1, this.squareSize /1.1);
        }

      };
    }

  });


});
