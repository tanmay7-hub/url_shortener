import {Queue} from 'bullmq';
import connection from './connection.js'

const urlQueue = new Queue("url-queue",{
    connection,
});
export default urlQueue;