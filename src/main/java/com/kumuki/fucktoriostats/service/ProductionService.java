package com.kumuki.fucktoriostats.service;

import com.kumuki.fucktoriostats.alias.PrecisionIndex;
import com.kumuki.fucktoriostats.alias.Resource;
import com.kumuki.fucktoriostats.entity.ResourceAmount;
import com.kumuki.fucktoriostats.entity.reference.Game;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.kumuki.fucktoriostats.alias.Command.GET_ITEM_STATS;
import static com.kumuki.fucktoriostats.alias.Command.GET_ITEM_STATS_TEMPLATE;
import static java.lang.String.format;

@Service
public class ProductionService {

    private final RconService rconService;

    private Game game = new Game();

    public ProductionService(RconService rconService) {
        this.rconService = rconService;
    }

    public List<ResourceAmount> getAllFlowCount(Boolean isInput, PrecisionIndex precisionIndex) {
        List<ResourceAmount> resourceAmounts = new ArrayList<>();

        StringBuilder resourcesToAdd = new StringBuilder();
        Resource[] resources = Resource.values();
        int length = resources.length;
        for (int i = 0; i < length; i++) {
            resourcesToAdd.append(format("\"%s\"", resources[i].getGameName()));
            if (i != length - 1) {
                resourcesToAdd.append(",");
            }
        }

        rconService.executeCommand(GET_ITEM_STATS.getGameAlias(), false);
        String res = rconService.executeCommand(
                format(GET_ITEM_STATS_TEMPLATE.getGameAlias(), resourcesToAdd, isInput, precisionIndex.getGameAlias()), true);

        System.out.println(res); //todo: fix Expected 3025 bytes but received 1456 exception. Json parcing

        return resourceAmounts;
    }
}
