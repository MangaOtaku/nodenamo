import { IDynamoDbManager } from "../../interfaces/iDynamodbManager";
import { Execute } from "./execute";

export class WithCapacityOf
{
    constructor(private manager:IDynamoDbManager, private type:{new(...args: any[])}, private readCapacityUnits:number, private writeCapacityUnits:number)
    {
        return this;
    }

    async execute(): Promise<void>
    {
        let params = {
            onDemand: false, 
            readCapacityUnits: this.readCapacityUnits, 
            writeCapacityUnits: this.writeCapacityUnits
        };

        await new Execute(this.manager, this.type, params).execute();
    }
};