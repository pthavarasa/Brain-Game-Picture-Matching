//alert('coucou');
//console.log('hi');

const trouve = 100;
const pasTrouve = 20;
var pairConsecs = 0;
var score, active, carte1, carte2;
var arrayImagesIds = [];
var arrayImagesTrouves = [];
var arrayImages = {};
var audioFalse = new Audio('sounds/false.wav');
var audioTrue = new Audio('sounds/true.wav');
var audioCardFlip = new Audio('sounds/card_flip.wav');

var initGame = function(){
    document.getElementById('resultat').style.display = 'none';
    document.getElementById('jeu').style.display = 'block';
	document.getElementById('nameInput').style.display = 'none';
    paireConsecs = 0;
    arrayImagesIds[0] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    arrayImagesIds[1] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    arrayImagesIds[0] = shuffleArray(arrayImagesIds[0]);
    arrayImagesIds[1] = shuffleArray(arrayImagesIds[1]);
    active = true;
    carte1 = null;
    carte2 = null;
    score = 0;
    arrayImagesTrouves = [];
    document.getElementById('score').innerHTML = score;
    document.getElementById('score2').innerHTML = score;
    initCartes();
}

var shuffleArray = function(array){
    for(var i = array.length - 1; i > 0; i--){
        var j = Math.floor(Math.random()*(i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var initCartes = function(){
    var table = document.getElementById('tabBody');
    var cpt = 0;
    for( i = 0; i < table.children.length; i++){
        var tr = table.children[i];
        for( j = 0; j < tr.children.length; j+=2){
            tr.children[j].children[0].id = encode(arrayImagesIds[0][cpt]+'a');
            tr.children[j+1].children[0].id = encode(arrayImagesIds[1][cpt]+'b');
            arrayImages[arrayImagesIds[0][cpt]+'a'] = 'images/'+arrayImagesIds[0][cpt]+'a.jpg';
            arrayImages[arrayImagesIds[1][cpt]+'b'] = 'images/'+arrayImagesIds[1][cpt]+'b.jpg';
            tr.children[j].children[0].src='images/back.jpg';
            tr.children[j+1].children[0].src='images/back.jpg';
            cpt++;
        }
    }
}


var id2Number = function(carteId){
	if(carteId.length == 2){
		return carteId[0];
	}else if(carteId.length == 3){
		return carteId[0]+carteId[1].toString();
	}
}

var carteDejaTrouver = function(carteId){
	if(arrayImagesTrouves.indexOf(carteId) === -1) {
		return 0;
	}
	else {
		return 1;
	}
}
/*
var tourne = function(val){
    //console.log(document.getElementById(val.id).id);
    //document.getElementById(val.id).src = './images/'+document.getElementById(val.id).id+'.jpg';
    //console.dir(arrayImages);
    //console.log(val.id);
	var id = decode(val.id);
	if(carteDejaTrouver(val.id))return 0;
	pairConsecs += 1;
	if(pairConsecs === 1){
		carte1 = val.id;
		document.getElementById(val.id).src = arrayImages[id];
	}else if(pairConsecs === 2 && val.id !== carte1){
		carte2 = val.id;
		document.getElementById(val.id).src = arrayImages[id];
		if(id2Number(decode(carte1)) === id2Number(decode(carte2))){
			score += trouve;
			arrayImagesTrouves.push(carte1);
			arrayImagesTrouves.push(carte2);
			document.getElementById('score').innerHTML = score;
			document.getElementById(carte1).style.boxShadow = '1px 1px 12px #28ff89';
			document.getElementById(carte2).style.boxShadow = '1px 1px 12px #28ff89';
			audioTrue.play();
			if(arrayImagesTrouves.length == 30){
				document.getElementById('jeu').style.display = 'none';
				document.getElementById('resultat').style.display = 'block';
				document.getElementById('nameInput').style.display = 'block';
				document.getElementById('score2').innerHTML = score;
			}
		}else{
			document.getElementById(carte1).style.boxShadow = '1px 1px 12px #f44242';
			document.getElementById(carte2).style.boxShadow = '1px 1px 12px #f44242';
			audioFalse.play();
		}
	}else if(pairConsecs === 3){
		document.getElementById(carte1).style.boxShadow = '1px 1px 12px #555';
		document.getElementById(carte2).style.boxShadow = '1px 1px 12px #555';
		if(id2Number(decode(carte1)) === id2Number(decode(carte2))){
			pairConsecs = 1;
		}else{
			document.getElementById(carte1).src = 'images/back.jpg';
			document.getElementById(carte2).src = 'images/back.jpg';
			score -= pasTrouve;
			document.getElementById('score').innerHTML = score;
			carte1 = val.id;
			document.getElementById(val.id).src = arrayImages[id];
			pairConsecs = 1;
		}
	}else{
		pairConsecs = 1;
	}
}
*/
var tourne = function(val){
	var id = decode(val.id);
	if(carteDejaTrouver(val.id))return 0;
	if(pairConsecs === 0){
		if(carte1 !== null && carte2 !== null){
			if(id2Number(decode(carte1)) === id2Number(decode(carte2))){
				document.getElementById(carte1).style.boxShadow = '1px 1px 12px #555';
				document.getElementById(carte2).style.boxShadow = '1px 1px 12px #555';
			}else{
				document.getElementById(carte1).style.boxShadow = '1px 1px 12px #555';
				document.getElementById(carte2).style.boxShadow = '1px 1px 12px #555';
				document.getElementById(carte1).src = 'images/back.jpg';
				document.getElementById(carte2).src = 'images/back.jpg';
			}
		}
		carte1 = val.id;
		document.getElementById(val.id).src = arrayImages[id];
		audioCardFlip.play();
		pairConsecs = 1;
	}else if(pairConsecs === 1 && val.id !== carte1){
		carte2 = val.id;
		document.getElementById(val.id).src = arrayImages[id];
		audioCardFlip.play();
		if(id2Number(decode(carte1)) === id2Number(decode(carte2))){
			score += trouve;
			arrayImagesTrouves.push(carte1);
			arrayImagesTrouves.push(carte2);
			document.getElementById('score').innerHTML = score;
			document.getElementById(carte1).style.boxShadow = '1px 1px 12px #28ff89';
			document.getElementById(carte2).style.boxShadow = '1px 1px 12px #28ff89';
			audioTrue.play();
			if(arrayImagesTrouves.length == 30){
				document.getElementById('jeu').style.display = 'none';
				document.getElementById('resultat').style.display = 'block';
				document.getElementById('nameInput').style.display = 'block';
				document.getElementById('score2').innerHTML = score;
			}
		}else{
			score -= pasTrouve;
			document.getElementById('score').innerHTML = score;
			document.getElementById(carte1).style.boxShadow = '1px 1px 12px #f44242';
			document.getElementById(carte2).style.boxShadow = '1px 1px 12px #f44242';
			audioFalse.play();
		}
		pairConsecs = 0;
	}
}

function storeScore(useName, userScore){
	var data = {
		name: useName,
		score: userScore
	};
	$.post("send.php", data);
}

var saveScore = function(){
	var ch1 = document.forms["uname"]["ch1"].value;
	storeScore(ch1,score);
	document.getElementById('nameInput').style.display = 'none';
}

var encode = function(data){
	return CryptoJS.AES.encrypt(data, "Secret Passphrase");
}

var decode = function(data){
	return CryptoJS.AES.decrypt(data, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
}












