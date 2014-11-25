//var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
//var fen = "rnbqkbnr/pppp1ppp/8/4p3/4P3/P7/1PPP1PPP/RNBQKBNR";
//var fen = "rnbqkbnr/pp1p1ppp/4p3/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R";
//var fen = "rnbqkb1r/pppppppp/5n2/4P3/8/8/PPPP1PPP/RNBQKBNR";
//var fen = "8/8/3k4/1p5p/PP4P1/8/2K5/8"
var fen = "8/8/3k4/pppppppP/PPPPPPPP/PPPPPPPP/2K5/8"
var board = [];
var legalMovesArray = [];

var fenParser = function(fen) {

  // console.log('parsing');
  for(var i = 0; i < fen.length; i++){
  // for (var i = fen.length - 1; i >= 0; i--) {
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

        if(legalMovesArray.indexOf(i) !== -1){
          this.fillStyle = 'rgba(68, 134, 250, 0.5)';
          this.fillRect( (i % 8) * this.squareSize,  Math.floor(i/8) * this.squareSize, this.squareSize, this.squareSize);
        }

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

      legalMovesArray = legalMoves(index);
      console.log(legalMovesArray);


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
    default:
      return [];
  }
}

var legalMovesPawn = function (pawn, friends, foes) {
  var white = isWhite(pawn),
      foreward = white ? -8 : +8,
      attack = white ? [-7,-9] : [7,9],
      staringSquares = white ? [55, 54, 53, 52, 51, 50, 49, 48] : [8, 9, 10, 11, 12, 13, 14, 15],
      legalMovesList = [],
      possibleMove = pawn + foreward,
      onStartingSquare = staringSquares.indexOf(pawn) !== -1,
      possibleAttackingMoves,
      attackingMoves;

      if (friends.indexOf(possibleMove) === -1 && foes.indexOf(possibleMove) === -1) {
        legalMovesList.push(possibleMove);
      }
      console.log("legalMovesList", legalMovesList)
      if (onStartingSquare && legalMovesList.length) {
        possibleMove = possibleMove + foreward;
        if (friends.indexOf(possibleMove) === -1 && foes.indexOf(possibleMove) === -1) {
          legalMovesList.push(possibleMove);
        }
      }
      possibleAttackingMoves = attack.map(function (i) {
        if(!isSameRow((pawn + i), pawn)){
          return pawn + i;
        }
      });

      attackingMoves = intersect(possibleAttackingMoves, foes);
      legalMovesList = legalMovesList.concat(attackingMoves);
      console.log(legalMovesList)

  return legalMovesList;

}

var intersect = function (array1, array2) {
  return array1.filter(function(n) {
    return array2.indexOf(n) !== -1;
  });
}

var isWhite = function(piece) {
  // console.log(board[piece]);
  return 'RBQKNP'.indexOf(board[piece]) !== -1;
}

var isBlack = function(piece) {
  // console.log(board[piece]);
  return 'rbqknp'.indexOf(board[piece]) !== -1;
}

var isEmpty = function(piece) {
  // console.log(board[piece]);
  return !('rbqknpRBQKNP'.indexOf(board[piece]) !== -1);
}

var isSameColor = function(p1, p2) {
  return (isWhite(p1) && isWhite(p2)) || (isBlack(p1) && isBlack(p2));
}

var isSameRow = function(p1, p2) {
  return (Math.floor(p1 / 8) === Math.floor(p2 / 8));
}
