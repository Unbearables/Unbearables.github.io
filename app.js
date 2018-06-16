(function(){
		
	var hadanePole;
	var pocetHadani = 0;
	var zivoty = 12;
	var odpovediArr = [];
	var kategorie = $('.kategorie__box');

	
	function vygenerujSlovo (array){
		return array[Math.floor(Math.random()*array.length)];
	}

	function konecHry() {
		document.getElementById("letter").disabled = true;
		document.getElementById("hra").style.display = "none";
		var popup = document.getElementById("popup");
		popup.style.display = "block";
		popup.addEventListener("click", function(){
			location.reload();
		})
		
	}

	function startUp(kategorie) {

		//generace random slova
		var randomSlovo = vygenerujSlovo(kategorie);

		for (var i=0; i < randomSlovo.length; i++) {
			odpovediArr[i] = "_";
		}
		hadanePole = odpovediArr.join(" ");

		var letter = document.getElementById("letter");
		var hadejbtn = document.getElementById('hadejbtn');
		
		hadejbtn.addEventListener("click", function(){
			hadej(randomSlovo);
		});
		
		letter.addEventListener("keyup", function(event){
			event.preventDefault();
			if (event.keyCode === 13) {
				hadej(randomSlovo);
			}
		});

		//zapsání _ do "answer"
		document.getElementById("answer").innerHTML = hadanePole;	
		
	}



	//po odselání písmena
	function hadej(randomSlovo) {
		var pismeno = document.getElementById("letter").value.toUpperCase();		
		if (pismeno.length > 0) {
			for (var i=0; i < randomSlovo.length; i++) {
				if (randomSlovo[i] === pismeno) {
					odpovediArr[i] = pismeno;
				}
			}

			//změna obrázku
			if (!odpovediArr.includes(pismeno)) {
				zivoty--;
				document.getElementById("opratkaIMG").src = "./obr/"+ zivoty +".png";
				
			}

			pocetHadani++;
			document.getElementById("stat").innerHTML = "Životy: " + zivoty;
			document.getElementById("answer").innerHTML = odpovediArr.join(" ");
			document.getElementById("letter").value = '';
			document.getElementById("letter").focus();
		}
				
		//VÝHRA = jestli v hádaném slovu uŽ nenÍ "_"
		if (!odpovediArr.includes("_")) {
			konecHry();

			//zkontroluje jestli slovo už bylo hádáno (jestli ne tak vrátí null)
			if (localStorage.getItem(randomSlovo) === null){
				localStorage.setItem(randomSlovo, pocetHadani);				
				document.getElementById("message").innerHTML = "Vyhrál jsi v " + pocetHadani + " krocích.";
			} 
			
			//jestli ano a hráč udělal HS tak se skóre přepíše
			else {
				if (JSON.parse(localStorage.getItem(randomSlovo)) > pocetHadani) {
					localStorage.setItem(randomSlovo, pocetHadani);					
					document.getElementById("message").innerHTML = "Vyhrál jsi. Nový rekord: " + pocetHadani;
				}
			}

			document.getElementById("konecSlovo").innerHTML = "Slovo: " + randomSlovo;
			document.getElementById("highScore").innerHTML = "Nejlepší skóre: " + localStorage.getItem(randomSlovo);
			document.getElementById("message").innerHTML = "Vyhrál jsi v " + pocetHadani + " krocích.";			
		}
		
		//PROHRA = vyčerpání životů 
		if (zivoty == 0) {
			konecHry();
			if(localStorage.getItem(randomSlovo) === null) {
				document.getElementById("highScore").innerHTML = "Zatím nemáš nejlepší skóre.";
			}
			else {
				document.getElementById("highScore").innerHTML = "Nejlepší skóre: " + localStorage.getItem(randomSlovo);
			}
			document.getElementById("message").innerHTML = "Byl jsi pověšen.";
			document.getElementById("konecSlovo").innerHTML = "Slovo: " + randomSlovo;						
		}		
	}

	kategorie.on('click', function(){
		$('.kategorie').hide();
		var vybranaKategorie = $( this ).data('val');
		startUp(slovnik[vybranaKategorie]);
	})

})();
