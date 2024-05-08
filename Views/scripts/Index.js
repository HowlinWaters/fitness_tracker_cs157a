// Function to handle messages from iframes, then update the src attribute of the iframe to change displayed content
function handleMessage(event) {
    if (event.origin !== window.location.origin) return; // Ensure message comes from same origin
    document.getElementById('contentFrame').src = event.data;
}

// Event listener for messages from iframes
window.addEventListener('message', handleMessage);