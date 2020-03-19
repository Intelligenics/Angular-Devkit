import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { <%= classname %>Component } from './components/<%= lowercasename %>.component';
import { ItemResolver } from './resolvers/item.resolver';
import { ItemsResolver } from './resolvers/items.resolver';
import { <%= classname %>Service } from './services/<%= lowercasename %>.service';



/**
 * This module contains all the components need by the application to function
 * and provides common services to the all other modules.
 * */
@NgModule( {
    imports:
        [
            HttpClientModule,
            CommonModule,  
            RouterModule,
        ],
    exports:
        [
        ],
    declarations:
        [
          <%= classname %>Component,
        ],
    providers:
        [
            <%= classname %>Service,
            ItemsResolver,
            ItemResolver,
        ],
} )
export class <%= classname %>Module { }
