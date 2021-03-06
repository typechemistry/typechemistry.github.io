function loadGoogleFonts(day) {
	var fonts = [];
	for (var i = 0; i < 3; i++) {
		fonts.push(combo[day][i][0] + ":" + combo[day][i][1]);
		fonts.push(combo[day][i][4] + ":" + combo[day][i][5]);
	}
	WebFont.load({
		google: {
			families: fonts
		}
	});
}

loadGoogleFonts(0);


$(document).ready(function () {
	$('.da').css("color", combo[0][0][3]);
	setCombo(0, 0);

	var hitCount = 0;
	var day = 0;

	function setCombo(we, co) {
		setTitleFont(combo[we][co][0], combo[we][co][1], combo[we][co][2]);
		setParagraphFont(combo[we][co][4], combo[we][co][5], combo[we][co][6]);
		setTitleColor(combo[we][co][3]);
		setParagraphColor(combo[we][co][7]);
		setBackgroundColor(combo[we][co][8]);
	}

	/**
	 * Set the Title font
	 */
	function setTitleFont(font, weight, size) {
		if (weight.length > 3)
			$('#main-article h1').css("font-style", "italic");
		else
			$('#main-article h1').css("font-style", "normal");
		weight = parseInt(weight);
		$('#title').html("<h2>" + font + "</h2>");
		$('#title').css("font-family", font);
		$('#title').css("font-style", "normal");
		$('#main-article h1').css("font-weight", weight);
		$('#main-article h1').css("font-family", font);
		$('#main-article h1').css("font-size", size + "em");
	}

	/**
	 * Set the paragraph font
	 */
	function setParagraphFont(font, weight, size) {
		if (weight.length > 3)
			$('#main-article p').css("font-style", "italic");
		else
			$('#main-article p').css("font-style", "normal");
		weight = parseInt(weight);
		$('#paragraph').html("<h2>" + font + "</h2>");
		$('#paragraph').css("font-family", font);
		$('#main-article p').css("font-weight", weight);
		$('#main-article p').css("font-family", font);
		$('#main-article p').css("font-size", size + "em");
	}

	function setTitleColor(color) {
		$('#main-article h1').css("color", color);
		$('#circle-Title .tooltip').html("<span>Title Hex: " + color + "</span>");
		$('#circle-Title').css("background-color", color);
	}

	function setParagraphColor(color) {
		$('#main-article p').css("color", color);
		$('#circle-paragraph .tooltip').html("<span>Paragraph Hex: " + color + "</span>");
		$('#circle-paragraph').css("background-color", color);
	}

	function setBackgroundColor(color) {
		$('.article-paper').css("background-color", color);
		$('#circle-background .tooltip').html("<span>Body Hex: " + color + "</span>");
		$('#circle-background').css("background-color", color);
	}

	function nextCombo(e) {
		// console.log("SBC: " + hitCount + " WC: " + day);
		e.preventDefault();
		if (hitCount == 1) {
			if (day + 1 < dayCount)
				loadGoogleFonts(day + 1);
		}
		if (hitCount < 3) {
			hitCount++;
		}
		if (hitCount == 3) {
			if (day < dayCount - 1)
				day++;
			else
				day = 0;
			hitCount = 0;
		}
		setCombo(day, hitCount);
	}

	function previousCombo(e) {
		if (day != 0 || hitCount != 0) {
			// console.log("SBC: " + hitCount + " WC: " + day);
			e.preventDefault();
			if (day - 1 >= 0)
				loadGoogleFonts(day - 1);
			if (hitCount > 0) {
				hitCount--;
			} else {
				if (day > 0)
					day--;
				else
					day = dayCount - 1;
				hitCount = 2;
			}
			setCombo(day, hitCount);
		}
	}

	//------------------------------//
	//Title change when tab inactive//
	//------------------------------//

	var originalTitle = "TypeChem • A collection of handpicked font & color combinations";
	var pairTitle = "TypeChem • " + combo[0][0][0] + " + " + combo[0][0][4];

	document.title = originalTitle;

	window.onfocus = function () {
		document.title = originalTitle;
	}

	window.onblur = function () {
		document.title = pairTitle;
	}

	$('#info-icon').click(function () {
		$('.article-paper').toggle();
		if ($(this).text() == "CLOSE") {
			$(this).text("INFO")
			$(this).css("color", "#343434");
		} else {
			$(this).text("CLOSE");
			$(this).css("color", "#F85658");
		}
	});

	function setDashTitle() {
		$('.da').css("color", combo[day][hitCount][3]);
		pairTitle = "TypeChem • " + combo[day][hitCount][0] + " + " + combo[day][hitCount][4];
	}

	$('p, h1').on('swipeleft', function (e) {
		nextCombo(e);
		setDashTitle();
	});

	$('p, h1').on('swiperight', function (e) {
		previousCombo(e);
		setDashTitle();
	});


	$(window).keydown(function (e) {
		if (e.keyCode === 39 || e.keyCode === 32) {
			nextCombo(e);
		}
		if (e.keyCode === 37) {
			previousCombo(e);
		}
		setDashTitle();
	});
});