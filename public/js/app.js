'use strict'

;(function () {
  var submitButton = document.querySelector('.app-letter__seal-button')
  var inputField = document.querySelector('.app-letter__input')
  var dynSection = document.querySelector('.app-letter__random-text')
  var houseName = document.createElement('h2')
  houseName.classList = 'app-letter__answer'

  submitButton.addEventListener('click', function () {
    submitButton.src = '/images/wax-seal.png'
    getHouseName(inputField.value)
  })

  inputField.addEventListener('keydown', function () {
    submitButton.src = '/images/wax.png'
  })

  function getHouseName (username) {
    var xhr = new XMLHttpRequest()

    xhr.addEventListener("load", function () {
      if (this.status === 200) return onsuccess.call(this)
      onerror.call(this)
    })

    xhr.open('GET', '/api/house/' + inputField.value)
    xhr.send()
  }

  function onsuccess () {
    houseName.innerHTML = JSON.parse(this.responseText).house
    dynSection.innerHTML = ''
    dynSection.appendChild(houseName)
  }

  function onerror () {
    houseName.innerHTML = JSON.parse(this.responseText).error.message
    dynSection.innerHTML = ''
    dynSection.appendChild(houseName)
  }
}())

