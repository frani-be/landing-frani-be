let counter = 1;
const cantImages = 9;
const duration = 13000; // La duración total de la animación es 13 segundos
const initialDelay = 2000; // El span 1 tiene un delay de -8s, lo que significa que entra a los 5s
const fadeDuration = 500; // Duración de la transición de opacidad

const mainImage = document.getElementById('main-image');

// Función para cambiar la imagen
function changeImage() {
  counter = counter % cantImages + 1;
  mainImage.style.opacity = 0; // Comienza el efecto de desvanecimiento

  // Cambia la imagen después de que la opacidad llegue a 0
  setTimeout(() => {
    mainImage.src = `assets/images/image_frani-${counter}.png`;
    mainImage.style.opacity = 1; // Vuelve a establecer la opacidad a 1 para mostrar la nueva imagen
  }, fadeDuration); 
  
}

// Inicializa la primera imagen visible y luego cambia cada 13 segundos
mainImage.style.opacity = 1;
// Ajusta el primer cambio para que coincida con la animación del primer span
setTimeout(() => {
  changeImage();
  setInterval(changeImage, duration);
}, duration - initialDelay); // Comienza el primer cambio de imagen cuando el primer span hace slideRight
