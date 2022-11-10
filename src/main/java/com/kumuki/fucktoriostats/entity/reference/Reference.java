package com.kumuki.fucktoriostats.entity.reference;

public abstract class Reference {
    private final String alias;
    private final Reference parent;

    public Reference(String alias) {
        this.alias = alias;
        this.parent = null;
    }

    public Reference(Reference parent, String alias) {
        this.alias = alias;
        this.parent = parent;
    }

    String getAlias() {
        if (parent == null) {
            return alias;
        } else {
            return String.format("%s.%s",parent.getAlias(), alias);
        }
    }
}
