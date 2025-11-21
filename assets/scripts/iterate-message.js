// Configuración dinámica de la animación de mensajes iterativos
document.addEventListener('DOMContentLoaded', function() {
    const iterateMessage = document.querySelector('.iterate-message');
    
    if (!iterateMessage) return;
    
    const messages = iterateMessage.querySelectorAll('span');
    const messageCount = messages.length;
    
    if (messageCount === 0) return;
    
    // Duración por mensaje (en segundos)
    const durationPerMessage = 4;
    
    // Duración total de la animación
    const totalDuration = messageCount * durationPerMessage;
    
    // Aplicar la duración total y los delays a cada mensaje
    messages.forEach((message, index) => {
        // Calcular el delay para cada mensaje
        // El último mensaje empieza en 0s, el penúltimo en -4s, etc.
        const delay = -(messageCount - 1 - index) * durationPerMessage;
        
        message.style.setProperty('--animation-duration', `${totalDuration}s`);
        message.style.setProperty('--animation-delay', `${delay}s`);
    });
});
