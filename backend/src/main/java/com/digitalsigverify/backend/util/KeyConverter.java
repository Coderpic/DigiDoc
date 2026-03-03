package com.digitalsigverify.backend.util;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class KeyConverter {

    // Convert Key to String
    public static String keyToString(java.security.Key key) {
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

    // Convert String to PrivateKey
    public static PrivateKey stringToPrivateKey(String keyStr) throws Exception {

        byte[] keyBytes = Base64.getDecoder().decode(keyStr);

        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        return keyFactory.generatePrivate(spec);
    }

    // Convert String to PublicKey
    public static PublicKey stringToPublicKey(String keyStr) throws Exception {

        byte[] keyBytes = Base64.getDecoder().decode(keyStr);

        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        return keyFactory.generatePublic(spec);
    }
}
