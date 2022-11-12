package com.kumuki.fucktoriostats.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class ResourceAmount {

    @Setter
    @Getter
    private Float amount;

    @Setter
    @Getter
    private String resource;

}
