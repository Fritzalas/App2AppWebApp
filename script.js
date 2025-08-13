// Grab elements from the DOM
const button = document.getElementById('getTidBtn');
const modal = document.getElementById('saleModal');
const openBtn = document.getElementById('getTidBtn2');
const cancelBtn = document.getElementById('cancelModal');
const confirmBtn = document.getElementById('confirmModal');
const amountInput = document.getElementById('saleAmount');
let json;

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex'; // show modal
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // close modal
});

confirmBtn.addEventListener('click', () => {
    const amount = amountInput.value.trim();
    if (amount && Number(amount) > 0) {
        const uriPrefix = `nbgpaytxn/`;
        // This callback URL should be publicly accessible if using https
        const callbackUrl = "https://fritzalas.github.io/App2AppWebApp/result";
        const msg = `Performing Sale V2 transaction`;
        console.log(msg)
        // Construct the deeplink URI
        const appId = "WEB_INTENT"; // replace with actual BuildConfig.APPLICATION_ID
        // Build URI
        createTestProviderDataV2();
        let tip = "0.0"
        let installments = "0"
        let email = "kosmasfrijalas@gmail.com";
        let phoneNumber = ""
        let uri = `request/v2?Amount=${amount}&CurrencyCode=EUR&TxnType=0&CashbackAmount=0&PreLoadTransaction=false&PreloadExpiration=0&isTaxFree=false&TipAmount=${tip}&Installments=${installments}&CustomerEmail=${email}&CustomerPhone=${phoneNumber}&uid=${crypto.randomUUID().toString()}&transactionName=sale&ProviderData=${json}&appId=WEB_INTENT`;
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
    } else {
        alert('Please enter a valid amount.');
    }
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

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
function createTestProviderDataV2() {
    // This is just a showcase
    // Replace with your own data
    // Replacing with your own data implies that you should first inject the private and public key (look at the token crypto proposal document)
    // So that you can produce a valid signature that will be verified from the other side (meaning the softPos app)
    const providerId = '000';
    const epwnymia_paroxoy = 'Mellon Technologies';
    const signature = "3046022100DC4350AD0ABB451701C9592D07A06EA7FB3DB021786BA72755E41D9452562833022100CE112AF4252C606862F2CB9FC1AC86FD47D2CC94DFFFFAF6CCD2FD699705E323";
    const providerDataUid = "D4F6A5F5C6123658F78369E5191ED5C9D73CB7AC";
    const mark = "400013293980417";
    const signatureTimestamp = "20231114100000";
    const netAmount = "100";
    const vatAmount = "24";
    const totalAmount = "124";
    const paidAmount = "124";
    const providerTid = "01234567";
    const providerData = {
        providerId, epwnymia_paroxoy,
        signature,
        providerDataUid, mark,
        signatureTimestamp, netAmount, vatAmount, totalAmount, paidAmount, providerTid
    }
    json = JSON.stringify(providerData);
    console.log("Json " + json);
}
