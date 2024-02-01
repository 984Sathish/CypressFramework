import { faker } from '@faker-js/faker';

var firstName
var lastName
var username
class FakerObject{

    constructor(){
        firstName = this.setFirstName()
        lastName = this.setLastName()
        username = this.setUsername()
    }

    setFirstName(){
        return firstName = faker.person.firstName()
    }
    get firstName(){
        return firstName
    }

    setLastName(){
        return lastName = faker.person.lastName()
    }

    get lastName(){
        return lastName
    }

    setUsername(){
        return username = faker.internet.userName()
    }

    get username(){
        return username
    }

    get password(){
        return faker.internet.password() + faker.number.int(100)
    }

    get role(){
        return faker.helpers.arrayElement(['Admin', 'ESS']).toString()
    }

    get status(){
        return faker.helpers.arrayElement(['Enabled', 'Disabled']).toString()
    }

    get maritalStatus(){
        return faker.helpers.arrayElement(['Single', 'Married', 'Other'])
    }

    get bloodType(){
        return faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    }
    
    get gender(){
        return faker.helpers.arrayElement(['Male','Female']).toString()
    }

    get leaveType(){
        return faker.helpers.arrayElement(['CAN - Matternity','CAN - Bereavement','CAN - FMLA', 'CAN - Vacation', 'CAN - Personal', 'US - Matternity','US - Bereavement','US - FMLA', 'US - Vacation', 'US - Personal']).toString()
    }

    get leaveDuration(){
        return faker.helpers.arrayElement(['Full Day', 'Half Day - Morning', 'Half Day - Afternoon'])
    }

    get nationality(){
        return faker.helpers.arrayElement(['American', 'Australian', 'South African', 'Indian', 'New Zealander', 'Zambian'])
    }   
    
    get dob(){
        return faker.date.past().toISOString().toString().substring(0, 10) 
    }

    get country(){
        return faker.helpers.arrayElement(['Afghanistan', 'Australia', 'China', 'India', 'South Africa', 'New Zealand'])
    }

    get street(){
        return faker.address.streetAddress()
    }

    get city(){
        return faker.address.city()
    }

    get state(){
        return faker.address.state()
    }

    get zipCode(){
       return faker.address.zipCode()
    }

    get mobileNumber(){
        return faker.phone.number().replaceAll('x', '-').replaceAll('.', '')
    }

    get email(){
        return faker.internet.email()
    }

    get joinedDate(){
        return faker.date.past().toISOString().toString().substring(0, 10) 
    }
    
    get leaveDate(){
        return faker.date.future().toISOString().substring(0, 10).toString()
    }

}
export default FakerObject