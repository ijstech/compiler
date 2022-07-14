self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MESSAGE_IDENTIFIER') {
        console.dir(event.data);
    };
});
self.addEventListener('install', event => {
    console.dir('#install');
    self.skipWaiting();
});
self.addEventListener('activate', event => {
    console.dir('#activate');
    event.waitUntil(clients.claim());
});
self.addEventListener("fetch", event => {
    console.dir('## fetch');
    let url = new URL(event.request.url);
    if (url.pathname.startsWith("/test")) {
        event.respondWith(new Response("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="));
    };
});