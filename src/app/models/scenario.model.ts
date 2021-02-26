export class CustomerModel {
    id: string;
    name: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactWorkPhone: string;
    contactMobilePhone: string;
    constructor() {
        this.id = null;
        this.name = null;
        this.contactFirstName = null;
        this.contactLastName = null;
        this.contactEmail = null;
        this.contactWorkPhone = null;
        this.contactMobilePhone = null;
    }
}

export class ScenarioModel {
    id: string;
    customerId: string;
    description: string;
    term: number;
    constructor() {
        this.id = null;
        this.customerId = null;
        this.description = null;
        this.term = null;
    }
}