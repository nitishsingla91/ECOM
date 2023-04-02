import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
{ path: 'blog', component: BlogComponent , data: { title: 'Blog' }},
{ path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
{ path: 'home', component: HomeComponent, data: { title: 'Home' } },
{ path: 'product', component: ProductComponent, data: { title: 'Product' } },
{ path: 'search', component: SearchResultComponent, data: { title: 'Search' } },
{ path: '', redirectTo:'/home' , pathMatch: 'full'},
{ path: '**', component: PageNotFoundComponent, data: { title: 'Page Not Found' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
