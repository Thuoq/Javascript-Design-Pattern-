// Builder là một mẫu thiết kế creational đơn giản hóa việc tạo ra các đối tượng phức tạp bằng cách cung cấp một giao diện thông thạo, cho phép chúng ta xây dựng đối tượng từng bước một

// most use case is create object with multiple different args


// case 
class _Boat {
  constructor(hasMotor, motorCount, motorBrand, motorModel, hasSails, sailsCount, sailsMaterial, sailsColor, hullColor, hasCabin) {}
}
// 
var myBoat = new _Boat(true, 2, 'Best Motor Co.', 'OM123', true, 1, 'fabric', 'white', 'blue', false)


// ======= we need improve the design this constructor is to aggregate all arguments in a single object literal, such as following;

class Boat {
  constructor(allParameter) {
    this.hasMotor = allParameter.hasMotor,
      this.motorCount = allParameter.motorCount,
      this.motorBrand = allParameter.motorBrand,
      this.motorModel = allParameter.motorModel,
      this.hasSails = allParameter.hasSails,
      this.sailsCount = allParameter.sailsCount,
      this.sailsMaterial = allParameter.sailsMaterial,
      this.sailsColor = allParameter.sailsColor,
      this.hullColor = allParameter.hullColor,
      this.hasCabin = allParameter.hasCabin
  }
}

var myBoat = new Boat({
  hasMotor: true,
  motorCount: 2,
  motorBrand: "Base motor co.",
  motorModel: "OM123",
  hasSails: true,
  sailsCount: 1,
  sailsMaterial: "facbirc",
  sailsColor: "white",
  hullColor: 'blue',
  hasCabin: false
})
// lam nhu thế này vẫn chưa tốt chúng ta có thể làm tốt hơn bằng cách 
class BoatBuilder {
  withMotors(count, brand, model) {
    this.hasMotor = true,
      this.motorCount = count;
    this.motorBrand = brand;
    this.motorModel = model;
    return this;
  }
  withSails(count, material, color) {
    this.hasSails = true;
    this.sailsCount = count;
    this.sailsMaterial = material;
    this.sailsColor = color;
    return this;
  }
  hullColor(color) {
    this.hullColor = color;
    return this;
  }
  withCabin() {
    this.hasCabin = true;
    return this;
  }
  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    })
  }
}
console.log("=============")
var myBoat = new BoatBuilder()
  .withMotors(2, 'Base Motor Co/', "OM123")
  .withSails(1, 'fabirc', 'white')
  .withCabin()
  .hullColor('blue')
  .build()
console.log(myBoat)