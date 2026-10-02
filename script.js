// Grab elements from the DOM
// =====================================================
// DOM Elements
// =====================================================

const button = document.getElementById('getTidBtn');

const modal = document.getElementById('saleModal');

const openBtn = document.getElementById('getTidBtn2');
const saleCardBtn = document.getElementById('saleCardBtn');
const saleIrisBtn = document.getElementById('saleIrisBtn');

const cancelBtn = document.getElementById('cancelModal');
const confirmBtn = document.getElementById('confirmModal');

const amountInput = document.getElementById('saleAmount');
const tipAmount = document.getElementById('tipAmount');
const installments = document.getElementById('installments');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const modeToggle = document.getElementById('modeToggle');
const modeLabel = document.getElementById('modeLabel');

let json;


// =====================================================
// Sale V2 Payment Type
//
// null = Standard Sale
// 0    = Card
// 1    = IRIS
// =====================================================

let selectedPaymentType = null;


// =====================================================
// Open Sale Modal - Standard
// =====================================================

openBtn.addEventListener('click', function () {

    selectedPaymentType = null;

    console.log("Standard Sale selected");
    console.log("PaymentType:", selectedPaymentType);

    modal.style.display = 'flex';
});


// =====================================================
// Open Sale Modal - Card
// =====================================================

saleCardBtn.addEventListener('click', function () {

    selectedPaymentType = 0;

    console.log("Card Sale selected");
    console.log("PaymentType:", selectedPaymentType);

    modal.style.display = 'flex';
});


// =====================================================
// Open Sale Modal - IRIS
// =====================================================

saleIrisBtn.addEventListener('click', function () {

    selectedPaymentType = 1;

    console.log("IRIS Sale selected");
    console.log("PaymentType:", selectedPaymentType);

    modal.style.display = 'flex';
});


// =====================================================
// Cancel Sale Modal
// =====================================================

cancelBtn.addEventListener('click', function () {

    modal.style.display = 'none';

});


// =====================================================
// Confirm Sale
// =====================================================

confirmBtn.addEventListener('click', function () {

    const amount = amountInput.value.trim();

    if (!amount || Number(amount) <= 0) {

        alert('Please enter a valid amount.');

        return;
    }


    // =================================================
    // Determine active SoftPOS
    // =================================================

    const isCosmote = modeToggle.checked;


    const uriPrefix = isCosmote
        ? 'cosmotepaytxn/'
        : 'nbgpaytxn/';


    const packageName = isCosmote
        ? 'com.mellongroup.cosmotepos.debug'
        : 'com.mellongroup.nbgsoftpos.revised.debug';


    const callbackUrl =
        'https://fritzalas.github.io/App2AppWebApp/result';


    // =================================================
    // Create Provider Data
    // =================================================

    createTestProviderDataV2();


    // =================================================
    // Build Sale V2 request
    // =================================================

    let uri =
        `request/v2?Amount=${amount}` +
        `&CurrencyCode=EUR` +
        `&TxnType=0` +
        `&CashbackAmount=0` +
        `&PreLoadTransaction=false` +
        `&PreloadExpiration=0` +
        `&isTaxFree=false` +
        `&TipAmount=${tipAmount.value.trim()}` +
        `&Installments=${installments.value.trim()}` +
        `&CustomerEmail=${email.value.trim()}` +
        `&CustomerPhone=${phone.value.trim()}` +
        `&uid=${crypto.randomUUID().toString()}` +
        `&transactionName=sale` +
        `&ProviderData=${json}` +
        `&appId=WEB_INTENT` +
        `&callback=${encodeURIComponent(callbackUrl)}`;


    // =================================================
    // Add PaymentType
    //
    // Standard -> parameter is NOT sent
    // Card     -> PaymentType=0
    // IRIS     -> PaymentType=1
    // =================================================

    if (selectedPaymentType !== null) {

        uri += `&PaymentType=${selectedPaymentType}`;

    }


    console.log("--------------------------------");
    console.log("SALE REQUEST");
    console.log("PaymentType:", selectedPaymentType);
    console.log("URI before encoding:");
    console.log(uri);
    console.log("--------------------------------");


    // =================================================
    // Create Android Intent
    // =================================================

    try {

        uri +=
            `&://result#Intent;` +
            `scheme=https;` +
            `action=android.intent.action.VIEW;` +
            `package=${packageName};` +
            `end`;


        uri = encodeURIComponent(uri);


        uri = uriPrefix + uri;


    } catch (e) {

        console.error("Error creating URI:", e);

        return;
    }


    // =================================================
    // Final Android Intent
    // =================================================

    uri =
        `intent://` +
        uri +
        `://result#Intent;` +
        `scheme=https;` +
        `action=android.intent.action.VIEW;` +
        `package=${packageName};` +
        `end`;


    console.log("FINAL INTENT:");
    console.log(uri);


    // =================================================
    // Launch SoftPOS
    // =================================================

    window.location.href = uri;

});


// =====================================================
// Close Sale Modal when clicking outside
// =====================================================

window.addEventListener('click', function (event) {

    if (event.target === modal) {

        modal.style.display = 'none';

    }

});

// Add click event
button.addEventListener('click', () => {
    // Determine which mode is active
    const isCosmote = document.getElementById('modeToggle').checked;
    // Dynamically set URI prefix and package name
    const uriPrefix = isCosmote ? `cosmotepaytxn/` : `nbgpaytxn/`;
    const packageName = isCosmote
        ? `com.mellongroup.cosmotepos.debug`
        : `com.mellongroup.nbgsoftpos.revised.debug`;
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
        uri = uri + `&://result#Intent;scheme=https;action=android.intent.action.VIEW;package=${packageName};end`;
        uri = encodeURIComponent(uri);
        uri = uriPrefix + uri;
    } catch (e) {
        console.log(e.message);
    }
    console.log("uri " + uri);
    console.log("Sending txn request through intent");
    uri = `intent://` + uri + `://result#Intent;scheme=https;action=android.intent.action.VIEW;package=${packageName};end`;
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
    const uid = "D4F6A5F5C6123658F78369E5191ED5C9D73CB7AC";
    const mark = "400013293980417";
    const signatureTimestamp = "20231114100000";
    const netAmount = "100";
    const vatAmount = "24";
    const totalAmount = "124";
    const paidAmount = "124";
    const tid = "01234567";
    const providerData = {
        providerId, epwnymia_paroxoy,
        signature,
        uid, mark,
        signatureTimestamp, netAmount, vatAmount, totalAmount, paidAmount, tid
    }
    json = JSON.stringify(providerData);
    console.log("Json " + json);
}
// Third button modal logic
const uidModal = document.getElementById('uidModal');
document.getElementById('getTidBtn3').addEventListener('click', () => {
    uidModal.style.display = 'flex';
});
document.getElementById('cancelUIDModal').addEventListener('click', () => {
    uidModal.style.display = 'none';
});
document.getElementById('confirmUIDModal').addEventListener('click', () => {
    const originalUID = document.getElementById('originalUID').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    if (!originalUID) {
        alert('Please enter the Original UID.');
        return;
    }
    // Determine which mode is active
    const isCosmote = document.getElementById('modeToggle').checked;
    // Dynamically set URI prefix and package name
    const uriPrefix = isCosmote ? `cosmotepaytxn/` : `nbgpaytxn/`;
    const packageName = isCosmote
        ? `com.mellongroup.cosmotepos.debug`
        : `com.mellongroup.nbgsoftpos.revised.debug`;
    // This callback URL should be publicly accessible if using https
    const callbackUrl = "https://fritzalas.github.io/App2AppWebApp/result";
    const msg = `Performing Void V2 transaction`;
    console.log(msg)
    // Construct the deeplink URI
    // Build URI
    createTestProviderDataV2();
    let uri = `request/v2?TxnType=10&OriginalIdentifier=${originalUID}&CustomerEmail=${customerEmail}&CustomerPhone=${customerPhone}&uid=${crypto.randomUUID().toString()}&appId=WEB_INTENT&callback=${encodeURIComponent(callbackUrl)}`;
    // Encode URI
    try {
        uri = uri + `&://result#Intent;scheme=https;action=android.intent.action.VIEW;package=${packageName};end`;
        uri = encodeURIComponent(uri);
        uri = uriPrefix + uri;
    } catch (e) {
        console.log(e.message);
    }
    console.log("uri " + uri);
    console.log("Sending txn request through intent");
    uri = `intent://` + uri + `://result#Intent;scheme=https;action=android.intent.action.VIEW;package=${packageName};end`;
    // Open URI using deeplink
    window.location.href = uri; // triggers Android app if installed
    uidModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === uidModal) uidModal.style.display = 'none';
});
const fourthModal = document.getElementById('fourthModal');

// Open modal
document.getElementById('getTidBtn4').addEventListener('click', () => {
    fourthModal.style.display = 'flex';
});

// Cancel modal
document.getElementById('cancelFourthModal').addEventListener('click', () => {
    fourthModal.style.display = 'none';
});

// Confirm modal
document.getElementById('confirmFourthModal').addEventListener('click', () => {
    const amount = document.getElementById('fourthAmount').value.trim();
    const installments = document.getElementById('fourthInstallments').value.trim();
    const phone = document.getElementById('fourthPhone').value.trim();
    const email = document.getElementById('fourthEmail').value.trim();
    const initialTransaction = document.getElementById('fourthInitialTransaction').value.trim();

    if (!amount) {
        alert('Please enter the Amount.');
        return;
    }
    // Determine which mode is active
    const isCosmote = document.getElementById('modeToggle').checked;
    // Dynamically set URI prefix and package name
    const uriPrefix = isCosmote ? `cosmotepaytxn/` : `nbgpaytxn/`;
    const packageName = isCosmote
        ? `com.mellongroup.cosmotepos.debug`
        : `com.mellongroup.nbgsoftpos.revised.debug`;
    // This callback URL should be publicly accessible if using https
    const callbackUrl = "https://fritzalas.github.io/App2AppWebApp/result";
    const msg = `Performing Refund V2 transaction`;
    console.log(msg)
    // Construct the deeplink URI
    // Build URI
    createTestProviderDataV2();
    let uri = `request/v2?TxnType=1&CurrencyCode=EUR&Installments=${installments}&Amount=${amount}&CustomerEmail=${email}&CustomerPhone=${phone}&InitialTransaction=${initialTransaction}&ProviderData=${json}&uid=${crypto.randomUUID().toString()}&appId=WEB_INTENT&callback=${encodeURIComponent(callbackUrl)}`;
    // Encode URI
    try {
        uri = uri + `&://result#Intent;scheme=https;action=android.intent.action.VIEW;package=${packageName};end`;
        uri = encodeURIComponent(uri);
        uri = uriPrefix + uri;
    } catch (e) {
        console.log(e.message);
    }
    console.log("uri " + uri);
    console.log("Sending txn request through intent");
    uri = `intent://` + uri + `://result#Intent;scheme=https;action=android.intent.action.VIEW;package=${packageName};end`;
    // Open URI using deeplink
    window.location.href = uri; // triggers Android app if installed
    fourthModal.style.display = 'none';
});

// Close modal when clicking outside
function updateMode() {
    if (modeToggle.checked) {
        modeLabel.textContent = 'Payzy SoftPos';
        document.body.style.background =
            'linear-gradient(-45deg, #00c6ff, #0072ff, #00c6ff, #0072ff)';
    } else {
        modeLabel.textContent = 'NBG SoftPos';
        document.body.style.background =
            'linear-gradient(-45deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)';
    }
}

modeToggle.addEventListener('change', updateMode);

// Set initial mode on page load
updateMode();