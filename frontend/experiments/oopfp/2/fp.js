var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLUE"] = 2] = "BLUE";
    Color[Color["YELLOW"] = 3] = "YELLOW";
    Color[Color["BLACK"] = 4] = "BLACK";
    Color[Color["WHITE"] = 5] = "WHITE";
})(Color || (Color = {}));
function engineSystemNotFount(x) {
    throw new Error("Unknown engine type: " + x.kind);
}
function accelerate(engineSystem) {
    switch (engineSystem.kind) {
        case "Electric":
            engineSystem.energyHorsePowers -= 1;
            engineSystem.energy -= 5 * engineSystem.energyHorsePowers;
            return "Ok";
        case "Gasoline":
            engineSystem.fuel -= 10 * engineSystem.horsePowers;
            return "Ok";
        default:
            return engineSystemNotFount(engineSystem);
    }
}
var electricTruck = {
    engine: {
        energy: 10,
        energyHorsePowers: 100,
        kind: "Electric"
    },
    params: {
        color: Color.BLUE,
        kind: "t",
        maxVal: 100,
        owner: "Михаил",
        value: 1
    }
};
console.log("before accelerate electricTruck = ", electricTruck);
accelerate(electricTruck.engine);
accelerate(electricTruck.engine);
accelerate(electricTruck.engine);
console.log("after accelerate electricTruck = ", electricTruck);
