import type { RegionData } from './types';

export async function fetchRegionData(): Promise<RegionData> {
  const response = await fetch('data/indonesia_regions.json');
  if (!response.ok) {
    throw new Error('Failed to fetch region data');
  }
  return response.json();
}
