package com.kumuki.fucktoriostats.service;

import com.kumuki.fucktoriostats.rcon.RconClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RconService {

    @Value("${game.rcon.ip}")
    private String ip;

    @Value("${game.rcon.port}")
    private String port;

    @Value("${game.rcon.password}")
    private String password;

    public String executeCommand(String command) {
        command = getCommandExecution(command);
        String response = null;

        try (RconClient client = RconClient.open("5.83.173.187", 12350, "1337228")) {
            response = client.sendCommand(command);
        } catch (Exception e) {
            e.printStackTrace();
        }

       return response.replace("\n", "");
    }

    private String getCommandExecution(String command) {
        return String.format("/silent-command rcon.print(%s)", command);
    }
}

