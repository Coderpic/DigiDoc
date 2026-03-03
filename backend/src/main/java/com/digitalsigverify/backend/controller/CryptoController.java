package com.digitalsigverify.backend.controller;

import com.digitalsigverify.backend.service.KeyService;
import com.digitalsigverify.backend.service.SignatureService;
import com.digitalsigverify.backend.util.KeyConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/crypto")
@CrossOrigin(origins = "http://localhost:5173")
public class CryptoController {

    @Autowired
    private KeyService keyService;

    @Autowired
    private SignatureService signatureService;

    // 1️⃣ Generate Keys
    @PostMapping("/generate-keys")
    public Map<String, String> generateKeys() throws Exception {

        KeyPair keyPair = keyService.generateKeyPair();

        String publicKey = KeyConverter.keyToString(keyPair.getPublic());
        String privateKey = KeyConverter.keyToString(keyPair.getPrivate());

        Map<String, String> response = new HashMap<>();
        response.put("publicKey", publicKey);
        response.put("privateKey", privateKey);

        return response;
    }

    // 2️⃣ Sign Document
    @PostMapping(value = "/sign", consumes = "multipart/form-data")
    public Map<String, String> signDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("privateKey") String privateKeyStr
    ) throws Exception {

        PrivateKey privateKey = KeyConverter.stringToPrivateKey(privateKeyStr);

        String signature = signatureService.signData(
                file.getBytes(),
                privateKey
        );

        Map<String, String> response = new HashMap<>();
        response.put("signature", signature);

        return response;
    }

    // 3️⃣ Verify Document
@PostMapping(value = "/verify", consumes = "multipart/form-data")
public Map<String, Object> verifyDocument(
        @RequestParam("file") MultipartFile file,
        @RequestParam("signature") String signature,
        @RequestParam("publicKey") String publicKeyStr
) throws Exception {

    PublicKey publicKey = KeyConverter.stringToPublicKey(publicKeyStr);

    byte[] fileBytes = file.getBytes();

    boolean isValid = signatureService.verifySignature(
            fileBytes,
            signature,
            publicKey
    );

    // 🔐 Generate SHA-256 hash
    MessageDigest digest = MessageDigest.getInstance("SHA-256");
    byte[] hashBytes = digest.digest(fileBytes);

    StringBuilder hexString = new StringBuilder();
    for (byte b : hashBytes) {
        String hex = Integer.toHexString(0xff & b);
        if (hex.length() == 1) hexString.append('0');
        hexString.append(hex);
    }

    Map<String, Object> response = new HashMap<>();
    response.put("valid", isValid);
    response.put("documentHash", hexString.toString());

    return response;
}
    // 4️⃣ Generate SHA-256 Hash
    @PostMapping(value = "/hash", consumes = "multipart/form-data")
    public String generateHash(@RequestParam("file") MultipartFile file) throws Exception {

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(file.getBytes());

        StringBuilder hexString = new StringBuilder();
        for (byte b : hashBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }
}

