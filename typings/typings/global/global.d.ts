
declare global {    
  import { App } from "#app"
  var app: App
  declare function fail(expected: any, received?: any, message?: string): void;

}
declare var app: App
declare function fail(expected: any, received?: any, message?: string): void;