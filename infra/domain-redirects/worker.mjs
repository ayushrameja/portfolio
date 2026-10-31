const destinations = {
  "www.ayush.im": ["ayush.im", 308],
  "www.2025.ayush.im": ["2025.ayush.im", 307],
  "www.qrmint.ayush.im": ["qrmint.ayush.im", 308],
  "ayushrameja.com": ["ayush.im", 308],
  "www.ayushrameja.com": ["ayush.im", 308],
  "2025.ayushrameja.com": ["2025.ayush.im", 307],
  "www.2025.ayushrameja.com": ["2025.ayush.im", 307],
};

export default {
  fetch(request) {
    const url = new URL(request.url);
    const destination = destinations[url.hostname] || (
      url.hostname.endsWith(".ayushrameja.com")
        ? [url.hostname.replace(/\.ayushrameja\.com$/, ".ayush.im"), 308]
        : undefined
    );
    if (!destination) {
      return new Response("Portfolio domain redirects", { status: 200 });
    }
    url.protocol = "https:";
    url.hostname = destination[0];
    url.port = "";
    return Response.redirect(url.toString(), destination[1]);
  },
};
