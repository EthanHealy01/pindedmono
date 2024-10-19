require('./setup')
const request = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');
const app = require('../index'); // Update this according to your app entry point
const event = require('../features/events/schema'); // Update according to your schema path
const filterBuilder = require('../utils/filter_builder');
const config = require('config')


let chai, expect;
describe('Event API', () => {
    before(async () => {
        const chaiModule = await import('chai');
    chai = chaiModule.default; // For ES Module version
    expect = chai.expect; // Get the expect function

        // Setup database connection if needed
        await  mongoose.connect(config.get('connectionString'));
    });

    after(async () => {

        // Clean up and close connection
        await mongoose.connection.close();
    });

    describe('GET /events/provider/:providerId', () => {
        
        it('should return events for the given providerId', async () => {
            const providerId = '668ec25f0f155bd2df899f59';
            const mockEvents = [{ description: 'Event 1',provider:'668ec25f0f155bd2df899f59' }, { description: 'Event 2', provider:'668ec25f0f155bd2df899f59' }];
            sinon.stub(filterBuilder, 'call').returns(Promise.resolve(mockEvents));

            const res = await request(app).get(`/events/provider/${providerId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockEvents);

            filterBuilder.call.restore();
        });
    });

    describe('GET /events', () => {
        it('should return not implemented message', async () => {
            const res = await request(app).get('/events');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('not implemented, yet');
        });
    });

    describe('GET /events/:eventId', () => {
        it('should return event details for the given eventId', async () => {
            const newEvent = new event({ name: 'Test Event' });
            await newEvent.save();

            const res = await request(app).get(`/events/${newEvent._id}`);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Test Event');
        });

        it('should handle errors gracefully', async () => {
            const invalidId = 'invalidId';
            const res = await request(app).get(`/events/${invalidId}`);
            expect(res.status).to.equal(500); // or however your error handling is set up
        });
    });

    describe('POST /events/filter', () => {
        it('should return filtered events', async () => {
            const mockEvents = [{ id: 1, name: 'Filtered Event' }];
            sinon.stub(filterBuilder, 'call').returns(Promise.resolve(mockEvents));

            const res = await request(app).post('/events/filter').send({ someFilter: 'criteria' });
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockEvents);

            filterBuilder.call.restore();
        });
    });

    describe('POST /events/', () => {
        it('should create a new event', async () => {
            const newEventData = { name: 'New Event' };
            const res = await request(app).post('/events/').send(newEventData);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('New Event');
        });

        it('should handle validation errors (if applicable)', async () => {
            // Assuming validation will fail
            const res = await request(app).post('/events/').send({});
            expect(res.status).to.equal(400); // Update based on your validation logic
        });
    });
});
