import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIConstants } from '../models/<%= lowercasename %>.constants';
import { <%= classname %>Item } from '../models/<%= lowercasename %>.model';
import { AddItemCommand, AddItemResponse } from '../models/add.command';
import { UpdateItemCommand, UpdateItemResponse } from '../models/update.command';

/**
 * The <%= lowercasename %> provides core RESTful API Access
 * through queryies and basic CRUD functions
 * managed
 * */
@Injectable()
export class <%= classname %>Service 
{
  constructor ( private http: HttpClient )
  {
  }

  /**
   * Gets a list of <%= lowercasename %> items from system
   */
  public getItems (): Observable<Array<<%= classname %>Item>>
  {
    return this.http
      .get( `${ APIConstants.itemsControllerUrl }` )
      .pipe(
        map( ( response: any ) =>
        {
          if ( null == response )
            return null;

          return response.map( item =>
          {
            let itemOut = new <%= classname %>Item();
            itemOut.id = item.Id;
            itemOut.name = item.Name;
            itemOut.description = item.Description;

            return itemOut;
          } );
        } )
      );
  }

  /**
   * Gets a <%= lowercasename %> item from the system
   * @param id
   */
  public getItem ( id: number ): Observable<<%= classname %>Item>
  {
    return this.http
      .get( `${ APIConstants.itemsControllerUrl }/${ id }` )
      .pipe(
        map( ( response: any ) =>
        {
          if ( null == response )
            return null;

          let responseOut = new <%= classname %>Item();
          responseOut.id = response.Id;
          responseOut.name = response.Name;
          responseOut.description = response.Description;

          return responseOut;
        } )
      );

  }

  /**
   * Adds a new <%= lowercasename %> item into the system
   * @param command the item to be added
   * @returns a command response object with an unique identifier provided for the $moduleName$
   * item by the system
   */
  public add ( command: AddItemCommand ): Observable<AddItemResponse>
  {
    return this.http.post( APIConstants.itemsControllerUrl, command )
      .pipe(
        map( ( response: any ) =>
        {
          if ( null == response )
            return null;

          let responseOut = new AddItemResponse();

          responseOut.Id = response.Id;

          return responseOut;
        } )
      );
  }

  /**
   * Updates a $moduleName$ item into the system
   * @param command the $moduleNameLower$ item details to be updated
   */
  public update ( command: UpdateItemCommand ): Observable<UpdateItemResponse>
  {
    return this.http.put( APIConstants.itemsControllerUrl, command )
      .pipe(
        map( ( response: any ) =>
        {
          let responseOut = new UpdateItemCommand();

          responseOut.Id = response.Id;

          return responseOut;
        } )
      );
  }

  /**
   * Removes a $moduleName$ item from the system
   * @param id the identifier of the item to be removed
   */
  public remove ( id: number ): Observable<any>
  {
    return this.http.delete( `${ APIConstants.itemsControllerUrl }/${ id }` )
      .pipe(
        map( ( response: any ) =>
        {
          return null;
        } )
      );
  }
}
