import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription  } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticleService) { }

  articleSubscription: Subscription = new Subscription();
  articles: Article[] = [];
  articlesLength: number = 0;
  filteredArticles: Article[] = [];
  isLoading: boolean = false;
  isModalOpen$ = this.articleService.isModalOpen$;


  startDisplayIndex: number = 0;
  numberOfArticlesPerPage: number = 3;
  
  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.isLoading = true;
    this.articleSubscription = this.articleService.getArticles().subscribe((response) => {
      this.articles = response;
      this.articlesLength = response.length;
      this.filterArticles();
      this.isLoading = false;
    });
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter((articles, index) => index >= this.startDisplayIndex && index < this.startDisplayIndex + this.numberOfArticlesPerPage);
  }

  setStartDisplayIndex(index: number) {
    this.startDisplayIndex = index;
    this.filterArticles();
  }

  openModal() {
    this.isModalOpen$.next(true);
    this.articleService.tempArticle$.next(new Article());
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
