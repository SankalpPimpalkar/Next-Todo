import config from "./config";
import { Client, Account, ID, Databases, Query } from "appwrite";

type UserSignup = {
    email: string,
    name: string,
    password: string,
}
type UserLogin = {
    email: string,
    password: string
}

const client = new Client()

client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)

export const account = new Account(client);
export const database = new Databases(client);

export class AppwriteService {

    async createAccount({ email, password, name }: UserSignup) {
        try {
            const newUser = await account.create(ID.unique(), email, password, name);

            if (newUser) {
                return this.login({ email, password });
            } else {
                return newUser;
            }

        } catch (error) {
            console.log("createAccount error", error)
            throw error;
        }
    }

    async login({ email, password }: UserLogin) {
        try {

            return await account.createEmailPasswordSession(email, password)

        } catch (error) {
            console.log("login error", error)
            throw error;
        }
    }

    async getCurrentUser() {
        try {

            return await account.get();

        } catch (error) {
            console.log("getCurrentUser error", error)
            throw error;
        }
    }

    async logout() {
        try {
            return await account.deleteSession('current')
        } catch (error) {
            console.log("logout error", error)
            throw error;
        }
    }

    async getList(userId: string) {

        const list = await database.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionListsId,
            [
                Query.equal('user', [userId]),
                Query.orderDesc('$createdAt')
            ]
        )

        return list;
    }

    async getTodosByListId(listId: string) {

        const todos = await database.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionListsId,
            listId
        )

        return todos;
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;