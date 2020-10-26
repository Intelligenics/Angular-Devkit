import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { <%= classname %>Component } from './components/<%= lowercasename %>.component';
// import { ItemsResolver } from './resolvers/items.resolver';

export const  <%= classname %>Routes: Routes =
    [
        {
            path: '',
            component: <%= classname %>Component,
            // Uncomment this to resolve data for the component
            // resolve:
            // {
            //     items: ItemsResolver
            // }
        }
    ]; 


@NgModule({
imports: 
    [
        RouterModule.forChild(<%= classname %>Routes)
    ],
exports: 
    [
        RouterModule
    ]
})
export class <%= classname %>RoutingModule { }