import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import * as TypeMoq from "typemoq";
import { APIConstants } from '../models/<%= lowercasename %>.constants';
import { <%= classname %>Service } from './<%= lowercasename %>.service';
import { of } from 'rxjs';




describe('<%= classname %>Service', () =>
{
    beforeAll(async(() =>
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
        mockHttpClient.setup(x =>
            x.get(TypeMoq.It.isValue(APIConstants.itemsControllerUrl)).returns(() => of(data))
        );
        mockHttpClient.setup(x =>
            x.get(TypeMoq.It.isValue(`${APIConstants.itemsControllerUrl}/1`)).returns(() => of(data[0]))
        );

        TestBed
            .configureTestingModule({
                declarations: [],
                providers:
                    [
                        { provide: HttpClient, useValue: mockHttpClient.object },
                        <%= classname %>Service,
                    ]
            })
            .compileComponents();
    }));

    let service: <%= classname %>Service;

    beforeEach(async () =>
    {
        service = TestBed.get(<%= classname %>Service);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });

    it('should get items from the <%= lowercasename %> service', () =>
    {
        expect(service).toBeTruthy();

        service.getItems().subscribe((items) =>
        {
            expect(items).toBeTruthy();
            expect(items.length).toEqual(1);
            expect(items[0].id).toEqual("id1");
            expect(items[0].name).toEqual("name1");
            expect(items[0].description).toEqual("description1");
        })
    });


    it('should get an item from the <%= lowercasename %> service', () =>
    {
        expect(service).toBeTruthy();

        service.getItem(1).subscribe((item) =>
        {
            expect(item).toBeTruthy(); 
            expect(item.id).toEqual("id1");
            expect(item.name).toEqual("name1");
            expect(item.description).toEqual("description1");
        })
    });
});
