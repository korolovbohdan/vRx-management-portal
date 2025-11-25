import {ESeverity} from '../../shared/enum/severity.enum';

export class VulnerabilityModel {
  constructor(
    id: string, // from test task
    name: string,
    description: string, // from test task
    severity: ESeverity, // from test task
    discoveredDate: Date
  ) {
  }
}
