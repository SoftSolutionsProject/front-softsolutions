export interface BuscaItem {
  id?: number | string;
  titulo: string;
  descricao: string;
  tipo?: string;
  url?: string;
  curso?: string;
  modulo?: string;
  professor?: string;
}

export interface BuscaTextoResponse {
  results: BuscaItem[];
}

export interface BuscaVozResponse {
  originalText: string;
  normalizedText: string;
  tokens: string[];
  filteredTokens: string[];
  stems: string[];
  intent: string;
  confidence: number;
  rankings: Array<{
    label: string;
    value: number;
  }>;
  searchQuery: string;
  querySource: 'filteredTokens' | 'normalizedText';
  matchedTerms: string[];
  results: BuscaItem[];
}