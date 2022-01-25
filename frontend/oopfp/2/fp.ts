enum Color {
  RED,
  GREEN,
  BLUE,
  YELLOW,
  BLACK,
  WHITE,
}

enum Mark {
  Ultra,
  Volga
}

interface GenericCarParams {
  owner: string;
  color: Color;
  mark: Mark;
}

interface GasolineEngineSystem {
  kind: "Gasoline"
  horsePowers: number
  fuel: number;
}

interface ElectricEngineSystem {
  kind: "Electric"
  energy: number;
  energyHorsePowers: number
}

type EngineSystem = GasolineEngineSystem | ElectricEngineSystem 

// interface UltraDrivingStyle {}
interface GenericCar {
  params: GenericCarParams;
  engine: EngineSystem;
}

type Cargoble = { 
  value: number
  maxVal: number
  kind: "kg" | "t"
}

type CargoParams = GenericCarParams & Cargoble


interface UltraTrack {
  params: CargoParams;
  engine: GasolineEngineSystem;
}

interface EnergyUltraTruck {
  params: CargoParams;
  engine: ElectricEngineSystem;
}


function engineSystemNotFount(x: EngineSystem): never {
  throw new Error("Unknown engine type: " + x.kind)
}

function accelerate(engineSystem: EngineSystem): "Ok" | "AccelerateError" {
  switch (engineSystem.kind) {
    case "Electric":
      engineSystem.energyHorsePowers -= 1
      engineSystem.energy -= 5 * engineSystem.energyHorsePowers
      return "Ok"
    case "Gasoline":
      engineSystem.fuel -= 10 * engineSystem.horsePowers
      return "Ok"
    default:
      return engineSystemNotFount(engineSystem)
  }
}

function accelerateWithCarCharacteristics(engineSystem: EngineSystem): "Ok" | "AccelerateError" {
 
 
  switch (engineSystem.kind) {
    case "Electric":
      engineSystem.energyHorsePowers -= 1
      engineSystem.energy -= 5 * engineSystem.energyHorsePowers
      return "Ok"
    case "Gasoline":
      engineSystem.fuel -= 10 * engineSystem.horsePowers
      return "Ok"
    default:
      return engineSystemNotFount(engineSystem)
  }
}

const electricTruck: EnergyUltraTruck = {
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
    value: 1,
    mark: Mark.Ultra
  }
}

console.log("before accelerate electricTruck = ", electricTruck);

accelerate(electricTruck.engine)
accelerate(electricTruck.engine)
accelerate(electricTruck.engine)

console.log("after accelerate electricTruck = ", electricTruck);


