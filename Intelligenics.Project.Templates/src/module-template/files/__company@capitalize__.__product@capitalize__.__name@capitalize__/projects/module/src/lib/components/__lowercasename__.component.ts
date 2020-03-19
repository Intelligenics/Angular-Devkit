import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { <%= classname %>Item } from '../models/<%= lowercasename %>.model';

@Component({
    selector: "int-<%= lowercaseproduct %>-<%= lowercasename %>",
    templateUrl: "./<%= lowercasename %>.component.html",
    styleUrls: ['<%= lowercasename %>.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { class: 'int-<%= lowercaseproduct %>-<%= lowercasename %>' }
})
export class <%= classname %>Component implements OnDestroy, OnInit
{
    private subscriptions: Array<Subscription>;

    public items: Array<<%= classname %>Item>;

    constructor(
        private activatedRoute: ActivatedRoute
    )
    {
        this.items = [];
        this.subscriptions = [];

        this.items = this.activatedRoute.snapshot.data.items;
    }

    public ngOnInit(): void
    {

    }

    public ngOnDestroy(): void
    {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
