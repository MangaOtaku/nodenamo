import {assert as assert} from 'chai';
import { Add } from '../src/queries/add/add';
import { DynamoDbManager } from '../src/managers/dynamodbManager';
import { IMock, Mock, It } from 'typemoq';
import { DBTable } from '../src/dbTable';
import { DBColumn } from '../src/dbColumn';
import { Update } from '../src/queries/update/update';

@DBTable()
class Entity {
    @DBColumn({hash:true, id:true})
    id:number = 123;
};

describe('Queury.Update', function () 
{
    let called:boolean;
    let mockedManager:IMock<DynamoDbManager>;
    
    beforeEach(()=>
    {
        called = false;
        mockedManager = Mock.ofType<DynamoDbManager>();
    });

    it('execute()', async ()=>
    {
        mockedManager.setup(m => m.update(Entity, 1, {id:1}, undefined)).callback(()=>called=true);

        let update = new Update(mockedManager.object, {id:1}).from(Entity);
        await update.execute();

        assert.isTrue(called);
    });

    it('where()', async ()=>
    {
        mockedManager.setup(m => m.update(Entity, 1, {id:1}, {
            conditionExpression:'condition', 
            expressionAttributeNames: {name: 'n'},
            expressionAttributeValues: {value: 'v'}
        })).callback(()=>called=true);

        let update = new Update(mockedManager.object, {id:1}).from(Entity).where('condition', {'name':'n'}, {'value':'v'});
        await update.execute();

        assert.isTrue(called);
    });
});