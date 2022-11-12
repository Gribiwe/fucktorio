package com.kumuki.fucktoriostats.broadcast;

import com.kumuki.fucktoriostats.service.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ProductionBroadcast {

    @Autowired
    private SimpMessagingTemplate brokerMessagingTemplate;

    @Autowired
    private ProductionService productionService;

    @Async
    @Scheduled(fixedRate = 400)
    public void refreshFiveSeconds() {
        this.brokerMessagingTemplate.convertAndSend("/topic/resource",  productionService.getAllFlowCount());
    }
}
