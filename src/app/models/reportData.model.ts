export interface ReportData {
    id: string;
    customer: [
      {
      customerId: string,
      customerName: string,
      customerContactFirstName: string,
      customerContactLastName: string,
      customerContactEmail: string,
      customerContactWorkPhone: string,
      customerContactMobilePhone: string
    }
  ],
  opportunity: [
    {
      scenarioId: string,
      scenarioDescription: string,
      scenarioTerm: string
    }
  ]
  }