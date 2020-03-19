import { RouterModule } from '@angular/router';
import { ApplicationRoutes } from "@intelligenics/application-framework";

ApplicationRoutes.prepend(
    [
        // Primary Routes
        {
            path: '',
            children:
                [
                    // ...YourPrimaryRoutesHere
                    // {
                    //     path: '',
                    //     loadChildren: () => import('@company/product-mymodule').then(m => m.MyModuleModule)
                    // },
                    // {
                    //     path: '',
                    //     loadChildren: () => import('@company/product-myothermodule').then(m => m.MyOtherModuleModule)
                    // }
                ]
        }
    ])


export const AppRouting = RouterModule.forRoot(ApplicationRoutes.AppRoutes,
    {
        // enableTracing: true
    });

