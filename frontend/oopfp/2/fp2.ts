namespace FP2 {
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
    Volga,
  }

  interface GenericVehicleParams {
    owner: string;
    color: Color;
    mark: Mark;
  }

  interface GasolineEngineSystem {
    engineKind: "Gasoline";
    horsePowers: number;
    fuel: number;
  }

  interface ElectricEngineSystem {
    engineKind: "Electric";
    energy: number;
    energyHorsePowers: number;
  }

  type EngineSystem = GasolineEngineSystem | ElectricEngineSystem;

  // interface UltraDrivingStyle {}
  interface GenericVehicle {
    params: GenericVehicleParams;
    engine: EngineSystem;
  }

  type Cargoble = {
    value: number;
    maxVal: number;
    weightKind: "kg" | "t";
  };

  type Transportable = {
    seats: number;
  };

  type FlightParams = {
    flowAngle: number;
  };

  type CargoParams = GenericVehicleParams & Cargoble;

  type PlaneParams = GenericVehicleParams & FlightParams;
  type CargoPlaneParams = GenericVehicleParams & FlightParams & Cargoble;
  type AccelerateParams = FlightParams & Cargoble & EngineSystem

  interface Plane {
    params: PlaneParams;
    engine: EngineSystem;
  }


  interface UltraTrack {
    params: CargoParams;
    engine: GasolineEngineSystem;
  }

  interface EnergyUltraTruck {
    params: CargoParams;
    engine: ElectricEngineSystem;
  }

  function engineSystemNotFount(x: EngineSystem): never {
    throw new Error("Unknown engine type: " + x.engineKind);
  }

  function accelerate(engineSystem: EngineSystem): "Ok" | "AccelerateError" {
    switch (engineSystem.engineKind) {
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

  function accelerateWithVehicleCharacteristics(
    acceleratable: AccelerateParams
  ) {
    const maxVal = acceleratable.weightKind === "t" && acceleratable.value > 10 || 
      acceleratable.weightKind === "kg" && acceleratable.value > 10 * 1000
    const penalty = maxVal? 10: 5

    switch (acceleratable.engineKind) {
      case "Electric":
        acceleratable.energyHorsePowers -= 1 + penalty;
        acceleratable.energy -= 5 * acceleratable.energyHorsePowers - penalty;
        return "Ok";
      case "Gasoline":
        acceleratable.fuel -= 10 * acceleratable.horsePowers - penalty;
        return "Ok";
      default:
        return engineSystemNotFount(acceleratable);
    }
  }

  const electricTruck: EnergyUltraTruck = {
    engine: {
      energy: 10,
      energyHorsePowers: 100,
      engineKind: "Electric",
    },
    params: {
      color: Color.BLUE,
      weightKind: "t",
      maxVal: 100,
      owner: "Михаил",
      value: 1,
      mark: Mark.Ultra,
    },
  };

  console.log("before accelerate electricTruck = ", electricTruck);

  accelerate(electricTruck.engine);
  accelerate(electricTruck.engine);
  accelerate(electricTruck.engine);

  console.log("after accelerate electricTruck = ", electricTruck);


  const plane: Plane = {
    engine: {
      fuel: 10,
      horsePowers: 12021,
      engineKind: "Gasoline",
    },
    params: {
      color: Color.RED,
      flowAngle: 0.25,
      mark: Mark.Volga,
      owner: "Гавриил"
    }
  }

  accelerate(plane.engine)


}
