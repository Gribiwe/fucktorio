package com.kumuki.fucktoriostats.controller;

import com.kumuki.fucktoriostats.alias.PrecisionIndex;
import com.kumuki.fucktoriostats.entity.ResourceAmount;
import com.kumuki.fucktoriostats.service.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping(value="/api")
public class ProductionController {

    @Autowired
    ProductionService productionService;

    @GetMapping("resource-list")
    public List<ResourceAmount> getResourceList(@RequestParam Boolean isInput, @RequestParam String precisionIndex) {
        return productionService.getAllFlowCount(isInput, PrecisionIndex.findByValue(precisionIndex));
    }
}
