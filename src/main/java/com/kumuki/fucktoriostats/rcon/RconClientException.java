package com.kumuki.fucktoriostats.rcon;

public class RconClientException extends RuntimeException {
    public RconClientException(String message) {
        super(message);
    }

    public RconClientException(String message, Throwable cause) {
        super(message, cause);
    }
}