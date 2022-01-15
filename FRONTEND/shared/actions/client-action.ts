import { Client } from "shared/models/client";

export class AddClient {
  static readonly type = '[Client] Add';

  constructor(public payload: Client) {}
}

export class RemoveClient {
  static readonly type = '[Client] Remove';

  constructor() {}
}

export class AddJwtToken {
  static readonly type = '[String] Add';

  constructor(public payload: String) {}
}

export class RemoveJwtToken {
  static readonly type = '[String] Remove';

  constructor() {}
}