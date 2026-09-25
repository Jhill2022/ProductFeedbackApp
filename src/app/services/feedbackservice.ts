import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRequest } from '../models/product-request';

interface FeedbackData {
  currentUser: unknown;
  productRequests: ProductRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class Feedbackservice {
  private apiUrl = 'http://localhost:8080/api/product-requests';

  constructor(private http: HttpClient) {}

  getProductRequests(): Observable<ProductRequest[]> {
    return this.http.get<ProductRequest[]>(this.apiUrl);
  }
  toggleUpvote(suggestion: ProductRequest): void {
  suggestion.upvoted = !suggestion.upvoted;

  if (suggestion.upvoted) {
    suggestion.upvotes++;
  } else {
    suggestion.upvotes--;
  }
}
}
