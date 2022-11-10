package com.kumuki.fucktoriostats.entity.reference;

public class Game extends Reference {
    public Game() {
        super("game");
    }

    public PlayerForce getPlayerForce() {
        return new PlayerForce(this);
    }
}
