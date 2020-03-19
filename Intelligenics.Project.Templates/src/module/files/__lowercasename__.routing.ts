import { Routes } from '@angular/router';
import { <%= classname %>Component } from './components/<%= lowercasename %>.component';
import { ItemsResolver } from './resolvers/items.resolver';

export const  <%= camelcasename %>Routes: Routes =
    [
        {
            path: '',
            component: <%= classname %>Component,
            resolve:
            {
                items: ItemsResolver
            }
        }
    ]; 