export default {
  kind: 'collectionType',
  collectionName: 'groups',
  info: {
    singularName: 'group',
    pluralName: 'groups',
    displayName: 'Group',
    description: 'Groups for organizing collection types',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    description: {
      type: 'text',
    },
    // Add more attributes as needed
  },
};
