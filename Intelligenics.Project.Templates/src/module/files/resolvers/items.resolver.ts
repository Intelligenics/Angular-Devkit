import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { <%= classname %>Service } from '../services/<%= lowercasename %>.service';
import { <%= classname %>Item } from '../models/<%= lowercasename %>.model';


@Injectable()
export class ItemsResolver implements Resolve<Array<<%= classname %>Item>>
{
    constructor ( private <%= camelcasename %>Service: <%= classname %>Service )
    {

    }

    public resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Array<<%= classname %>Item>>
    {
        return this.<%= camelcasename %>Service.getItems();
    }
}
