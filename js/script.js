const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const gameover = document.querySelector('.gameover');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

const music = document.getElementById("music");
const music2 = document.getElementById("music2");


let tanahSebelumnya;
let selesai;
let skor;

//fungsi memilih tanah secara random
function randomTanah(tanah) { //memilih tanah random
	const t = Math.floor(Math.random() * tanah.length);
	const tRandom = tanah[t];

	if (tRandom == tanahSebelumnya) {
		randomTanah(tanah);
	}
	tanahSebelumnya = tRandom;
	return tRandom;
}
//fungsi merandom waktu
function randomWaktu(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

//fungsi memunculkan tikus
function munculkanTikus() {

	const tRandom = randomTanah(tanah);
	const wRandom = randomWaktu(500, 1000); //inMs
	tRandom.classList.add('muncul');
	const Randomnum = Math.random() * 10;
	if (Randomnum > 4) {

		for (i = 0; i < tikus.length; i++) {
			if (getComputedStyle(tikus[i]).top == '100px') {
				tikus[i].className = 'tikus';
			}

		}
	}
	else {
		for (i = 0; i < tikus.length; i++) {
			if (getComputedStyle(tikus[i]).top == '100px') {
				tikus[i].className = 'cacing';
			}

		}
	}

	setTimeout(() => {
		tRandom.classList.remove('muncul');

		if (!selesai) {

			munculkanTikus();
		}
	}, wRandom);
}
//fungsi untuk memulai game
function mulai() {
	selesai = false;
	skor = 0;
	papanSkor.textContent = 0;
	music2.play();
	munculkanTikus();
}

//fungsi musik
function mulai2(){
	if(music.paused)
	{
		music.play();
	}
	else{
		music.pause();
		music.currentTime = 0;
	}
}

//fungsi untuk memukul tikus
function pukul() {

	const tikusactive = null;
	for (i = 0; i < tikus.length; i++) {
		// console.log(getComputedStyle(tikus[i]).top);
		if (getComputedStyle(tikus[i]).top < '100px') {
			if (tikus[i].className === 'cacing') {
				gameover.className = 'gameovertampil';
				selesai = true;
				setTimeout(() => {
					location.reload();
				}, 2000);
			}

		}
	}

	skor++;
	this.parentNode.classList.remove('muncul');
	papanSkor.textContent = skor;
	pop.play();
}

tikus.forEach(t => {
	t.addEventListener('click', pukul);
});