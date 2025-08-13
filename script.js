// Grab elements from the DOM
const button = document.getElementById('getTidBtn');
const tidText = document.getElementById('tidText');

// Add click event
button.addEventListener('click', () => {
    const uriPrefix = `nbgpaytxn/`;
    // This callback URL should be publicly accessible if using https
    const callbackUrl = "https://fritzalas.github.io/App2AppWebApp/result";
    const msg = `Performing get TID V2 transaction`;
    console.log(msg)

    // Construct the deeplink URI
    const appId = "WEB_INTENT"; // replace with actual BuildConfig.APPLICATION_ID
    // Build URI
    let uri = `request/v2?&TxnType=12&appId=${appId}&callback=${encodeURIComponent(callbackUrl)}`;

    // Encode URI
    try {
        uri = uri + `&://result#Intent;scheme=https;action=android.intent.action.VIEW;package=com.mellongroup.nbgsoftpos.revised.debug;end`;
        uri = encodeURIComponent(uri);
        uri = uriPrefix + uri;
    } catch (e) {
        console.log(e.message);
    }
    console.log("uri " + uri);
    console.log("Sending txn request through intent");
    uri = `intent://` + uri + `://result#Intent;scheme=https;action=android.intent.action.VIEW;package=com.mellongroup.nbgsoftpos.revised.debug;end`;
    // Open URI using deeplink
    window.location.href = uri; // triggers Android app if installed
});
