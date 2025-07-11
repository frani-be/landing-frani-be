document.addEventListener('mousemove', function (e) {
    var width = window.innerWidth
    var mouseX = e.clientX
    var offset = mouseX / width * 100 - 50
    var textBackElements = document.querySelectorAll('.text-back')

    textBackElements.forEach(function(textBack) {
        textBack.style.transform = 'translateX(' + (-50 - offset) + '%)'
    })
})