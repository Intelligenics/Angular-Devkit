// Angular
import { RouterModule } from '@angular/router';  
import { <%= classname %>Routes } from '../../../module/src/lib/<%= lowercasename %>.routing';

 


export const AppRouting = RouterModule.forRoot(<%= classname %>Routes,
    {
        // enableTracing: true
    });

