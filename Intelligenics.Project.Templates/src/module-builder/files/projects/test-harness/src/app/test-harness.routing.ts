// Angular
import { RouterModule } from '@angular/router'; 
import { ApplicationRoutes as ApplicationFrameworkRoutes } from "@intelligenics/application-framework";
import { <%= classname %>Routes } from '../../../module/src/lib/<%= lowercasename %>.routing'; 


ApplicationFrameworkRoutes.append(  <%= classname %>Routes );

export const AppRouting = RouterModule.forRoot(ApplicationFrameworkRoutes.AppRoutes,
    {
        // enableTracing: true
    });

