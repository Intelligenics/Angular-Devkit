import { Routes } from '@angular/router';
import { <%= classname %>Component } from './components/<%= dasherize(name) %>.component';

export const  <%= classname %>Routes: Routes =
    [
        {
            path: '',
            component: <%= classify(name) %>Component,
        }
    ]; 