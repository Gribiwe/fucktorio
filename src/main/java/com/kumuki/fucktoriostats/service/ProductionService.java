package com.kumuki.fucktoriostats.service;

import com.kumuki.fucktoriostats.alias.PrecisionIndex;
import com.kumuki.fucktoriostats.alias.Resource;
import com.kumuki.fucktoriostats.entity.ResourceAmount;
import com.kumuki.fucktoriostats.entity.reference.Game;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductionService {

    private final RconService rconService;

    private Game game = new Game();

    public ProductionService(RconService rconService) {
        this.rconService = rconService;
    }

    public List<ResourceAmount> getAllFlowCount(Boolean isInput, PrecisionIndex precisionIndex) {
        List<ResourceAmount> resourceAmounts = new ArrayList<>();

        Resource[] resources = Resource.values();
        for (int i = 0; i < resources.length; i++) {

        }

        rconService.executeCommand()

        return resourceAmounts;
    }
}
