// JavaScript, um die Bilder wegzuschieben
const gifs = document.querySelectorAll('.gif');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    gifs.forEach(gif => {
        const rect = gif.getBoundingClientRect();
        const gifCenterX = rect.left + rect.width / 2;
        const gifCenterY = rect.top + rect.height / 2;

        const distanceX = mouseX - gifCenterX;
        const distanceY = mouseY - gifCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 100) { // Wenn der Cursor näher als 100px ist
            const angle = Math.atan2(distanceY, distanceX);
            const pushDistance = 100 - distance; // Stärke des Wegstoßens
            const translateX = Math.cos(angle) * pushDistance;
            const translateY = Math.sin(angle) * pushDistance;

            gif.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
            gif.style.transform = 'translate(0, 0)';
        }
    });
});