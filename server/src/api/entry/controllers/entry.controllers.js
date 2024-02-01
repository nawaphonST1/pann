// // ./api/entry/controllers/entry.controllers.js

// module.exports = {
//     async find(ctx: any) {
//       try {
//         const { id } = ctx.params;
  
//         // Replace 'entry' with the actual name of your Entry model
//         const entryModel: any = strapi.query('entry');
  
//         // Replace 1 with the desired event ID
//         const eventId = 1;
  
//         // Example using Strapi query builder with event filter
//         const entries = await entryModel.find({
//           'event.id': eventId,
//         });
  
//         return entries;
//       } catch (error) {
//         strapi.log.error(error);
//         return ctx.badRequest('Error fetching entries');
//       }
//     },
//   };
  