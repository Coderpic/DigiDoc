package com.digitalsigverify.backend.service;

import org.springframework.stereotype.Service;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.util.Base64;

@Service
public class SignatureService {

    // SIGN the data using private key
    public String signData(byte[] data, PrivateKey privateKey) throws Exception {

        Signature signature = Signature.getInstance("SHA256withRSA");

        signature.initSign(privateKey);

        signature.update(data);

        byte[] digitalSignature = signature.sign();

        return Base64.getEncoder().encodeToString(digitalSignature);
    }

    // VERIFY the signature using public key
    public boolean verifySignature(byte[] data,
                                   String signatureStr,
                                   PublicKey publicKey) throws Exception {

        Signature signature = Signature.getInstance("SHA256withRSA");

        signature.initVerify(publicKey);

        signature.update(data);

        byte[] signatureBytes =
                Base64.getDecoder().decode(signatureStr);

        return signature.verify(signatureBytes);
    }
}
