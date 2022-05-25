import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import {delay} from 'rxjs/operators';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, 
              private articleService: ArticleService) { }

  id: string = '';
  isLoading = false;
  dataSubscription = new Subscription();
  articles: Article[] = [];
  article: Article  = new Article();
  prevArticleId: number = 0;
  nextArticleId: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getData();
    });
  }

  getData(){
    this.isLoading  = true;
    this.dataSubscription = forkJoin([this.articleService.getArticles(), this.articleService.getArticle(this.id)]).pipe(delay(1000)).subscribe((response) => {
     this.articles = response[0];
     this.article = response[1];

     const currentArticleIndex = this.articles.findIndex((item) => item.id === this.article.id);
     console.log(currentArticleIndex);

     this.prevArticleId = this.articles[currentArticleIndex - 1]  ? this.articles[currentArticleIndex - 1].id : 0;
     this.nextArticleId = this.articles[currentArticleIndex + 1]  ? this.articles[currentArticleIndex + 1].id : 0;

     this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
  

}
