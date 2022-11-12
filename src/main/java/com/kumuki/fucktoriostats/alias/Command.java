package com.kumuki.fucktoriostats.alias;

public enum Command {

    // getResources_FS({"copper-plate", "copper-ore"}, true, defines.flow_precision_index.five_seconds)

    GET_ITEM_STATS("/getResourcesStat %s"); // json object {resources: []}

    private String alias;

    Command(String alias) {
        this.alias = alias;
    }

    public String getAlias() {
        return alias;
    }
}
