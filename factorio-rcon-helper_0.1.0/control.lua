local function print(x)
    rcon.print(game.table_to_json(x))
end

local getResourcesStat = function(resources)
    local result = { fiveSecondResourcesIn = {}, oneMinuteResourcesIn = {}, tenMinutesResourcesIn = {}, oneHourResourcesIn = {}, tenHourResourcesIn = {}, tenHourResourcesOut = {}, fiftyHourResourcesIn = {}, twoHundredFiftyHourResourcesIn = {}, thousandHourResourcesIn = {}, fiveSecondResourcesOut = {}, oneMinuteResourcesOut = {}, tenMinutesResourcesOut = {}, oneHourResourcesOut = {}, fiftyHourResourcesOut = {}, twoHundredFiftyHourResourcesOut = {}, thousandHourResourcesOut = {} }
    for i, resource in ipairs(resources) do
        local amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 0, count = false }))
        if amount ~= 0 then
            table.insert(result.fiveSecondResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 0, count = false }))
        if amount ~= 0 then
            table.insert(result.fiveSecondResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 1, count = false }))
        if amount ~= 0 then
            table.insert(result.oneMinuteResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 1, count = false }))
        if amount ~= 0 then
            table.insert(result.oneMinuteResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 2, count = false }))
        if amount ~= 0 then
            table.insert(result.tenMinutesResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 2, count = false }))
        if amount ~= 0 then
            table.insert(result.tenMinutesResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 3, count = false }))
        if amount ~= 0 then
            table.insert(result.oneHourResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 3, count = false }))
        if amount ~= 0 then
            table.insert(result.oneHourResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 4, count = false }))
        if amount ~= 0 then
            table.insert(result.tenHourResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 4, count = false }))
        if amount ~= 0 then
            table.insert(result.tenHourResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 5, count = false }))
        if amount ~= 0 then
            table.insert(result.fiftyHourResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 5, count = false }))
        if amount ~= 0 then
            table.insert(result.fiftyHourResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 6, count = false }))
        if amount ~= 0 then
            table.insert(result.twoHundredFiftyHourResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 6, count = false }))
        if amount ~= 0 then
            table.insert(result.twoHundredFiftyHourResourcesOut, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = true, precision_index = 7, count = false }))
        if amount ~= 0 then
            table.insert(result.thousandHourResourcesIn, { resource = resource, amount =  amount})
        end

        amount = tonumber(string.format("%.1f", game.forces["player"].item_production_statistics.get_flow_count { name = resource, input = false, precision_index = 7, count = false }))
        if amount ~= 0 then
            table.insert(result.thousandHourResourcesOut, { resource = resource, amount =  amount})
        end
    end
    return result
end

commands.add_command("getResourcesStat", nil, function(command)
    local parameter = game.json_to_table(command.parameter);
    print(getResourcesStat(parameter.resources))
end)