package com.kumuki.fucktoriostats.alias;

public enum Command {
    GET_ITEM_STATS("/sc getResources_FS = function(resources, isInput, precision) local result = {} for i, resource in ipairs(resources) do result[resource] = game.forces[\"player\"].item_production_statistics.get_flow_count{name = resource, input=isInput, precision_index = precision, count = false} end return game.table_to_json(result)end"),

    // getResources_FS({"copper-plate", "copper-ore"}, true, defines.flow_precision_index.five_seconds)
    GET_ITEM_STATS_TEMPLATE("getResources_FS({\"%s\"}, %s, %s)");

    private String gameAlias;

    Command(String gameAlias) {
        this.gameAlias = gameAlias;
    }

    public String getGameName() {
        return gameAlias;
    }
}
