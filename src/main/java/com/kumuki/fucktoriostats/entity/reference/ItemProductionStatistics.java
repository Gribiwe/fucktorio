package com.kumuki.fucktoriostats.entity.reference;

import com.kumuki.fucktoriostats.alias.PrecisionIndex;
import com.kumuki.fucktoriostats.alias.Resource;

public class ItemProductionStatistics extends Reference{

    public ItemProductionStatistics(Reference parent) {
        super(parent, "item_production_statistics");
    }

    public String getInputCount(Resource resource) {
        return String.format("%s.get_input_count(\"%s\")", getAlias(), resource.getGameName());
    }

    public String getFlowCount(Resource resource, Boolean input, PrecisionIndex precisionIndex, Boolean count) {
        return String.format("%s.get_flow_count{name = \"%s\", input=%s, precision_index = %s, count = %s}",
                getAlias(), resource.getGameName(), input.toString(), precisionIndex.getGameName(), count.toString());
    }
}
