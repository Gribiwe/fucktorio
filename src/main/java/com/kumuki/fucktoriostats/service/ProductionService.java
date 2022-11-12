package com.kumuki.fucktoriostats.service;

import com.kumuki.fucktoriostats.alias.Resource;
import com.kumuki.fucktoriostats.entity.ResourceData;
import com.kumuki.fucktoriostats.entity.command.InitGetResourcesCommand;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.lang.System.currentTimeMillis;

@Service
@Scope("singleton")
public class ProductionService {

    private final RconService rconService;

    public ProductionService(RconService rconService) {
        this.rconService = rconService;
    }

    public ResourceData getAllFlowCount() {
        long start = currentTimeMillis();
        List<String> resources = Stream.of(Resource.values()).map(Resource::getGameName).collect(Collectors.toList());
        ResourceData  resourceAmounts = rconService.executeCommand(new InitGetResourcesCommand(resources), ResourceData.class);
        System.out.println("batch ping: "+ (currentTimeMillis()-start));
        return resourceAmounts;
    }
}
