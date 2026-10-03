import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRequest, Comment } from '../models/product-request';



interface FeedbackData {
  currentUser: unknown;
  productRequests: ProductRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class Feedbackservice {
  private apiUrl = 'http://localhost:8080/api/product-requests';
  private commentsApiUrl =
    'http://localhost:8080/api/comments';
  constructor(private http: HttpClient) {}
  getCommentsByProduct(productId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(
    `${this.commentsApiUrl}/product/${productId}`
  );
}

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
