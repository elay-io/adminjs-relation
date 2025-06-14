export const Messages = {
  MissingConfiguration: '[@hero-truong/adminjs-relation]_missingConfiguration',
  MissingRecordId: '[@hero-truong/adminjs-relation]_missingRecordId',
  InvalidRelationType: '[@hero-truong/adminjs-relation]_invalidRelationType',
  JoinKeyMissing: '[@hero-truong/adminjs-relation]_joinKeyMissing',
  NoRelationRecordsTitle: '[@hero-truong/adminjs-relation]_noRelationRecordsTitle',
  NoRelationRecords: '[@hero-truong/adminjs-relation]_noRelationRecords',
  JunctionMissing: '[@hero-truong/adminjs-relation]_junctionMissing',
  JunctionResourceIdMissing: '[@hero-truong/adminjs-relation]_junctionResourceIdMissing',
  JunctionResourceMissing: '[@hero-truong/adminjs-relation]_junctionResourceMissing',
  ChooseItemSubtitle: '[@hero-truong/adminjs-relation]_chooseItemSubtitle',
  ManyToManyRelationAlreadyExists: '[@hero-truong/adminjs-relation]_mnRelationAlreadyExists',
  RelationSuccessfullyAdded: '[@hero-truong/adminjs-relation]_relationSuccessfullyAdded',
  RelationSuccessfullyDeleted: '[@hero-truong/adminjs-relation]_relationSuccessfullyDeleted',
  QueryParamsMissing: '[@hero-truong/adminjs-relation]_queryParamsMissing',
  JunctionRecordMissing: '[@hero-truong/adminjs-relation]_junctionRecordMissing',
};

export const Labels = {
  ChooseItemHeader: '[@hero-truong/adminjs-relation]_chooseItemHeader',
  DeleteRelationHeader: '[@hero-truong/adminjs-relation]_deleteRelationHeader',
};

export const Actions = {
  AddItem: '[@hero-truong/adminjs-relation]_addItem',
  RemoveRelation: '[@hero-truong/adminjs-relation]_removeRelation',
  RemoveRecord: '[@hero-truong/adminjs-relation]_removeRecord',
};

export enum RelationType {
  OneToMany = 'one-to-many',
  ManyToMany = 'many-to-many',
}
