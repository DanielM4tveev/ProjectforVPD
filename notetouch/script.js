const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearCanvas');
const saveButton = document.getElementById('saveCanvas');

let drawing = false;

function resizeCanvas() {
    canvas.width = window.innerWidth - 20; // Учитываем отступы
    canvas.height = window.innerHeight - 20;
}

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    const pos = getMousePos(event);
    ctx.moveTo(pos.x, pos.y);
    event.preventDefault(); // Предотвращаем скролл на мобильных устройствах
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(event) {
    if (!drawing) return;
    const pos = getMousePos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    event.preventDefault(); // Предотвращаем скролл на мобильных устройствах
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if (event.touches) {
        // Если событие содержит касания, берем первое касание
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
    } else {
        // Если это событие мыши
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }
    
    return { x, y };
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
}

window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', stopDrawing);

// Обработка событий тачскрина
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchcancel', stopDrawing);

clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveCanvas);

resizeCanvas(); // Изначальный размер
