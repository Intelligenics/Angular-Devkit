import { Component  } from "@angular/core";

@Component( {
    selector: "int-<%= lowercaseproduct %>-<%= lowercasename %>",
    templateUrl: "./<%= lowercasename %>.component.html",
    host: { class: 'int-<%= lowercaseproduct %>-<%= lowercasename %>' }
} )
export class <%= classname %>Component 
{ 
    
}