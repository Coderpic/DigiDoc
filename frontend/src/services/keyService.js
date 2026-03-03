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

const API_BASE = "http://localhost:8080/api/crypto";

export const keyService = {

  async generateKeyPairAndDownloadPrivate() {

    const response = await fetch(`${API_BASE}/generate-keys`, {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Failed to generate keys");
    }

    const data = await response.json();

    // Download private key automatically
    const blob = new Blob([data.privateKey], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "private_key.pem";
    a.click();

    window.URL.revokeObjectURL(url);

    // Store public key in localStorage
    localStorage.setItem("publicKey", data.publicKey);

    return {
      publicPem: data.publicKey
    };
  },

  getStoredPublicKeyPem() {
    return localStorage.getItem("publicKey");
  }

};
