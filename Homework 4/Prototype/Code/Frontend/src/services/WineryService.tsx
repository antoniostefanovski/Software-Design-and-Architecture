import { WineriesInfo } from "../models/WineriesInfo";

export class WineryService {

    public async searchWineries(searchTerm: string | undefined, ratings: number[]): Promise<any[] | undefined> {
      try {
          const response = await fetch(`https://localhost:7008/Wineries/wineries${Boolean(searchTerm) ? '?searchTerm=' + searchTerm : ""}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ratings),
          });
    
          if (response.ok) {
            const responseData: Array<any> = await response.json();
            return responseData;
          } else {
            console.error('Error:', response.status, response.statusText);
          }
        } catch (error: any) {
          console.error('Error:', error.message);
        }
    }
}