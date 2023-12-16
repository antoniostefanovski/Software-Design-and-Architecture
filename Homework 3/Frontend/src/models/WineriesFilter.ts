export class WineriesFilter {
    public searchTerm: string | null = null;
    
    public ratings: number[] = [];

    public locations: string[] = [];

    public maxEntries: number | null = null;

    constructor(searchTerm: string | null, ratings: number[], locations: string[], maxEntries: number | null = null) {
        this.searchTerm = searchTerm;
        this.ratings = ratings;
        this.locations = locations;
        this.maxEntries = maxEntries;
    }
}