
const { default: mongoose } = require('mongoose');

module.exports = function(schema, filter){
    let query = schema.find();
    Object.keys(filter).forEach((key)=>{      
        const operand = key.substring(0,2);
        const field = key.substring(3);
        console.log(`here's the operand '${operand}', field '${field}' and value '${filter[key]}'`)
        switch(operand){
            case 'gt':
                query.where(field).gt(filter[key]);
                break;
            case 'lt':
                query.where(field).lt(filter[key]);
                break;
            case 'mn':
                query.where(field).gte(filter[key]);
                break;
            case 'mx':
                query.where(field).lte(filter[key]);
                break;
            case 'eq':
                query.where(field).equals(filter[key]);
                break;
            case 'in':
                query.where(field).in(filter[key]);
                break;
            case 'lk':
                var regexp = new RegExp(`${filter[key]}`,"i")
                query.where(field).regex( regexp);
                break;
            case 'st':
                var regexp = new RegExp(`^${filter[key]}`,"im")
                query.where(field).regex(regexp);
            case 'ed':
                var regexp = new RegExp(`${filter[key]}$`,"im")
                query.where(field).regex(regexp);
                break;
            default:
                console.log(`unknown operand: ${operand}`)
        }
        
    })
    return query;
}