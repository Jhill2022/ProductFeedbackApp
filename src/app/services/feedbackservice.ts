import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductRequest } from '../models/product-request';

interface FeedbackData {
  currentUser: unknown;
  productRequests: ProductRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class Feedbackservice {
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) {}

  getSuggestions() {
    return this.http.get<FeedbackData>(this.dataUrl);
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
