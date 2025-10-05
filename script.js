const tabForm = document.getElementById('tab-form')
const tabCarousel = document.getElementById('tab-carousel')
const formSection = document.getElementById('form-section')
const carouselSection = document.getElementById('carousel-section')

function showFormTab() {
	tabForm.classList.add('active')
	tabCarousel.classList.remove('active')
	formSection.classList.remove('hidden')
	carouselSection.classList.add('hidden')
}

function showCarouselTab() {
	tabCarousel.classList.add('active')
	tabForm.classList.remove('active')
	carouselSection.classList.remove('hidden')
	formSection.classList.add('hidden')
}

tabForm.addEventListener('click', showFormTab)
tabCarousel.addEventListener('click', showCarouselTab)

const form = document.getElementById('registrationForm')
function showError(name, message) {
	var el = document.querySelector('small.error[data-for="' + name + '"]')
	if (el) el.textContent = message || ''
}

function isNameValid(s) { return /^[A-Za-z ]{2,}$/.test(s) }
function isEmailValid(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) }
function isContactValid(s) { return /^\d{10}$/.test(s) }
function isPasswordValid(s) {
	if (s.length < 6) return false
	if (!/[A-Z]/.test(s)) return false
	if (!/[a-z]/.test(s)) return false
	if (!/\d/.test(s)) return false
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(s)) return false
	return true
}

form.addEventListener('submit', function (e) {
	e.preventDefault()
	var ok = true
	var data = new FormData(form)
	var name = (data.get('name') || '').trim()
	var email = (data.get('email') || '').trim()
	var contact = (data.get('contact') || '').trim()
	var gender = (data.get('gender') || '').trim()
	var password = data.get('password') || ''
	var confirm = data.get('confirmPassword') || ''

	if (!name) { showError('name', 'Name is required'); ok = false }
	else if (!isNameValid(name)) { showError('name', 'Invalid name'); ok = false }
	else showError('name', '')

	if (!email) { showError('email', 'Email is required'); ok = false }
	else if (!isEmailValid(email)) { showError('email', 'Invalid email'); ok = false }
	else showError('email', '')

	if (!contact) { showError('contact', 'Contact is required'); ok = false }
	else if (!isContactValid(contact)) { showError('contact', 'Contact must be 10 digits'); ok = false }
	else showError('contact', '')

	if (!gender) { showError('gender', 'Select gender'); ok = false }
	else showError('gender', '')

	if (!password) { showError('password', 'Password is required'); ok = false }
	else if (!isPasswordValid(password)) { showError('password', 'Password not strong enough'); ok = false }
	else showError('password', '')

	if (!confirm) { showError('confirmPassword', 'Confirm password'); ok = false }
	else if (confirm !== password) { showError('confirmPassword', 'Passwords do not match'); ok = false }
	else showError('confirmPassword', '')

	var successEl = document.getElementById('formSuccess')
	if (!ok) { successEl.textContent = ''; return }
	successEl.textContent = 'Registration successful (not sent)'
	form.reset()
})

var slidesEl = document.getElementById('slides')
var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'))
var prevBtn = document.getElementById('prevBtn')
var nextBtn = document.getElementById('nextBtn')
var currentIndex = 0

function goTo(index) {
	var n = slides.length
	if (!n) return
	if (index < 0) index = n - 1
	if (index >= n) index = 0
	currentIndex = index
	slidesEl.style.transform = 'translateX(-' + (currentIndex * 100) + '%)'
	updateRating()
}

prevBtn.addEventListener('click', function () { goTo(currentIndex - 1) })
nextBtn.addEventListener('click', function () { goTo(currentIndex + 1) })

var stars = Array.prototype.slice.call(document.querySelectorAll('.star'))//*
var ratingInfo = document.getElementById('ratingInfo')
var ratings = {}

function setHoverStars(upto) {
	for (var i = 0; i < stars.length; i++) {
		var v = Number(stars[i].getAttribute('data-value'))
		if (v <= upto) stars[i].classList.add('hovered')
		else stars[i].classList.remove('hovered')
	}
}

for (var i = 0; i < stars.length; i++) {
	(function (star) {
		star.addEventListener('mouseover', function () {
			var v = Number(star.getAttribute('data-value'))
			setHoverStars(v)
		})
		star.addEventListener('mouseout', function () {
			updateRating()
		})
		star.addEventListener('click', function () {
			var v = Number(star.getAttribute('data-value'))
			var key = String(currentIndex)
			var prev = ratings[key] || 0
			if (prev === v) {
				delete ratings[key]
			} else {
				ratings[key] = v
			}
			updateRating()
		})
	})(stars[i])
}

function updateRating() {
	var key = String(currentIndex)
	var r = ratings[key] || 0
	for (var j = 0; j < stars.length; j++) {
		var v = Number(stars[j].getAttribute('data-value'))
		if (v <= r) {
			stars[j].classList.add('selected')
		} else {
			stars[j].classList.remove('selected')
		}
		stars[j].classList.remove('hovered')
	}
	if (r) ratingInfo.textContent = 'Rated ' + r + '/5 for slide ' + (currentIndex + 1)
	else ratingInfo.textContent = 'No rating yet'
}


goTo(0)