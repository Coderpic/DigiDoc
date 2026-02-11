package com.digitalsigverify.backend.util;

import java.security.Key;
import java.util.Base64;

public class KeyConverter {

    public static String keyToString(Key key) {
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }
}
