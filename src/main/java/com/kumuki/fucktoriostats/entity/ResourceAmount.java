package com.kumuki.fucktoriostats.entity;

import com.kumuki.fucktoriostats.alias.Resource;

public class ResourceAmount {

    private Long amount;
    private String resource;

    public ResourceAmount(Long amount, Resource resource) {
        this.amount = amount;
        this.resource = resource.getGameName();
    }

    public ResourceAmount(Long amount, String resource) {
        this.amount = amount;
        this.resource = resource;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public void setResource(Resource resource) {
        this.resource = resource.getGameName();
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public Long getAmount() {
        return amount;
    }

    public String getResource() {
        return resource;
    }

    @Override
    public String toString() {
        return "ResourceAmount{" +
                "amount=" + amount +
                ", resource='" + resource + '\'' +
                '}';
    }
}
