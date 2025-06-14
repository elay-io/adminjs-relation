import { Messages, Labels, Actions } from '@/constants';

/**
 * English translations for error messages and notifications
 */
const messagesTranslations = {
  [Messages.MissingConfiguration]:
    '[@hero-truong/adminjs-relation] Missing configuration for one of the relations: {{relationName}}',
  [Messages.MissingRecordId]: '[@hero-truong/adminjs-relation] "recordId" is missing in request\'s query params',
  [Messages.InvalidRelationType]:
    '[@hero-truong/adminjs-relation] Invalid "type" for relation. Valid relation types: {{validTypes}}',
  [Messages.JoinKeyMissing]: '[@hero-truong/adminjs-relation] "joinKey" must be defined for "target"',
  [Messages.NoRelationRecordsTitle]: 'No related records',
  [Messages.NoRelationRecords]: 'There are no records from "{{relationName}}" related with this record',
  [Messages.JunctionMissing]: '[@hero-truong/adminjs-relation] "junction" must be defined for many-to-many relation',
  [Messages.JunctionResourceIdMissing]:
    '[@hero-truong/adminjs-relation] "junction.throughResourceId" must be defined for many-to-many-relation',
  [Messages.JunctionResourceMissing]:
    '[@hero-truong/adminjs-relation] {{junctionResourceId}} resource is missing. Are you sure you have registered it in AdminJS?',
  [Messages.ChooseItemSubtitle]: 'Select an item to add',
  [Messages.ManyToManyRelationAlreadyExists]: 'Given relation already exists.',
  [Messages.RelationSuccessfullyAdded]: 'Relation has been successfully added.',
  [Messages.RelationSuccessfullyDeleted]: 'Relation has been successfully deleted.',
  [Messages.QueryParamsMissing]:
    "[@hero-truong/adminjs-relation] Insufficient query parameters. Make sure you do not modify the browser's address bar.",
  [Messages.JunctionRecordMissing]: '[@hero-truong/adminjs-relation] Could not find a junction record.',
};

/**
 * English translations for UI labels
 */
const labelsTranslations = {
  [Labels.ChooseItemHeader]: 'Add existing item',
  [Labels.DeleteRelationHeader]: 'Decide what to delete',
};

/**
 * English translations for action buttons
 */
const actionsTranslations = {
  [Actions.AddItem]: 'Add existing item',
  [Actions.RemoveRelation]: 'Remove relation',
  [Actions.RemoveRecord]: 'Delete record',
};

/**
 * Combined translations for the relations feature
 */
export const featureTranslations = {
  translations: {
    en: {
      messages: messagesTranslations,
      labels: labelsTranslations,
      actions: actionsTranslations,
    },
  },
};

/**
 * Default empty locale configuration
 */
export const emptyLocale = {
  language: 'en',
  translations: {},
};
