import { PortalService } from './portal.service';

class SomeService {
  constructor(
      private service: PortalService
  ) {}

  public boolean: boolean;

  public method(): void {}
}
