interface Response {
  message?: string;
  data?: any;
}

class responses {
  code: number;
  message: string;
  data: any;
}

export class Success extends responses {
  constructor(response: Response) {
    super();
    this.code = 200;
    this.message = response.message;
    this.data = response.data;
  }
}

export class Created extends responses {
  constructor() {
    super();
    this.code = 201;
    this.message = 'Created';
  }
}
