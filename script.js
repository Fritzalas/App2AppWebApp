// Grab elements from the DOM
const button = document.getElementById('getTidBtn');
const tidText = document.getElementById('tidText');

// Add click event
button.addEventListener('click', () => {
    tidText.textContent = 'tid:64999976';

    const uriPrefix = `nbgpaytxn/`;

    const msg = `Performing get TID V2 transaction`;
    console.log(msg)

    // Construct the deeplink URI
    const appId = "WEB_INTENT"; // replace with actual BuildConfig.APPLICATION_ID
    let uri = `request/v2?&TxnType=12&appId=${appId}`;

    // Encode URI
    try {
        uri = encodeURIComponent(uri);
        uri = uriPrefix + uri;
    } catch (e) {
        console.log(e.message);
    }
    console.log("uri " + uri);
    console.log("Sending txn request through intent");
    uri = `intent://` + uri
    // Open URI using deeplink
    window.location.href = uri; // triggers Android app if installed
});
