import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import * as TypeMoq from "typemoq";
import { APIConstants } from '../models/<%= lowercasename %>.constants';
import { <%= classname %>Service } from './<%= lowercasename %>.service';
import { of } from 'rxjs';




describe('When using the <%= lowercasename %> service', () =>
{
    let service: <%= classname %>Service = null;
    beforeAll( async (() =>
    {
        let data = [
            {
                Id: "id1",
                Name: "name1",
                Description: "description1"
            },
            {
                Id: "id2",
                Name: "name2",
                Description: "description2"
            }
        ]

        let mockHttpClient: TypeMoq.IMock<HttpClient>;
        mockHttpClient = TypeMoq.Mock.ofType<HttpClient>();
        mockHttpClient.setup( x => x.get( TypeMoq.It.isValue( APIConstants.itemsControllerUrl ) ) ).returns( () => of( data ) );
        mockHttpClient.setup( x => x.get( TypeMoq.It.isValue( `${APIConstants.itemsControllerUrl}/1` ) ) ).returns( () => of( data[0] ) );

        service = new <%= classname %>Service(mockHttpClient.Mock);
    }));

   
 

    it('I should be able to create it', () =>
    {
        expect(service).toBeTruthy();
    });

    it('I should be able to get a collection of items from the api', () =>
    {
        expect(service).toBeTruthy();

        service.getItems().subscribe((items) =>
        {
            expect(items).toBeTruthy();
            expect(items.length).toEqual(1);
            expect(items[0].id).toEqual(1);
            expect(items[0].name).toEqual("name1");
            expect(items[0].description).toEqual("description1");
        })
    });


    it('should get an item from the api', () =>
    {
        expect(service).toBeTruthy();

        service.getItem(1).subscribe((item) =>
        {
            expect(item).toBeTruthy(); 
            expect(item.id).toEqual(1);
            expect(item.name).toEqual("name1");
            expect(item.description).toEqual("description1");
        })
    });
});
