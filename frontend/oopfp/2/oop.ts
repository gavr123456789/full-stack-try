namespace OOP {
  // множество "Цвет"
  enum Color {
    RED,
    GREEN,
    BLUE,
    YELLOW,
    BLACK,
    WHITE,
  }

  // интерфейс "Стиль вождения"
  interface IDrivingStyle {
    // нажата педаль газа
    acceleratorIsPressed();

    // нажата педаль тормоза
    brakeIsPressed();

    // получить запас хода
    getPowerReserve(fuel: number);
  }

  // абстрактный класс "Базовый автомобиль"
  abstract class GenericCar {
    // стиль вождения
    protected _style: IDrivingStyle | null = null;

    // конструктор
    public constructor(
      protected readonly color: Color, // цвет машины
      protected readonly owner: string // владелец машины
    ) {}

    // запас хода в километрах
    public abstract get powerReserve(): number;
  }

  // абстрактный класс "Автомобиль с ДВС"
  abstract class GasolineCar extends GenericCar {
    // текущее количество топлива
    protected _fuel: number;

    // конструктор
    public constructor(
      protected readonly color: Color, // цвет машины
      protected readonly owner: string, // владелец машины
      protected readonly fuelMax: number // объем бензобака
    ) {
      super(color, owner);
    }

    // геттер возвращает текущее количество топлива
    public get fuel(): number {
      return this._fuel;
    }

    // заправка автомобиля
    public refuel(fuel: number): void {
      if (fuel > 0) {
        const fuelNew: number = fuel + this._fuel;

        this._fuel = fuelNew < this.fuelMax ? fuelNew : this.fuelMax;
      }
    }

    // нажата педаль газа
    public accelerate(): void {
      if (this._style != null) {
        this._style.acceleratorIsPressed();
      }
    }

    // нажата педаль тормоза
    public brake(): void {
      if (this._style != null) {
        this._style.brakeIsPressed();
      }
    }
  }

  // класс "Стиль вождения Ultra"
  class UltraDrivingStyle implements IDrivingStyle {
    // нажата педаль газа
    public acceleratorIsPressed() {
      // TODO
    }

    // нажата педаль тормоза
    public brakeIsPressed() {
      // TODO
    }

    // получить запас хода
    public getPowerReserve(fuel: number) {
      let reserve: number = fuel * 2;
      // TODO
      return reserve;
    }
  }

  // класс "Автомобиль марки Ultra"
  class UltraCar extends GasolineCar {
    public static readonly FUEL_MAX: number = 40; // объем бензобака

    // конструктор
    public constructor(
      protected readonly color: Color, // цвет машины
      protected readonly owner: string // владелец машины
    ) {
      super(color, owner, UltraCar.FUEL_MAX);

      this._style = new UltraDrivingStyle(); // полиморфизм!
    }

    // запас хода в километрах
    public get powerReserve(): number {
      return this._style.getPowerReserve(this._fuel);
    }
  }

  // дядя Вася и дядя Петя покупают машины
  const vasyaCar: UltraCar = new UltraCar(Color.BLUE, "дядя Вася");
  const petyaCar: UltraCar = new UltraCar(Color.RED, "дядя Петя");

  // машины заправляются
  vasyaCar.refuel(20); // дядя Вася заправил машину на полбака
  petyaCar.refuel(UltraCar.FUEL_MAX); // дядя Петя заправил полный бак

  // поехали!
  vasyaCar.accelerate();
  petyaCar.accelerate();

  petyaCar.accelerate();
  vasyaCar.brake();

  vasyaCar.brake();

  vasyaCar.accelerate();

  petyaCar.accelerate();
  petyaCar.accelerate();

  petyaCar.brake();

  vasyaCar.refuel(10); // дядя Вася долил еще 10 л

  // и
  // так
  // далее

  // узнаём, сколько осталось километров:
  {
    const vasyaReserve: number = vasyaCar.powerReserve;
    const petyaReserve: number = petyaCar.powerReserve;
  }
}
