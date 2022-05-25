import { Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit{
 
  @Input() article: Article = new Article();

  @Output() getArticles = new EventEmitter<string>();
  
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(id).subscribe((article) => {
        console.log('Article deleted');
        this.getArticles.emit('');
    })
  }

  editArticle(article: Article) {
    this.articleService.isModalOpen$.next(true);
    this.articleService.tempArticle$.next(article);
  }

  ngOnDestroy() {
    // this.deleteSubscription.unsubscribe();
  }

}
