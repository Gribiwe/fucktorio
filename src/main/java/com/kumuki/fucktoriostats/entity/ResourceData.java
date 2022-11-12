package com.kumuki.fucktoriostats.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResourceData {

    @Getter
    @Setter
    List<ResourceAmount> fiveSecondResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> fiveSecondResourcesOut = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> oneMinuteResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> oneMinuteResourcesOut = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> tenMinutesResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> tenMinutesResourcesOut = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> oneHourResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> oneHourResourcesOut = new ArrayList<>();


    @Getter
    @Setter
    List<ResourceAmount> tenHourResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> tenHourResourcesOut = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> fiftyHourResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> fiftyHourResourcesOut = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> twoHundredFiftyHourResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> twoHundredFiftyHourResourcesOut = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> thousandHourResourcesIn = new ArrayList<>();

    @Getter
    @Setter
    List<ResourceAmount> thousandHourResourcesOut = new ArrayList<>();
}
