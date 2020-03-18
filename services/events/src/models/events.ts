import axios from 'axios';
import config from '../config';

interface Event {
}

const getEvent = (eventId: number): Promise<Event> => Promise.resolve({});
/*
     readmsg(channel,block,num)
     long channel;
     long *block;
     int num;
        {
        long buff[64],actnum;
        sec_read(channel,buff,0,64);
        actnum=num*2-buff[0];
        sec_read(channel,block,actnum,128);
        }
 */

export const getEvents = (eventId?: number): Promise<Event[]> => axios.get(
    `${config.worldUrl}/events/data`,
    { params: {

    } }
)
    .then(response => response.data)
    .then((data) => {
        const {
            firstEventId,
            lastEventId,
        } = data;
        const startEventId = eventId || lastEventId;
        const promises = [];
        for (let eventId = firstEventId; eventId < lastEventId; eventId++) {
            promises.push(getEvent(eventId));
        }
        return Promise.all(promises);
    })
    /*
    .then(events => events.forEach(event => processEvent(event, name)))
    .then(() => {
        // cms=ct;
        // update(name);
        // eorte();
        // rdes=0;tdes=0;vdes=0;
    })
     */
    .catch(() => Promise.reject(new Error('WORLD: FILE_ACCESS : Access failed')));
