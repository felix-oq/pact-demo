import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { User } from "../user";

export const exampleUser : User = {
    id: 1,
    name: "Max Mustermann",
    email: "max@mail.com"
};

export const usersRequest : RequestOptions = {
    method: "GET",
    path: "/api/users"
};
  
export const usersResponse : ResponseOptions = {
    status: 200,
    body: Matchers.eachLike(exampleUser),
};
