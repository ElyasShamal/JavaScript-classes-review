

class HospitalEmployee {
    constructor(name) {
      this._name = name;
      this._remainingVacationDays = 20;
    }
    
    get name() {
      return this._name;
    }
    
    get remainingVacationDays() {
      return this._remainingVacationDays;
    }
    
    takeVacationDays(daysOff) {
      this._remainingVacationDays -= daysOff;
    }
  
    static generatePassword(){
      return Math.floor(Math.random() * 10000)
    }
  
    
  }
  
  class Docter extends HospitalEmployee{
    constructor(name, insurance){
      super(name)
      this._name = name;
      this._insurance = insurance
      this._remainingVacationDays = 20
    }
  
    takeVacationDays(daysOff){
      if (daysOff <= this._remainingVacationDays) {
        this._remainingVacationDays -= daysOff;
        console.log(`${daysOff} days taken. ${this._remainingVacationDays} vacation days remaining.`);
      } else {
        console.log(`Not enough vacation days remaining. You only have ${this._remainingVacationDays} days left.`);
      }
    }
  
  }
  
  class Nurse extends HospitalEmployee {
    constructor(name, certifications) {
      super(name);
      this._certifications = certifications;
    } 
    
    get certifications() {
      return this._certifications;
    }
    
    addCertification(newCertification) {
      this.certifications.push(newCertification);
    }
  }
  
  const nurseOlynyk = new Nurse('Olynyk', ['Trauma','Pediatrics']);
  nurseOlynyk.takeVacationDays(5);
  console.log(nurseOlynyk.remainingVacationDays);
  nurseOlynyk.addCertification('Genetics');
  console.log(nurseOlynyk.certifications);
  
  
  
  const employee1 = new Docter("Elyas", "Health");
  employee1.takeVacationDays(5);
  
  
  console.log(Docter.generatePassword());
  console.log(Nurse.generatePassword());