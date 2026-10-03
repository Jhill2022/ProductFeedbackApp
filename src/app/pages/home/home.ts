import { Component } from '@angular/core';
import { Feedbackservice } from '../../services/feedbackservice';
import { ProductRequest } from '../../models/product-request';
import { ASSETS } from '../../../../public/assets/shared/assets';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
  sortOption = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
  assets = ASSETS;
  activeCategory = 'All';
  sortOpen = false;

  sortBy = 'Most Upvotes';
  suggestions: ProductRequest[] = [];
  suggestionCount = 0;
  constructor(private feedbackService: Feedbackservice) {}

  toggleUpvote(suggestion: ProductRequest): void {
    this.feedbackService.toggleUpvote(suggestion);
  }
  toggleSort(): void {
    this.sortOpen = !this.sortOpen;
  }

  selectSort(option: string): void {
    this.sortBy = option;
    this.sortOpen = false;
  }
  ngOnInit(): void {
    this.feedbackService.getProductRequests().subscribe((data) => {
      this.suggestions = data;

      this.suggestionCount = this.suggestions.filter(
        (suggestion) => suggestion.status === 'suggestion',
      ).length;
    });
  }
  getFilteredSuggestions(): ProductRequest[] {
    return this.suggestions.filter(
      (s) =>
        s.status === 'suggestion' &&
        (this.activeCategory === 'All' ||
          s.category.toLowerCase() === this.activeCategory.toLowerCase()),
    );
  }
  getSortedFiltered(): ProductRequest[] {
    return this.getFilteredSuggestions().sort((a, b) => {
      if (this.sortBy === 'Most Upvotes') {
        return b.upvotes - a.upvotes;
      }

      if (this.sortBy === 'Least Upvotes') {
        return a.upvotes - b.upvotes;
      }

      if (this.sortBy === 'Most Comments') {
        return (b.commentCount) - (a.commentCount);
      }

      return (a.commentCount) - (b.commentCount);
    });
  }
}
