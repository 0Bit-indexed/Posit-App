// const { Kafka } = require("kafkajs")
// const axios = require('axios')
// const avro = require('avsc')

// const kafka = new Kafka({
//     clientId: "post-cache",
//     brokers: ["kafka:9092"],
//   });

// const consumer = kafka.consumer({ groupId: "userPost-group" })

// const schemaRegistryUrl = 'http://schema-registry:8081'

// async function fetchAvroSchema(topic) {
//     const subject = `${topic}-value`; // Construct the Avro subject
//     const response = await axios.get(`${schemaRegistryUrl}/subjects/${subject}/versions/latest`);
//     //return AvroType.forSchema(response.data.schema);
//     return avro.parse(response.data.schema);
//   }

// const main = async () => {
//     await consumer.connect()

//     const avroSchema = await fetchAvroSchema('post_db_dev_server.public.post')

//     //TODO: topic needs to be a dev variable so it changes with the env
//     await consumer.subscribe({ topic: "post_db_dev_server.public.post", fromBeginning: true })
  
//     await consumer.run({
//         // try: {
//             eachMessage: async ({ topic, partition, message }) => {
//                 const avroSchemaInstance = avro.parse(avroSchema);
//                 const avroMessage = avroSchemaInstance.fromBuffer(message.value);
        
//                 // const avroMessage = avroSchema.fromBuffer(message.value);
        
//                 console.log({
//                     topic,
//                     partition,
//                     offset: message.offset,
//                     avroMessage: avroMessage
//                   });
//                 // const event = JSON.parse(message.value.toString());
//                 // console.log("🚀 ~ file: consumer.js:18 ~ eachMessage: ~ event:", event)
          
//                 // if (event.event_type === "OrderCreated") {
//                 //   const orderId = event.order_id;
//                 //   // Process the payment for the order
//                 //   await processPayment(orderId);
//                 // }
//               },
//         // } ,catch (error) {
//         //     console.log(error)
//         // }
      
//     });
//   };
  
// //   const processPayment = async (orderId) => {
// //     // Implement payment processing logic here
// //     console.log(`Processing payment for order ${orderId}`);
// //   };
  
// main().catch(console.error);








// const { Kafka } = require("kafkajs");
// const axios = require('axios');
// const avro = require('avsc');

// const kafka = new Kafka({
//     clientId: "post-cache-consumer",
//     brokers: ["kafka:9092"],
// });

// const consumer = kafka.consumer({ groupId: "userPost-group" });

// const schemaRegistryUrl = 'http://schema-registry:8081';

// async function fetchAvroSchema(topic) {
//     const subject = `${topic}-value`; // Construct the Avro subject
//     const response = await axios.get(`${schemaRegistryUrl}/subjects/${subject}/versions/latest`);
//     return avro.parse(response.data.schema);
// }

// const main = async () => {
//     await consumer.connect();

//     const avroSchema = await fetchAvroSchema('post_db_dev_server.public.post.Envelope');
//     //console.log("🚀 ~ file: consumer.js:96 ~ main ~ avroSchema:", avroSchema)

//     await consumer.subscribe({ topic: "post_db_dev_server.public.post.Envelope", fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             const avroMessage = avroSchema.fromBuffer(message.value);
//             console.log("🚀 ~ file: consumer.js:103 ~ eachMessage: ~ avroMessage:", avroMessage)
            
//            // Extract data from the Avro message
//            const before = avroMessage.before;
//            const after = avroMessage.after;
//            const source = avroMessage.source;
//            const operation = avroMessage.op;

//            console.log({
//                topic,
//                partition,
//                offset: message.offset,
//                before,
//                after,
//                source,
//                operation
//            });
//         },
//     });
// };

// main().catch(console.error);








// const { Kafka } = require("kafkajs");
// const axios = require('axios');
// const avro = require('avsc');

// const kafka = new Kafka({
//     clientId: "post-cache-consumer",
//     brokers: ["kafka:9092"],
// });

// const consumer = kafka.consumer({ groupId: "userPost-group" });

// const schemaRegistryUrl = 'http://schema-registry:8081';

// async function fetchAvroSchema(topic) {
//     const subject = `${topic}-value`; // Construct the Avro subject
//     const response = await axios.get(`${schemaRegistryUrl}/subjects/${subject}/versions/latest`);
//     return avro.parse(response.data.schema);
// }

// const main = async () => {
//     await consumer.connect();

//     const avroSchema = await fetchAvroSchema('post_db_dev_server.public.post.Envelope');
//     //console.log("🚀 ~ file: consumer.js:96 ~ main ~ avroSchema:", avroSchema)

//     await consumer.subscribe({ topic: "post_db_dev_server.public.post", fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log("🚀 ~ file: consumer.js:162 ~ eachMessage: ~ message:", message)
            
//         //     const avroMessage = avroSchema.fromBuffer(message.value);
//         //     console.log("🚀 ~ file: consumer.js:103 ~ eachMessage: ~ avroMessage:", avroMessage)
            
//         //    // Extract data from the Avro message
//         //    const before = avroMessage.before;
//         //    const after = avroMessage.after;
//         //    const source = avroMessage.source;
//         //    const operation = avroMessage.op;

//         //    console.log({
//         //        topic,
//         //        partition,
//         //        offset: message.offset,
//         //        before,
//         //        after,
//         //        source,
//         //        operation
//         //    });
//         },
//     });
// };

// main().catch(console.error);




// const { Kafka } = require('kafkajs')
// const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry')
// const avro = require('avsc')

// const kafka = new Kafka({
//     clientId: "post-cache-consumer",
//     brokers: ["kafka:9092"],
// })

// const schemaRegistryUrl = 'http://schema-registry:8081';

// const schemaRegistry = new SchemaRegistry({ host: `${schemaRegistryUrl}` })

// const consumer = kafka.consumer({ groupId: "userPost-group" });

// const main = async () => {
//     await consumer.connect()
//     await consumer.subscribe({ topic: 'post_db_dev_server.public.post', fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             const schemaIdHeader = message.headers['io.confluent.kafka.serializers.subject.name'];

//             if (schemaIdHeader) {
//                 const schemaId = schemaIdHeader.split('-value')[0];
              
//                 // Rest of your code
//                 const avroBuffer = message.value; // Avro-encoded payload

//             try {
//                 const schema = await schemaRegistry.getSchema(schemaId);
//                 const type = avro.Type.forSchema(schema);
//                 const decodedMessage = type.fromBuffer(avroBuffer);

//                 // Print the decoded message as a readable JSON object
//                 console.log(`Received message on topic ${topic}, partition ${partition}:`, JSON.stringify(decodedMessage));
//             } catch (error) {
//                 console.error('Error decoding Avro message:', error);
//             }
//               } else {
//                 console.error('Schema ID header is missing in the message.');
//               }
            
//         },
//     });
// }

// main().catch(console.error)





// const { Kafka } = require('kafkajs');
// const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry');

// const kafka = new Kafka({
//   clientId: 'post-cache-consumer',
//   brokers: ['kafka:9092'],
// });

// const schemaRegistry = new SchemaRegistry({ host: 'http://schema-registry:8081' });

// const consumer = kafka.consumer({ groupId: 'userPost-group' });

// const run = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: 'post_db_dev_server.public.post' });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       try {
//         const { value } = await schemaRegistry.decode(message.value);
//         console.log({
//           topic,
//           partition,
//           offset: message.offset,
//           key: message.key.toString(),
//           value,
//         });
//       } catch (error) {
//         console.error('Error decoding Avro message:', error);
//       }
//     },
//   });
// };

// run().catch(console.error);









// const { Kafka } = require("kafkajs");
// const axios = require('axios');
// const avro = require('avsc');

// const kafka = new Kafka({
//     clientId: "post-cache-consumer",
//     brokers: ["kafka:9092"],
// });

// const consumer = kafka.consumer({ groupId: "userPost-group" });

// const schemaRegistryUrl = 'http://schema-registry:8081';

// async function fetchAvroSchema(topic) {
//     const subject = `${topic}-value`; // Construct the Avro subject
//     const response = await axios.get(`${schemaRegistryUrl}/subjects/${subject}/versions/latest`);
//     return avro.parse(response.data.schema);
// }

// const main = async () => {
//     await consumer.connect();

//     const avroSchema = await fetchAvroSchema('post_db_dev_server.public.post');
//     //console.log("🚀 ~ file: consumer.js:96 ~ main ~ avroSchema:", avroSchema)

//     await consumer.subscribe({ topic: "post_db_dev_server.public.post", fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log("🚀 ~ file: consumer.js:162 ~ eachMessage: ~ message:", message)
            
        
//         },
//     });
// };

// main().catch(console.error);




// const { Kafka } = require("kafkajs");
// const axios = require('axios');
// const avro = require('avsc');

// const kafka = new Kafka({
//     clientId: "post-cache-consumer",
//     brokers: ["kafka:9092"],
// });

// const consumer = kafka.consumer({ groupId: "userPost-group" });

// const schemaRegistryUrl = 'http://schema-registry:8081';

// async function fetchAvroSchema(subject) {
//     const response = await axios.get(`${schemaRegistryUrl}/subjects/${subject}-value/versions/latest`);
//     const schemaString = response.data.schema;
//     return avro.parse(JSON.parse(schemaString)); // Parse the JSON string
// }


// const main = async () => {
//     await consumer.connect();

//     const avroSchema = await fetchAvroSchema('post_db_dev_server.public.post');
//     // console.log("Avro Schema:", avroSchema);

//     await consumer.subscribe({ topic: "post_db_dev_server.public.post", fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             // Decode the message using the avro schema
//             const decodedMessage = avroSchema.fromBuffer(message.value);
    
//             // Access the "title" field (assuming it's nullable)
//             const title = decodedMessage.after.title !== null ? decodedMessage.after.title : "N/A";
    
//             // Print the decoded message
//             console.log("Decoded Message:", decodedMessage);
//             console.log("Title:", title);
//         },
//     });
    
// };

// main().catch(console.error);









const { Kafka } = require("kafkajs");
const { SchemaRegistry } = require("@kafkajs/confluent-schema-registry");
//const {userPost_RedisClient} = require("../connection");
//const userPost_RedisClient = require("./connection");
const { PostCache } = require("../index")

const kafka = new Kafka({
  clientId: "post-cache-consumer",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "userPost-group" });

const schemaRegistry = new SchemaRegistry({ host: "http://schema-registry:8081" });
// const redisHost = 'user-post-cache';

// const userPost_RedisClient = new Redis({
//   host: redisHost,
//   port: 6379
// });

const main = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "post_db_dev_server.public.post", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      //console.log("🚀 ~ file: consumer.js:402 ~ eachMessage: ~ message:", message)
      try {
        const decodedMessage = await schemaRegistry.decode(message.value);
        console.log("Decoded message:", decodedMessage);
        //const cacheKey = `post:${message.value.id}`;
        const cacheKey = `${decodedMessage.after.id}`;
        const cacheValue = JSON.stringify(decodedMessage.after);
        //console.log("🚀 ~ file: consumer.js:417 ~ eachMessage: ~ cacheKey:", cacheKey)
        // await userPost_RedisClient.setex(cacheKey, 3600, cacheValue);
        await PostCache.CachePost(cacheKey, cacheValue);
        
      } catch (error) {
        console.error("Error decoding message:", error);
      }
    },
  });
};

main().catch(console.error);
