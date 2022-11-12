package com.kumuki.fucktoriostats.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kumuki.fucktoriostats.entity.command.ICommand;
import com.kumuki.fucktoriostats.rcon.RconClient;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("singleton")
public class RconService {

    @Value("${game.rcon.ip}")
    private String ip;

    @Value("${game.rcon.port}")
    private Integer port;

    @Value("${game.rcon.password}")
    private String password;

    private RconClient client;
    ObjectMapper mapper = new ObjectMapper();

    @SneakyThrows
    synchronized public <T> T executeCommand(ICommand command, Class<T> expectRepsone) {
        String response = this.executeCommand(command);
        return mapper.readValue(response, expectRepsone);
    }

    synchronized public String executeCommand(ICommand command) {
        String response = "";

        int count = 0;
        int maxTries = 3;
        while(true) {
            openConnection();
            try {
                response = client.sendCommand(command.command());
                break;
            } catch (Exception e) {
                if (++count == maxTries) throw e;
                System.err.println(e.getMessage()+ "- retry");
                client.close();
            }
        }

        return response.replace("\n", "");
    }

    private void openConnection() {
        if (client == null || !client.isConnected()) {
            client = RconClient.open(ip, port, password);
        }
    }

    private String makeCommandReturn(String command) {
        return String.format("/silent-command rcon.print(%s)", command);
    }
}

