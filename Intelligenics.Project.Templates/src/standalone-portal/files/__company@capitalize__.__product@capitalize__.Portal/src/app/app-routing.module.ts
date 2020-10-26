import { RouterModule, Routes } from '@angular/router';

import { ApplicationRoutes } from "@intelligenics/application-framework";
import { NgModule } from '@angular/core';

ApplicationRoutes.prepend(
  [
    // Primary Routes
    {
      path: '',
      children:
        [
          // ...YourPrimaryRoutesHere <%= classname %>Module
          {
              path: '',                
              loadChildren: () => import('./modules/<%= lowercasename %>/<%= lowercasename %>.module').then(m => m.<%= classname %>Module)
          },
          // {
          //     path: '',
          //     loadChildren: () => import('@company/product-myothermodule').then(m => m.MyOtherModuleModule)
          // }
        ]
    }
  ]) 
 
@NgModule({
  imports: [RouterModule.forRoot(ApplicationRoutes.AppRoutes,
    {
      // enableTracing: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
