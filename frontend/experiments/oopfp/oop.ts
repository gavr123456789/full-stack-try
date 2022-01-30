{
  
class BasicPlaneC {
  constructor(public engineCount: number, public engineType: 1 | 2 | 3 | 4) {}
}

class MilitaryPlaneC extends BasicPlaneC {
  constructor(public country: string) {
    super(2, 1);
  }
}

class CivilPlaneC extends BasicPlaneC {
  constructor() {
    super(6, 4);
  }
}

class PassengerPlaneC extends CivilPlaneC {
  constructor(public airline: string) {
    super();
  }
}




class A {
  a: number
}


class B {
  b: number
}

type C = A & B

function sumType<T, G>(t: T, g: G): T & G {
  return {
    ...t,
    ...g
  }
}

const a: A = {a: 2}
const b: B = {b: 4}
const c = sumType(a, b)


const x: C = {
  a: 4,
  b: 2
}


class ICargorable {
  cargo: number
}

type Constructor = new (...args: any[]) => {};

// Mixin cargo property
function Cargorable<TBase extends Constructor>(Base: TBase) {
  return {...Base, ...ICargorable}
}

const CargoPlainC = Cargorable(PassengerPlaneC);
const MilitaryCargoPlainC = Cargorable(MilitaryPlaneC);



// далее более общие функции оперируют с более общими классами в иерархии, например ???

/// FP

interface Engine {
  engineCount: number;
  engineType: 1 | 2 | 3 | 4;
}

type MilitaryEngine = {
  engineCount: 2;
  engineType: 1;
};

type CivilEngine = {
  engineCount: 6;
  engineType: 4;
};

interface MilitaryPlane {
  engine: MilitaryEngine;
}
interface CivilPlane {
  engine: CivilEngine;
}
interface PassengerPlane {
  engine: MilitaryEngine | CivilEngine;
}

type Cargo = {
  maxVal: number;
  value: number;
  kind: "kg" | "t";
};

interface CargoPlane {
  engine: MilitaryEngine | CivilEngine;
  cargo: Cargo;
}

interface MilitaryCargoPlane {
  engine: MilitaryEngine | CivilEngine;
  cargo: Cargo;
}

function loadPlainWithCargo(
  plane: { cargo: Cargo },
  val: number
): "Ok" | "CargoError" {
  let multiplier = plane.cargo.kind === "kg"? 1000: 1
  const summ = plane.cargo.value + val;
  if (summ > 10 * multiplier) {
    plane.cargo.value += val;
    return "Ok";
  } else {
    return "CargoError";
  }
}

function loadPlainWithCargoC() {
  
}



}
