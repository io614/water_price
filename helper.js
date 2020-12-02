let exports = {};

function my_round(n, dec_places=2) {
    return +(n).toFixed(dec_places);
}

exports.water_price = {
    first_40 : 2.74,
    beyond_40 : 3.69
}

exports.m3_breakdown = function(volume_m3, round=false) {
    let first_40 = Math.min(volume_m3, 40);
    let beyond_40 = volume_m3 - first_40;

    if (round) {
        return {first_40 : my_round(first_40),
                beyond_40 : my_round(beyond_40)} 
    }
    
    else return {first_40, beyond_40} 
}

exports.m3_cost_breakdown = function(volume_m3) {
    let m3_cost_breakdown = {}
    for ([type, volume] of Object.entries(exports.m3_breakdown(volume_m3))) {
        m3_cost_breakdown[type] = my_round(volume * exports.water_price[type]);
    }
    return m3_cost_breakdown;
}

exports.m3_to_sgd = function(volume_m3) {
    return my_round(Object.values(exports.m3_cost_breakdown(volume_m3)).reduce((acc, v)=> acc + v, 0));
}

exports.sgd_to_m3 = function(sgd) {
    let first_40_sgd = Math.min(sgd, 40*exports.water_price["first_40"]);
    let beyond_40_sgd = sgd - first_40_sgd;
    return my_round( first_40_sgd/ exports.water_price["first_40"] + beyond_40_sgd/ exports.water_price["beyond_40"]) 
}
