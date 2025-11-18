export interface IncomePoint {
  period: string;
  amount: number;
}

export interface AccomIncomeDto {
  accomId: string;  
  accomName: string; 
  points: IncomePoint[]; 
  total: number;  
}

export interface ReviewPoint {
  period: string;
  count: number;
}

export interface AccomReviewDto {
  accomId: string;
  accomName: string;
  points: ReviewPoint[];
  total: number;
}