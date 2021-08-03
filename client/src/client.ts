import axios from "axios";
import { API } from "./api";

const api = new API("http://localhost:5000");
main();

async function main() {
    
    printAllUsers();

}

async function printAllUsers() {
    let users;
    try {
        users = await api.getUsers();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(`An error occurred: [${error.response.status}] ${error.message}`);
            } else if (error.request) {
                console.log(`No response was received: ${error.message}`);
            } else {
                console.log(`An error occurred: ${error.message}`);
            }
        } else {
            console.log("An unknown error occurred\n");
        }
        return;
    }

    for (let userIndex = 0; userIndex < users.length; ++userIndex) {
        const user = users[userIndex];
        process.stdout.write(user.name);
        if (userIndex != users.length - 1) {
            process.stdout.write(", ");
        }
    }
    process.stdout.write("\n");
}