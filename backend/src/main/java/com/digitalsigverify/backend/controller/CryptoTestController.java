package com.digitalsigverify.backend.controller;

import com.digitalsigverify.backend.service.HashService;
import com.digitalsigverify.backend.service.KeyService;
import com.digitalsigverify.backend.service.SignatureService;
import com.digitalsigverify.backend.util.KeyConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.KeyPair;

@RestController
@RequestMapping("/test")
public class CryptoTestController {

    @Autowired
    private KeyService keyService;
    @Autowired
    private HashService hashService;

     @Autowired
    private SignatureService signatureService;

    @GetMapping("/generate-keys")
    public String generateKeys() throws Exception {

        KeyPair keyPair = keyService.generateKeyPair();

        String publicKey = KeyConverter.keyToString(keyPair.getPublic());
        String privateKey = KeyConverter.keyToString(keyPair.getPrivate());

        return "Public Key:\n" + publicKey +
               "\n\nPrivate Key:\n" + privateKey;
    }

    @PostMapping(value = "/hash", consumes = "multipart/form-data")
    public String generateHash(@RequestParam("file") MultipartFile file) throws Exception {

        System.out.println("File received: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize());

        byte[] fileBytes = file.getBytes();

        return hashService.generateHash(fileBytes);
    }

    @PostMapping("/sign")
    public String signFile(@RequestParam("file") MultipartFile file) throws Exception {

        KeyPair keyPair = keyService.generateKeyPair();

        byte[] fileBytes = file.getBytes();

        String signature = signatureService.signData(
                fileBytes,
                keyPair.getPrivate()
        );

        return "Signature:\n" + signature +
            "\n\nVerification:\n" +
            signatureService.verifySignature(
                    fileBytes,
                    signature,
                    keyPair.getPublic()
            );
    }

}
