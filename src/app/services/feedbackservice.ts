import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRequest, Comment, Reply } from '../models/product-request';

interface FeedbackData {
  currentUser: unknown;
  productRequests: ProductRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class Feedbackservice {
  private apiUrl = 'http://localhost:8080/api/product-requests';
  private commentsApiUrl = 'http://localhost:8080/api/comments';
  private repliesApiUrl = 'http://localhost:8080/api/replies';
  constructor(private http: HttpClient) {}
  getCommentsByProduct(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsApiUrl}/product/${productId}`);
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

  getRepliesByComment(commentId: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.repliesApiUrl}/comment/${commentId}`);
  }

  postReply(reply: {
    content: string;
    userId: number;
    commentId: number;
    replyToUserId: number;
  }): Observable<Reply> {
    return this.http.post<Reply>(this.repliesApiUrl, reply);
  }

  postComment(comment: {
    content: string;
    userId: number;
    productRequestId: number;
  }): Observable<Comment> {
    return this.http.post<Comment>(this.commentsApiUrl, comment);
  }
}
