package com.kumuki.fucktoriostats.entity.reference;

public class PlayerForce extends Reference {

    public PlayerForce(Reference parent) {
        super(parent, "forces[\"player\"]");
    }

    public ItemProductionStatistics getItemProductionStatistics() {
        return new ItemProductionStatistics(this);
    }
}
