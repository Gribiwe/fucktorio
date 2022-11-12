package com.kumuki.fucktoriostats.entity.command;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static com.kumuki.fucktoriostats.alias.Command.GET_ITEM_STATS;

@AllArgsConstructor
@NoArgsConstructor
public class InitGetResourcesCommand implements ICommand {

    @Getter
    @Setter
    List<String> resources = new ArrayList<>();

    @SneakyThrows
    public String command() {
        return String.format(GET_ITEM_STATS.getAlias(), new ObjectMapper().writeValueAsString(this));
    }
}
