package com.kumuki.fucktoriostats.alias;

import java.util.Arrays;

public enum PrecisionIndex {

    FIVE_SECONDS("defines.flow_precision_index.five_seconds"),
    ONE_MINUTE("defines.flow_precision_index.one_minute"),
    TEN_MINUTES("defines.flow_precision_index.ten_minutes"),
    ONE_HOUR("defines.flow_precision_index.one_hour"),
    TEN_HOURS("defines.flow_precision_index.ten_hours"),
    FIFTY_HOURS("defines.flow_precision_index.fifty_hours"),
    TWO_HUNDRED_FIFTY_HOURS("defines.flow_precision_index.two_hundred_fifty_hours"),
    ONE_THOUSAND_HOURS("defines.flow_precision_index.one_thousand_hours");

    private String gameName;

    PrecisionIndex(String gameName) {
        this.gameName = gameName;
    }

    public String getGameName() {
        return gameName;
    }

    public static PrecisionIndex findByValue(final String abbr){
        return Arrays.stream(values()).filter(value -> value.getGameName().equals(abbr)).findFirst().orElse(null);
    }
}
