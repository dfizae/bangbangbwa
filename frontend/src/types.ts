export type DealType = "전세" | "월세" | "매매";
export type BuildingType = "아파트" | "오피스텔" | "빌라" | "원룸";

export interface Property {
  id: number;
  title: string;
  dealType: DealType;
  buildingType: BuildingType;
  deposit: number;
  monthlyRent: number;
  region: string;
  dong: string;
  areaM2: number;
  floor: number;
  totalFloors: number;
  rooms: number;
  saved: boolean;
}

export interface PriceBand {
  value: string;
  label: string;
  min: number;
  max: number;
}

export interface Memo {
  id: number;
  text: string;
  createdAt: string;
}

export interface Filters {
  query: string;
  region: string;
  price: string;
  buildingType: string;
}

export type AuthProvider = "kakao" | "google";

export interface User {
  name: string;
  provider: AuthProvider;
}
