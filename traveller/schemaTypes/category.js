import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pin',
  title: 'Pin',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'assetId',
      title: 'Asset ID',
      type: 'string',
    }),
  ],
});



