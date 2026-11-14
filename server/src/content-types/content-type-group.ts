export default {
  name: 'group',
  kind: 'collectionType',
  collectionName: 'groups',
  info: {
    singularName: 'group',
    pluralName: 'groups',
    displayName: 'Group',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'text',
    },
  },
};
