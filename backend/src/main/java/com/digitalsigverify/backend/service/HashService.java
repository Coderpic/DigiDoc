package com.digitalsigverify.backend.service;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;
// import java.util.Base64;

@Service
public class HashService {
    private String bytesToHex(byte[] hash) {
    StringBuilder hexString = new StringBuilder();
    for (byte b : hash) {
        hexString.append(String.format("%02x", b));
    }
    return hexString.toString();
}


    public String generateHash(byte[] data) throws Exception {

        // Create SHA-256 MessageDigest instance
        MessageDigest digest = MessageDigest.getInstance("SHA-256");

        // Generate hash
        byte[] hashBytes = digest.digest(data);

        // Convert to Base64 string
        return bytesToHex(hashBytes);
    }
}
