import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Feedbackservice } from '../../services/feedbackservice';
import { ProductRequest, Comment, Reply } from '../../models/product-request';
import { ASSETS } from '../../../../public/assets/shared/assets';

@Component({
  selector: 'app-suggestion-detail',
  imports: [FormsModule],
  templateUrl: './suggestion-detail.html',
  styleUrl: './suggestion-detail.css',
})
export class SuggestionDetail implements OnInit {
  assets = ASSETS;
  // The product we're displaying
  suggestion: ProductRequest | null = null;

  // Comments belonging to this product
  comments: Comment[] = [];

  // Used for the Add Comment textarea
  newComment = '';

  // Keeps track of which replies are open
  replyOpen: { [key: number]: boolean } = {};

  // Stores text typed into reply boxes
  replyText: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: Feedbackservice,
  ) {}

  ngOnInit(): void {
    // Get the ID from:
    // /suggestions/:id

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadProduct(id);

    this.loadComments(id);
  }

  // ==========================================
  // Load Product
  // ==========================================

  loadProduct(id: number): void {
    this.feedbackService.getProductRequests().subscribe((products) => {
      this.suggestion = products.find((product) => product.id === id) ?? null;
    });
  }

  // ==========================================
  // Load Comments
  // ==========================================

  loadComments(productId: number): void {
    this.feedbackService.getCommentsByProduct(productId).subscribe((comments) => {
      // First store the comments
      this.comments = comments;

      // Then load the replies for each comment
      this.comments.forEach((comment) => {
        this.feedbackService.getRepliesByComment(comment.id).subscribe((replies) => {
          // Put the replies inside this comment
          comment.replies = replies;
        });
      });
    });
  }

  // ==========================================
  // Go Back
  // ==========================================

  goBack(): void {
    this.router.navigate(['/']);
  }

  // ==========================================
  // Toggle Reply Box
  // ==========================================

  toggleReply(id: number): void {
    this.replyOpen[id] = !this.replyOpen[id];
  }

  // ==========================================
  // Post Reply
  // ==========================================

  postReply(comment: Comment): void {
    const text = this.replyText[comment.id]?.trim();

    if (!text) {
      return;
    }

    const reply = {
      content: text,
      userId: 1,
      commentId: comment.id,
      replyToUserId: comment.userId,
    };

    this.feedbackService.postReply(reply).subscribe((newReply) => {
      comment.replies.push(newReply);

      this.replyText[comment.id] = '';
      this.replyOpen[comment.id] = false;
    });
  }

  // ==========================================
  // Post Reply To Reply
  // ==========================================

  postReplyToReply(comment: Comment, reply: Reply): void {
    const text = this.replyText[reply.id]?.trim();

    if (!text) {
      return;
    }

    console.log('Reply to reply:', reply.id, text);

    // We'll connect this to Spring Boot later.

    this.replyText[reply.id] = '';

    this.replyOpen[reply.id] = false;
  }

  // ==========================================
  // Post Comment
  // ==========================================

  postComment(): void {
    const text = this.newComment.trim();

    if (!text) {
      return;
    }

    const comment = {
      content: text,
      userId: 1,
      productRequestId: this.suggestion!.id,
    };

    this.feedbackService.postComment(comment).subscribe(() => {
      this.newComment = '';

      this.loadComments(this.suggestion!.id);

      this.loadProduct(this.suggestion!.id);
    });
  }

  // ==========================================
  // Upvote
  // ==========================================

  toggleUpvote(suggestion: ProductRequest): void {
    this.feedbackService.toggleUpvote(suggestion);
  }
}
