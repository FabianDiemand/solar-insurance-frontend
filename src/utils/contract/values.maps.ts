export const mapRisks = (riskValue: number) => {
  const risks = new Array<string>('Low', 'Mid', 'High');
  return risks[riskValue];
}

export const mapRegions = (regionValue: number) => {
  const regions = new Array<string>('Switzerland South', 'Switzerland North');
  return regions[regionValue];
}