export const Messages = {
  MissingConfiguration: '[@adminjs/relations-hero]_missingConfiguration',
  MissingRecordId: '[@adminjs/relations-hero]_missingRecordId',
  InvalidRelationType: '[@adminjs/relations-hero]_invalidRelationType',
  JoinKeyMissing: '[@adminjs/relations-hero]_joinKeyMissing',
  NoRelationRecordsTitle: '[@adminjs/relations-hero]_noRelationRecordsTitle',
  NoRelationRecords: '[@adminjs/relations-hero]_noRelationRecords',
  JunctionMissing: '[@adminjs/relations-hero]_junctionMissing',
  JunctionResourceIdMissing: '[@adminjs/relations-hero]_junctionResourceIdMissing',
  JunctionResourceMissing: '[@adminjs/relations-hero]_junctionResourceMissing',
  ChooseItemSubtitle: '[@adminjs/relations-hero]_chooseItemSubtitle',
  ManyToManyRelationAlreadyExists: '[@adminjs/relations-hero]_mnRelationAlreadyExists',
  RelationSuccessfullyAdded: '[@adminjs/relations-hero]_relationSuccessfullyAdded',
  RelationSuccessfullyDeleted: '[@adminjs/relations-hero]_relationSuccessfullyDeleted',
  QueryParamsMissing: '[@adminjs/relations-hero]_queryParamsMissing',
  JunctionRecordMissing: '[@adminjs/relations-hero]_junctionRecordMissing',
};

export const Labels = {
  ChooseItemHeader: '[@adminjs/relations-hero]_chooseItemHeader',
  DeleteRelationHeader: '[@adminjs/relations-hero]_deleteRelationHeader',
};

export const Actions = {
  AddItem: '[@adminjs/relations-hero]_addItem',
  RemoveRelation: '[@adminjs/relations-hero]_removeRelation',
  RemoveRecord: '[@adminjs/relations-hero]_removeRecord',
};

export enum RelationType {
  OneToMany = 'one-to-many',
  ManyToMany = 'many-to-many',
}
