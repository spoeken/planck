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

        // Some array is gonna be a array of possible moves 
        // if(someArray.indexOf(i)){
        //   this.fillStyle = 'rgba(68, 134, 250, 0.5)';
        //   this.fillRect( (i % 8) * this.squareSize,  Math.floor(i/8) * this.squareSize, this.squareSize, this.squareSize);
        // }

        var key = board[i];
        if(key !== null){
          // console.log('im not null');
          var src = pieces[key];
          this.drawImage(src, ((i % 8) * this.squareSize) + this.squareSize * 0.05, Math.floor(i/8) * this.squareSize + this.squareSize * 0.05, this.squareSize /1.2, this.squareSize /1.2);
        }

      };
    },

    mouseup: function(e){
      
      //Find clicked square
      var x = e.x;
      var y = e.y;
      var xIndex = floor(x / this.squareSize);
      var yIndex = floor(y / this.squareSize);

      var index = xIndex + (yIndex*8); //The index of the clicked square


    }

  });


});

var legalMoves = function (piece) {
  var friends = [],
      foes = [],
      i;
  pieceType = board[piece];

  for (i = 0; i < board.length; i += 1) {
    if (board[i]) {
      if (isSameColor(piece, i)) {
        friends.push(i);
      } else {
        foes.push(i);
      }
    }
  }
  switch (pieceType) {
    case 'p':
    case 'P':
      return legalMovesPawn(piece, friends, foes);
      break;
  }
}

var legalMovesPawn = function (pawn, friends, foes) {
  if (isWhite(pawn)) {
    return legalMovesPawnWhite(pawn, friends, foes)
  } else if (isBlack(pawn)) {
      return legalMovesPawnBlack(pawn, friends, foes)
  }
}

var legalMovesPawnBlack = function (pawn, friends, foes) {
  var staringSquares = [8, 9, 10, 11, 12, 13, 14, 15],
      onStartingSquare = staringSquares.indexOf(pawn) !== -1,
      legalMoves = [],
      possibleMove = pawn + 8;
      if (friends.indexOf(possibleMove) === -1 && foes.indexOf(possibleMove) === -1) {
        legalMoves.push(possibleMove);
      }
      if (onStartingSquare) {
        possibleMove = possibleMove + 8;
        if (friends.indexOf(possibleMove) === -1 && foes.indexOf(possibleMove) === -1) {
          legalMoves.push(possibleMove);
        }
      }
  return legalMoves;
}

var legalMovesPawnWhite = function (pawn, friends, foes) {
  var staringSquares = [55, 54, 53, 52, 51, 50, 49, 48];
      onStartingSquare = isWhite(pawn) && staringSquares.indexOf(pawn);
}

var isWhite = function(piece) {
  // console.log(board[piece]);
  return 'rbqknp'.indexOf(board[piece]) !== -1;
}

var isBlack = function(piece) {
  // console.log(board[piece]);
  return 'RBQKNP'.indexOf(board[piece]) !== -1;
}

var isEmpty = function(piece) {
  // console.log(board[piece]);
  return !('rbqknpRBQKNP'.indexOf(board[piece]) !== -1);
}

var isSameColor = function(p1, p2) {
  return (isWhite(p1) && isWhite(p2)) || (isBlack(p1) && isBlack(p2));
}
