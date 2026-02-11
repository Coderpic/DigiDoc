const PUB_KEY = "dsv_public_key_pem";

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function wrapPem(base64, label) {
  const lines = base64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----\n`;
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const keyService = {
  getStoredPublicKeyPem() {
    return localStorage.getItem(PUB_KEY) || "";
  },

  async generateKeyPairAndDownloadPrivate() {
    if (!window.crypto?.subtle) {
      throw new Error("WebCrypto not available in this browser");
    }

    // For signatures use RSA-PSS with SHA-256
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-PSS",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"]
    );

    const spki = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const pkcs8 = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    const publicPem = wrapPem(arrayBufferToBase64(spki), "PUBLIC KEY");
    const privatePem = wrapPem(arrayBufferToBase64(pkcs8), "PRIVATE KEY");

    localStorage.setItem(PUB_KEY, publicPem);

    // Download private key (NEVER store in DB later)
    downloadText("digitalsigverify-private-key.pem", privatePem);

    return { publicPem, privatePemPreview: privatePem.slice(0, 140) + "..." };
  },
};